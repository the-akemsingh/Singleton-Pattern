"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const store_1 = require("./store");
const logger = () => {
    setInterval(() => {
        console.log(store_1.games);
    }, 5000);
};
exports.logger = logger;
