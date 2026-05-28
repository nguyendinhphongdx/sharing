// In-memory todo store. Du lieu mat khi restart server (theo dung lua chon demo).
// Web UI (REST) va MCP tools deu thao tac tren CUNG mot store nay -> agent doi gi, UI thay ngay.

let seq = 0;
const todos = [];

export function listTodos() {
  return todos;
}

export function addTodo(title) {
  const text = String(title ?? "").trim();
  if (!text) throw new Error("title rong");
  const todo = { id: ++seq, title: text, done: false, createdAt: new Date().toISOString() };
  todos.push(todo);
  return todo;
}

export function completeTodo(id, done = true) {
  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) return null;
  todo.done = Boolean(done);
  return todo;
}

export function deleteTodo(id) {
  const idx = todos.findIndex((t) => t.id === Number(id));
  if (idx === -1) return null;
  return todos.splice(idx, 1)[0];
}

// Seed vai todo de UI khong trong khi mo demo.
addTodo("Chuan bi slide MCP");
addTodo("Test ket noi n8n -> MCP");
