// Self-test: kiem tra MCP server (Streamable HTTP) chay dung, KHONG can n8n.
// Chay:  npm run check     (server phai dang chay o cua so khac)
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const PORT = Number(process.env.PORT || 8848);
const url = new URL(`http://localhost:${PORT}/mcp`);
const TOKEN = process.env.MCP_TOKEN || "demo-secret-123"; // khop token set cung trong server.mjs
const headers = { Authorization: `Bearer ${TOKEN}` };

const transport = new StreamableHTTPClientTransport(url, { requestInit: { headers } });
const client = new Client({ name: "self-check", version: "1.0.0" });

await client.connect(transport);
console.log("[OK] Da ket noi MCP. session:", transport.sessionId);

const { tools } = await client.listTools();
console.log("[OK] tools/list:", tools.map((t) => t.name).join(", "));

const add = await client.callTool({ name: "add_todo", arguments: { title: "Self-check MCP " + new Date().toLocaleTimeString() } });
console.log("[OK] add_todo (MCP) ->", add.content[0].text.split("\n")[0]);

await client.close();

// --- Kiem tra them: REST tool-call API (KHONG qua MCP) ---
const base = `http://localhost:${PORT}`;
const list = await fetch(`${base}/tools`).then((r) => r.json());
console.log("[OK] GET /tools ->", list.tools.map((t) => t.name).join(", "));

const restAdd = await fetch(`${base}/tools/add_todo`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Self-check REST " + new Date().toLocaleTimeString() }),
}).then((r) => r.json());
console.log("[OK] POST /tools/add_todo (REST) ->", restAdd.message);

console.log("[PASS] San sang ca 2 dang: MCP (/mcp) lan REST tool-call (/tools).");
