// Demo cho topic ai-llm-agent-mcp.
//
// Mot tien trinh phuc vu 3 thu, dung CHUNG mot in-memory store:
//   1) Web UI live      ->  GET  /                (public/index.html, tu poll)
//   2) REST API cho UI  ->  /api/todos ...
//   3) MCP server       ->  /mcp   (Streamable HTTP, cho n8n moi & cac client moi)
//                           /sse + /messages (SSE legacy, cho client/n8n cu)
//
// Agent (vd n8n) ket noi vao /mcp, goi tool -> store doi -> web UI thay ngay.

import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";

import { listTodos, addTodo, completeTodo, deleteTodo } from "./store.mjs";

const PORT = Number(process.env.PORT || 8848);
// Token bao ve endpoint /mcp + /sse (set cung trong code cho demo). Doi tai day neu can.
const MCP_TOKEN = "demo-secret-123";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(...args) {
  console.log(`[${new Date().toLocaleTimeString()}]`, ...args);
}

// ---------------------------------------------------------------------------
// MCP server: dinh nghia 4 tool CRUD, deu goi vao store dung chung.
// Tao MOI mot McpServer cho moi phien ket noi (theo mau chuan cua SDK).
// ---------------------------------------------------------------------------
function buildMcpServer() {
  const server = new McpServer({ name: "todo-mcp", version: "1.0.0" });

  server.registerTool(
    "list_todos",
    {
      title: "List Todos",
      description: "Liet ke tat ca cong viec (todo) hien co, kem id, tieu de va trang thai hoan thanh.",
      inputSchema: {},
    },
    async () => {
      const todos = listTodos();
      log(`MCP tool: list_todos -> ${todos.length} todo`);
      return { content: [{ type: "text", text: JSON.stringify(todos, null, 2) }] };
    },
  );

  server.registerTool(
    "add_todo",
    {
      title: "Add Todo",
      description: "Them mot cong viec moi vao danh sach. Tra ve todo vua tao (co id).",
      inputSchema: { title: z.string().describe("Tieu de / noi dung cong viec") },
    },
    async ({ title }) => {
      const todo = addTodo(title);
      log(`MCP tool: add_todo -> #${todo.id} "${todo.title}"`);
      return { content: [{ type: "text", text: `Da them todo #${todo.id}: "${todo.title}"` }] };
    },
  );

  server.registerTool(
    "complete_todo",
    {
      title: "Complete Todo",
      description: "Danh dau mot cong viec la da hoan thanh theo id.",
      inputSchema: { id: z.coerce.number().int().describe("id cua todo can hoan thanh") },
    },
    async ({ id }) => {
      const todo = completeTodo(id, true);
      if (!todo) {
        log(`MCP tool: complete_todo -> khong tim thay #${id}`);
        return { content: [{ type: "text", text: `Khong tim thay todo #${id}` }], isError: true };
      }
      log(`MCP tool: complete_todo -> #${todo.id} done`);
      return { content: [{ type: "text", text: `Da hoan thanh todo #${todo.id}: "${todo.title}"` }] };
    },
  );

  server.registerTool(
    "delete_todo",
    {
      title: "Delete Todo",
      description: "Xoa mot cong viec khoi danh sach theo id.",
      inputSchema: { id: z.coerce.number().int().describe("id cua todo can xoa") },
    },
    async ({ id }) => {
      const todo = deleteTodo(id);
      if (!todo) {
        log(`MCP tool: delete_todo -> khong tim thay #${id}`);
        return { content: [{ type: "text", text: `Khong tim thay todo #${id}` }], isError: true };
      }
      log(`MCP tool: delete_todo -> #${todo.id} xoa`);
      return { content: [{ type: "text", text: `Da xoa todo #${todo.id}: "${todo.title}"` }] };
    },
  );

  return server;
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------
const app = express();
app.use(cors({ exposedHeaders: ["Mcp-Session-Id"] }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Bearer-token guard (chi bat khi co MCP_TOKEN). Chi ap cho endpoint MCP.
function requireToken(req, res, next) {
  if (!MCP_TOKEN) return next();
  const auth = req.headers.authorization || "";
  if (auth === `Bearer ${MCP_TOKEN}`) return next();
  res.status(401).json({ error: "Unauthorized: thieu hoac sai Bearer token" });
}

// --- REST API (cho web UI) ---
// Thong tin ket noi cho nut Settings tren UI (token + cac path MCP).
app.get("/api/info", (_req, res) => res.json({ token: MCP_TOKEN, mcpPath: "/mcp", ssePath: "/sse" }));

app.get("/api/todos", (_req, res) => res.json(listTodos()));

app.post("/api/todos", (req, res) => {
  try {
    res.status(201).json(addTodo(req.body?.title));
  } catch (e) {
    res.status(400).json({ error: String(e.message || e) });
  }
});

app.post("/api/todos/:id/complete", (req, res) => {
  const done = req.body?.done ?? true;
  const todo = completeTodo(req.params.id, done);
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todo = deleteTodo(req.params.id);
  if (!todo) return res.status(404).json({ error: "not found" });
  res.json(todo);
});

// ---------------------------------------------------------------------------
// MCP transport 1: Streamable HTTP (khuyen nghi) — /mcp
// Stateful: giu transport theo Mcp-Session-Id.
// ---------------------------------------------------------------------------
const httpTransports = {};

app.post("/mcp", requireToken, async (req, res) => {
  const sessionId = req.headers["mcp-session-id"];
  let transport = sessionId ? httpTransports[sessionId] : undefined;

  if (!transport && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sid) => {
        httpTransports[sid] = transport;
        log(`MCP (HTTP) phien moi: ${sid}`);
      },
    });
    transport.onclose = () => {
      if (transport.sessionId) delete httpTransports[transport.sessionId];
    };
    await buildMcpServer().connect(transport);
  } else if (!transport) {
    return res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32000, message: "Bad Request: thieu Mcp-Session-Id hop le" },
      id: null,
    });
  }

  await transport.handleRequest(req, res, req.body);
});

