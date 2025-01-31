import { GameManager } from "./store";
import { logger } from "./logger";

logger();

setInterval(() => {
    GameManager.getInstance().addGame(Math.random().toString())
}, 5000);
