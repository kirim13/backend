import { WebSocketServer, WebSocket } from "ws";
import { server } from "../server";
import cuid from "cuid";

const users: string[] = [];
const rooms: Map<string, string[]> = new Map(); // room, ws array (users)
const roomsMessage: Map<string, string[]> = new Map();
const messages: string[] = [];

function onSocketPreError(e: Error) {
  console.log(e);
}

function onSocketPostError(e: Error) {
  console.log(e);
}

const wss = new WebSocketServer({ noServer: true, path: "/chat" });

server.on("upgrade", (req, socket, head) => {
  socket.on("error", onSocketPreError);

  // Perform auth (use cookies)

  wss.handleUpgrade(req, socket, head, (ws) => {
    socket.removeListener("error", onSocketPreError);
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws) => {
  const roomId = "testing";
  const userId = cuid().toString();

  ws.send("Connection established");
  users.push(userId);
  console.log(`New user: ${userId} connected`);

  ws.on("error", onSocketPostError);

  ws.on("message", (msg, isBinary) => {
    // Include the client sending the message
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        // (&& ws !== client) to not include client
        const createdAt = new Date().toLocaleTimeString("en-US");
        client.send(msg, { binary: isBinary });
        messages.push(`${userId}: ${msg.toString()}, ${createdAt}`);
      }
    });
  });
  rooms.set(roomId, users);
  roomsMessage.set(roomId, messages);

  ws.on("close", () => {
    rooms.get(roomId)?.forEach((room, index) => {
      if (room === userId) {
        users.splice(index);
      }
    });
    console.log(`user: ${userId} disconnected`);
    if (users.length != 0) {
      console.log(`Connected users: ${users}`);
    } else {
      console.log(`No connected users`);
      console.log(`Logged messages from room: ${roomId}`);
      roomsMessage.get(roomId)?.forEach((msg) => {
        console.log(msg);
      });
    }
  });
});
