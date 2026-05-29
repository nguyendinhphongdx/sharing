// Demo cho topic ai-llm-agent-mcp.
//
// Mot tien trinh, MOT bo dinh nghia tool (toolRegistry) dung CHUNG mot in-memory store,
// phuc vu 4 dang truy cap:
//   1) Web UI live        ->  GET  /                       (public/index.html, tu poll)
//   2) REST API cho UI    ->  /api/todos ...               (kieu RESTful resource)
//   3) Tool-call REST API ->  GET /tools + POST /tools/:name   (goi tool "binh thuong" qua HTTP)
//   4) MCP server         ->  /mcp (Streamable HTTP) + /sse + /messages (SSE legacy)
//
// Diem hay de minh hoa: CUNG 1 dinh nghia tool phuc vu ca MCP lan REST tool-call.
//   - REST: ban phai biet truoc tung URL + thu cong noi day (M x N).
//   - MCP : client tu "kham pha" (tools/list) roi goi (tools/call) qua 1 chuan chung.

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
// TOOL REGISTRY — nguon su that duy nhat, dung cho CA MCP lan REST tool-call.
// Moi tool: { name, title, description, inputSchema (zod shape), run(args) }.
// run() tra ve { message, data?, ok? }  (ok mac dinh true; ok:false = loi logic).
// ---------------------------------------------------------------------------
const toolRegistry = [
  {
    name: "list_todos",
    title: "List Todos",
    description: "Liet ke tat ca cong viec (todo) hien co, kem id, tieu de va trang thai hoan thanh.",
    inputSchema: {},
    run: () => {
      const todos = listTodos();
      return { message: `Co ${todos.length} todo`, data: todos };
    },
  },
  {
    name: "add_todo",
    title: "Add Todo",
    description: "Them mot cong viec moi vao danh sach. Tra ve todo vua tao (co id).",
    inputSchema: { title: z.string().min(1).describe("Tieu de / noi dung cong viec") },
    run: ({ title }) => {
      const todo = addTodo(title);
      return { message: `Da them todo #${todo.id}: "${todo.title}"`, data: todo };
    },
  },
  {
    name: "complete_todo",
    title: "Complete Todo",
    description: "Danh dau mot cong viec la da hoan thanh theo id.",
    inputSchema: { id: z.coerce.number().int().describe("id cua todo can hoan thanh") },
    run: ({ id }) => {
      const todo = completeTodo(id, true);
      if (!todo) return { ok: false, message: `Khong tim thay todo #${id}` };
      return { message: `Da hoan thanh todo #${todo.id}: "${todo.title}"`, data: todo };
    },
  },
  {
    name: "delete_todo",
    title: "Delete Todo",
    description: "Xoa mot cong viec khoi danh sach theo id.",
    inputSchema: { id: z.coerce.number().int().describe("id cua todo can xoa") },
    run: ({ id }) => {
      const todo = deleteTodo(id);
      if (!todo) return { ok: false, message: `Khong tim thay todo #${id}` };
      return { message: `Da xoa todo #${todo.id}: "${todo.title}"`, data: todo };
    },
  },
];

const toolByName = Object.fromEntries(toolRegistry.map((t) => [t.name, t]));

// Chay tool an toan (bat loi) -> { ok, message, data }. via = "mcp" | "rest" (chi de log).
async function runTool(tool, args, via) {
  try {
    const r = await tool.run(args || {});
    const ok = r?.ok !== false;
    log(`tool(${via}): ${tool.name} -> ${ok ? "OK" : "FAIL"} ${r?.message ?? ""}`);
    return { ok, message: r?.message ?? "OK", data: r?.data };
  } catch (e) {
    log(`tool(${via}): ${tool.name} -> ERROR ${e?.message || e}`);
    return { ok: false, message: String(e?.message || e) };
  }
}

// Mo ta tham so (cho GET /tools) suy ra tu zod shape — khong phai khai bao lai.
function describeParams(inputSchema) {
  return Object.entries(inputSchema || {}).map(([name, zt]) => ({
    name,
    type: (zt?._def?.typeName || "Zod").replace(/^Zod/, "").toLowerCase() || "any",
    required: typeof zt?.isOptional === "function" ? !zt.isOptional() : true,
    description: zt?.description || "",
  }));
}

// ---------------------------------------------------------------------------
// MCP server: dung CHUNG toolRegistry. Tao MOI cho moi phien (mau chuan SDK).
// ---------------------------------------------------------------------------
function buildMcpServer() {
  const server = new McpServer({ name: "todo-mcp", version: "1.0.0" });
  for (const tool of toolRegistry) {
    server.registerTool(
      tool.name,
      { title: tool.title, description: tool.description, inputSchema: tool.inputSchema },
      async (args) => {
        const r = await runTool(tool, args, "mcp");
        const text = r.data !== undefined ? `${r.message}\n${JSON.stringify(r.data, null, 2)}` : r.message;
        return { content: [{ type: "text", text }], isError: !r.ok };
      },
    );
  }
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
// Thong tin ket noi cho nut Settings tren UI (token + cac path).
app.get("/api/info", (_req, res) =>
  res.json({ token: MCP_TOKEN, mcpPath: "/mcp", ssePath: "/sse", toolsPath: "/tools" }),
);

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
// Tool-call REST API (dang "tools call binh thuong", KHONG qua MCP) — /tools
//   GET  /tools         -> liet ke tool (giong tools/list, nhung client phai biet URL nay)
//   POST /tools/:name   -> goi 1 tool; body JSON = arguments (hoac { "arguments": {...} })
// De mo (khong token) cho de demo & de n8n HTTP Request node goi thang.
// ---------------------------------------------------------------------------
app.get("/tools", (_req, res) => {
  res.json({
    tools: toolRegistry.map((t) => ({
      name: t.name,
      title: t.title,
      description: t.description,
      params: describeParams(t.inputSchema),
      endpoint: `POST /tools/${t.name}`,
    })),
  });
});

app.post("/tools/:name", async (req, res) => {
  const tool = toolByName[req.params.name];
  if (!tool) {
    return res.status(404).json({ ok: false, message: `Khong co tool ten "${req.params.name}"` });
  }
  // Chap nhan body = arguments truc tiep, HOAC { arguments: {...} } (kieu tools/call cua MCP).
  const rawArgs =
    req.body && typeof req.body.arguments === "object" && req.body.arguments !== null
      ? req.body.arguments
      : req.body;
  const parsed = z.object(tool.inputSchema).safeParse(rawArgs || {});
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("; ");
    return res.status(400).json({ ok: false, message: `Tham so khong hop le: ${msg}` });
  }
  const r = await runTool(tool, parsed.data, "rest");
  res.json(r);
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
  log(`  Web UI            : http://localhost:${PORT}/`);
  log(`  REST (UI)         : http://localhost:${PORT}/api/todos`);
  log(`  Tool-call REST    : GET ${`http://localhost:${PORT}/tools`}  +  POST /tools/:name`);
  log(`  MCP (HTTP)        : http://localhost:${PORT}/mcp`);
  log(`  MCP (SSE)         : http://localhost:${PORT}/sse`);
  log(`  Bearer token (MCP): ${MCP_TOKEN}  (Authorization: Bearer ${MCP_TOKEN})`);
  log(`  Bam nut ⚙ tren web UI de xem & copy thong tin ket noi cho n8n.`);
});
