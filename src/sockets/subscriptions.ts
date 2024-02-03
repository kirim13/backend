import { type } from "../typings/subscription";
import cuid from "cuid";

interface user {
  clientId: string;
  contactType: type;
}

class Subscription {
  // Properties
  subscriptions: Map<string, { topic: string; users: user[] }>;

  // Constructor
  constructor() {
    this.subscriptions = new Map<string, { topic: string; users: user[] }>();
  }

  // Methods
  /**
   * Return subscription where id found
   * @param {string} id
   */
  getSubscription(id: string) {
    return this.subscriptions.get(id);
  }

  /**
   * Return subscription(s) where client's id found
   * @param {string} userId
   */
  getSubscriptionViaClientId(topic: string, clientId: string) {
    this.subscriptions.forEach((value) => {
      if (value.topic === topic) {
        value.users.forEach((user) => {
          if (user.clientId === clientId) {
            console.log(`User: ${clientId} already subscribed to: ${topic}`);
            return true;
          }
        });
      }
    });
    return false;
  }

  /**
   * Add new subscription
   * @param topic
   * @param clientId
   * @param type
   */
  addSubscription(topic: string, userData: user) {
    const { clientId, contactType } = userData;
    try {
      if (this.getSubscriptionViaClientId(topic, clientId)) {
        return;
      }

      const id = this.createId();
      const newUser: user = { clientId: clientId, contactType: contactType };
      const subscription = {
        topic: topic,
        users: [newUser],
      };

      this.subscriptions = this.subscriptions.set(id, subscription);
      // ("1", {topic: "Music", users: [{clientId: "0000", type:"TEXT"}]})
      return console.log(`${clientId} subscribed to ${topic} successfully`);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Remove a subscription
   * @param id
   */
  removeSubscription(id: string) {
    try {
      if (this.subscriptions.get(id)) {
        this.subscriptions.delete(id);
        console.log(`Deleted subscription with id: ${id} successfully`);
      } else throw new Error(`Delete subscription with id: ${id} failed`);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Clear all subscriptions
   */
  clearSubscriptions() {
    try {
      this.subscriptions.clear();
      console.log(`Cleared all subscriptions`);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Create new cuid Id
   * @returns {string}
   */
  createId() {
    return cuid();
  }
}

export default Subscription;
