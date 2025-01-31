"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const store_1 = require("./store");
// const gameManager=new GameManager();
const logger = () => {
    setInterval(() => {
        console.log(store_1.gameManager.log());
    }, 5000);
};
exports.logger = logger;
