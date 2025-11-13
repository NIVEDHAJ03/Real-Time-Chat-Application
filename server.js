// ✅ Simple WebSocket Chat Server (fixed duplicate message issue)
const WebSocket = require("ws");

// Create WebSocket server on port 8080
const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on("connection", (socket) => {
  clients.push(socket);
  console.log("🟢 New client connected. Total:", clients.length);

  socket.on("message", (msg) => {
    const messageText = msg.toString();

    // ✅ Broadcast to everyone EXCEPT the sender
    for (const client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(messageText);
      }
    }
  });

  socket.on("close", () => {
    clients = clients.filter((c) => c !== socket);
    console.log("🔴 Client disconnected. Total:", clients.length);
  });
});

console.log("✅ Chat WebSocket server running on ws://localhost:8080");
