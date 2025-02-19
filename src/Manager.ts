import { createClient, RedisClientType } from "redis";

export class PubSubManger {
  //ensures only one instance of this class is created
  private static instance: PubSubManger;
  static getInstance() {
    if (!PubSubManger.instance) {
      PubSubManger.instance = new PubSubManger();
    }

    return PubSubManger.instance;
  }

  //creating and connecting redis client
  private redisClient: RedisClientType;
  //storing the record-which user is subscribed to which event
  private subscriptions: Map<string,Set<string>>;
  //when the first instance of the class will be created the redis client will connect and map data structure will be initialized
  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();

    // this.redisClient.on("message", (stock, message) => {
    //   this.HandleMessage(message, stock);
    // });
  }

  public Subscribe(userId: string, stock: string) {
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, new Set());
    }

    this.subscriptions.get(stock)?.add(userId);
    if (this.subscriptions.get(stock)?.size === 1) {
      this.redisClient.subscribe(stock, (message)=>{
        this.HandleMessage(message,stock)
      });
    }
  }
  public UnSubscribe(userId: string, stock: string) {
    this.subscriptions.get(stock)?.delete(userId);

    if (this.subscriptions.get(stock)?.size === 0) {
      this.redisClient.unsubscribe(stock);
      this.subscriptions.delete(stock);
      console.log(`Unsubscribe to redis channel: ${stock}`);
    }
  }
  private HandleMessage(message: string, stock: string) {
    console.log(`message received on channel${stock} : ${message}`);
    this.subscriptions.get(stock)?.forEach((user) => {
      console.log(`sending messsage to user : ${user}`);
    });
  }

  public Display() {
    this.subscriptions.forEach((users, stock) => {
      console.log(`Stock: ${stock}, Users: ${[...users].join(", ")}`);
    });
  }

  public async disconnect() {
    await this.redisClient.quit();
  }
} 