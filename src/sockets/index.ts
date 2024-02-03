import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import cuid from "cuid";
import PubSubManager from "./pubsub";
import { users } from "../typings/subscription";
import * as UserServices from "../services/Users/userService";

const users: string[] = [];
const rooms: Map<string, string[]> = new Map(); // room, ws array (users)
const roomsMessage: Map<string, string[]> = new Map();
const messages: string[] = [];
const pubSubManager = new PubSubManager();

declare module "ws" {
  interface WebSocket {
    isAlive: boolean;
    userEmail: string;
  }
}

function onSocketPreError(e: Error) {
  console.log(e);
}

function onSocketPostError(e: Error) {
  console.log(e);
}

async function getUsersEmail(id: string) {
  const user = await UserServices.getUser(id);
  if (user) {
    return user.email;
  } else {
    console.log(`Cannot find user with id: ${id}`);
  }
}

// const HEARTBEAT_INTERVAL = 1000 * 20; // 20 seconds
// const HEARTBEAT_VALUE = 1;

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

  wss.on("connection", async (ws: WebSocket) => {
    ws.isAlive = true;
    const userId = cuid();
    const userEmail = await getUsersEmail("cls5uk5us0000gelocbybczzj");
    ws.send("Connection established");
    if (userEmail) {
      ws.userEmail = userEmail;
    }
    users.push(userId);
    console.log(`New user: ${userId} connected`);

    ws.on("error", onSocketPostError);

    ws.on("message", (data: string) => {
      try {
        const json = JSON.parse(data);
        const { request, message, channel, isHost } = json;
        const subscriber: users = { userId, subType: "TEXT", isHost };
        //eslint-disable-next-line
        let channelData: any;
        switch (request) {
          case "PUBLISH":
            channelData = pubSubManager.publish(subscriber, channel, message);

            if (channelData) {
              let counter = 0;
              wss.clients.forEach((client) => {
                // Include the client sending the message
                if (client.readyState === WebSocket.OPEN) {
                  const subscriber = channelData.subscribers[counter++];
                  const sentMessage = `${subscriber.userId}: ${message} SENT, ${channelData.createdAt}`;
                  const receivedMessage = `${subscriber.userId}: ${message} RECEIVED, ${channelData.createdAt}`;
                  if (subscriber.isHost === true) {
                    client.send(sentMessage);
                    messages.push(sentMessage);
                  } else {
                    client.send(receivedMessage);
                    messages.push(receivedMessage);
                  }
                }
              });
            } else {
              console.log("No active channel to publish");
            }
            break;

          case "SUBSCRIBE":
            pubSubManager.subscribe(subscriber, channel);
            ws.isAlive = true;
            break;
        }
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
