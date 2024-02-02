class PubSubManager {
  channels: {
    [channel: string]: {
      message: string;
      createdAt: string;
      subscribers: WebSocket[];
    };
  };
  // brokerId: ReturnType<typeof setInterval> // numeric operations in browser-specific environment require casting
  brokerId: NodeJS.Timeout;

  constructor() {
    this.channels = {
      channel1: {
        message: "",
        createdAt: "",
        subscribers: [],
      },
      channel2: {
        message: "",
        createdAt: "",
        subscribers: [],
      },
    };
    this.brokerId = global.setInterval(() => {
      this.broker();
    }, 1000);
  }

  //eslint-disable-next-line
  subscribe(subscriber: any, channel: string) {
    console.log(`Subscribing to ${channel}`);
    this.channels[channel].subscribers.push(subscriber);
  }

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
}

export default PubSubManager;