async function handleHttpSession(req, res) {
  const sessionId = req.headers["mcp-session-id"];
  const transport = sessionId ? httpTransports[sessionId] : undefined;
  if (!transport) return res.status(400).send("Mcp-Session-Id khong hop le hoac thieu");
  await transport.handleRequest(req, res);
}
app.get("/mcp", requireToken, handleHttpSession); // server -> client stream (SSE)
app.delete("/mcp", requireToken, handleHttpSession); // ket thuc phien

// ---------------------------------------------------------------------------
// MCP transport 2: SSE legacy — /sse (mo stream) + /messages (gui RPC)
// Cho client/n8n cu chi ho tro "Server Sent Events".
// ---------------------------------------------------------------------------
const sseTransports = {};

app.get("/sse", requireToken, async (_req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  sseTransports[transport.sessionId] = transport;
  log(`MCP (SSE) phien moi: ${transport.sessionId}`);
  res.on("close", () => delete sseTransports[transport.sessionId]);
  await buildMcpServer().connect(transport);
});

app.post("/messages", requireToken, async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = sseTransports[sessionId];
  if (!transport) return res.status(400).send("Khong tim thay phien SSE cho sessionId");
  await transport.handlePostMessage(req, res, req.body);
});

// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  log(`Todo MCP demo dang chay tai http://localhost:${PORT}`);
  log(`  Web UI       : http://localhost:${PORT}/`);
  log(`  MCP (HTTP)   : http://localhost:${PORT}/mcp`);
  log(`  MCP (SSE)    : http://localhost:${PORT}/sse`);
  log(`  Bearer token : ${MCP_TOKEN}  (Authorization: Bearer ${MCP_TOKEN})`);
  log(`  Bam nut ⚙ tren web UI de xem & copy thong tin ket noi cho n8n.`);
});
