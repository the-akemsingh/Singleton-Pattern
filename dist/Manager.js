"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManger = void 0;
const redis_1 = require("redis");
class PubSubManger {
    static getInstance() {
        if (!PubSubManger.instance) {
            PubSubManger.instance = new PubSubManger();
        }
        return PubSubManger.instance;
    }
    //when the first instance of the class will be created the redis client will connect and map data structure will be initialized
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
        // this.redisClient.on("message", (stock, message) => {
        //   this.HandleMessage(message, stock);
        // });
    }
    Subscribe(userId, stock) {
        var _a, _b;
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, new Set());
        }
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.add(userId);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.size) === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.HandleMessage(message, stock);
            });
        }
    }
    UnSubscribe(userId, stock) {
        var _a, _b;
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.delete(userId);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.size) === 0) {
            this.redisClient.unsubscribe(stock);
            this.subscriptions.delete(stock);
            console.log(`Unsubscribe to redis channel: ${stock}`);
        }
    }
    HandleMessage(message, stock) {
        var _a;
        console.log(`message received on channel${stock} : ${message}`);
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.forEach((user) => {
            console.log(`sending messsage to user : ${user}`);
        });
    }
    Display() {
        this.subscriptions.forEach((users, stock) => {
            console.log(`Stock: ${stock}, Users: ${[...users].join(", ")}`);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.quit();
        });
    }
}
exports.PubSubManger = PubSubManger;
