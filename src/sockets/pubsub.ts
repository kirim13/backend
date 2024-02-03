import { users } from "../typings/subscription";

class PubSubManager {
  channels: Map<
    string,
    { message: string; createdAt: string; subscribers: users[] }
  >;
  // brokerId: ReturnType<typeof setInterval> // numeric operations in browser-specific environment require casting
  // brokerId: NodeJS.Timeout;

  constructor() {
    this.channels = new Map();
    /*
    this.brokerId = global.setInterval(() => {
      this.broker();
    }, 1000);
    */
  }

  subscribe(subscriber: users, channel: string) {
    if (!this.channels.has(channel)) {
      console.log(`Created new channel: ${channel}`);
      this.channels.set(channel, {
        message: "",
        createdAt: "",
        subscribers: [],
      });
    }
    const channelData = this.channels.get(channel);
    if (channelData) {
      if (
        !channelData.subscribers.find((sub) => sub.userId === subscriber.userId)
      ) {
        channelData.subscribers.push(subscriber);
        console.log(`Subscribing ${subscriber.userId} to channel: ${channel}`);
      } else {
        console.log(
          `${subscriber.userId} already subscribed to channel: ${channel}`
        );
      }
    }
  }

  publish(subscriber: users, channel: string, message: string) {
    if (!this.channels.has(channel)) {
      console.log(
        `No active channel to publish to \nCreated new channel: ${channel}`
      );
      console.log(
        `Subscribing ${subscriber.userId} as host to channel: ${channel}`
      );
      const newSubscriber: users = {
        userId: subscriber.userId,
        subType: subscriber.subType,
        isHost: true,
      };
      this.channels.set(channel, {
        message: "",
        createdAt: "",
        subscribers: [newSubscriber],
      });
    }
    const channelData = this.channels.get(channel);
    if (channelData) {
      if (
        !channelData.subscribers.find((sub) => subscriber.userId === sub.userId)
      ) {
        const newSubscriber: users = {
          userId: subscriber.userId,
          subType: subscriber.subType,
          isHost: subscriber.isHost,
        };
        channelData.subscribers.push(newSubscriber);
      }

      const host = channelData.subscribers.find(
        (sub) => sub.isHost === true && sub.userId === subscriber.userId
      );
      if (!host) {
        console.log(
          `User: ${subscriber.userId} does not have permission to publish`
        );
        return;
      } else {
        channelData.message = message;
        channelData.createdAt = new Date().toLocaleTimeString("en-US");
        return channelData;
      }
    } else {
      console.log(`Channel: ${channel} not found.`);
    }
  }

  /*
  removeBroker() {
    global.clearInterval(this.brokerId);
  }
  
  //eslint-disable-next-line
  publish(publisher: any, channel: string, message: string) {
    this.channels[channel].message = message;
    this.channels[channel].createdAt = new Date().toLocaleTimeString("en-US");
  }

  broker() {
    for (const channel in this.channels) {
      if (Object.hasOwnProperty.call(this.channels, channel)) {
        const channelObj = this.channels[channel];
        try {
          if (channelObj.message) {
            console.log(
              `Found message in ${channel}: ${channelObj.message}, created at ${channelObj.createdAt}`
            );
            channelObj.subscribers.forEach((subscriber) => {
              subscriber.send(
                JSON.stringify({
                  message: channelObj.message,
                  createdAt: channelObj.createdAt,
                })
              );
            });
            channelObj.message = "";
          } // else console.log(`No message in channel ${channel}`); // Will keep printing no message
        } catch (err) {
          55;
          console.log(err);
        }
      }
    }
  }
  */
}

export default PubSubManager;
