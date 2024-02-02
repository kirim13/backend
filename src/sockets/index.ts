import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import cuid from "cuid";
import PubSubManager from "./pubsub";

const users: string[] = [];
const rooms: Map<string, string[]> = new Map(); // room, ws array (users)
const roomsMessage: Map<string, string[]> = new Map();
const messages: string[] = [];
const pubSubManager = new PubSubManager();

// const HEARTBEAT_INTERVAL = 1000 * 20; // 20 seconds
// const HEARTBEAT_VALUE = 1;

function onSocketPreError(e: Error) {
  console.log(e);
}

function onSocketPostError(e: Error) {
  console.log(e);
}

/*
function ping(ws: WebSocket) {
  ws.send(HEARTBEAT_VALUE, { binary: true });
}
*/

export default function configure(server: Server) {
  const wss = new WebSocketServer({ noServer: true, path: "/chat" });

  server.on("upgrade", (req, socket, head) => {
    socket.on("error", onSocketPreError);

    // Perform auth (use cookies)

    wss.handleUpgrade(req, socket, head, (ws, req) => {
      socket.removeListener("error", onSocketPreError);
      wss.emit("connection", ws, req);
    });
  });

  wss.on("connection", (ws: WebSocket) => {
    ws.isAlive = true;
    const userId = cuid();

    ws.send("Connection established");
    users.push(userId);
    console.log(`New user: ${userId} connected`);

    ws.on("error", onSocketPostError);

    ws.on("message", (data: string) => {
      // , isBinary
      // Include the client sending the message
      try {
        const json = JSON.parse(data);
        const request = json.request;
        const message = json.message;
        const channel = json.channel;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            switch (request) {
              case "PUBLISH":
                pubSubManager.publish(ws, channel, message);
                messages.push(message);
                break;
              case "SUBSCRIBE":
                pubSubManager.subscribe(ws, channel);
                ws.isAlive = true;
                break;
            }
          }
          // (&& ws !== client) to not include client
          // client.send(message, { binary: isBinary });
          // messages.push(`${userId}: ${message}, ${createdAt}`);
        });
        rooms.set(channel, users);
        roomsMessage.set(channel, messages);
      } catch (err) {
        console.log(err);
      }
    });

    ws.on("close", () => {
      users.forEach((user, index) => {
        if (user === userId) {
          users.splice(index, 1);
        }
      });
      console.log(`user: ${userId} disconnected`);
      if (users.length != 0) {
        console.log(`Connected users: ${users}`);
      } else {
        console.log(`No connected users`);
        console.log(roomsMessage);
      }
    });
  });

  /*
  const interval = setInterval(() => {
    wss.clients.forEach((client) => {
      if (!client.isAlive) {
        client.terminate();
        return;
      }
      client.isAlive = false;
      ping(client);
    });
  }, HEARTBEAT_INTERVAL);

  wss.on("close", () => {
    clearInterval(interval);
  });
  */
}
