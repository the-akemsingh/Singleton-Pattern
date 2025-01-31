import { games } from "./store";
import { logger } from "./logger";

logger();

setInterval(() => {
    games.push({
        id:Math.random().toString(),
        whitePlayer:'Elon',
        blackPlayer:'kamala',
        moves:[]
    })
}, 5000);