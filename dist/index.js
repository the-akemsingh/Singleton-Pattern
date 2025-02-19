"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("./Manager");
// setInterval(() => {
(_a = Manager_1.PubSubManger.getInstance()) === null || _a === void 0 ? void 0 : _a.Subscribe(Math.random().toString(), "trump");
(_b = Manager_1.PubSubManger.getInstance()) === null || _b === void 0 ? void 0 : _b.Display();
// }, 5000);
// PubSubManger.getInstance()?.DisplayRecord();
