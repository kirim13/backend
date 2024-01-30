import { WebSocketServer } from "ws";
import { server } from "./server";

function onSocketPreError(e: Error) {
  console.log(e);
}

function onSocketPostError(e: Error) {
  console.log(e);
}

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  socket.on("error", onSocketPreError);

  // Perform auth (use cookies)

  wss.handleUpgrade(req, socket, head, (ws) => {
    socket.removeListener("error", onSocketPreError);
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws) => {
  ws.on("error", onSocketPostError);
  ws.on("message", (msg, isBinary) => {
    // Does not include the client sending the message
    wss.clients.forEach((client) => {
      if (ws !== client && client.readyState === WebSocket.OPEN) {
        client.send(msg, { binary: isBinary });
      }
    });
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});
