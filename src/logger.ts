import { games } from "./store";

export const logger=()=>{
    setInterval(() => {
        console.log(games)
    }, 5000);
} 