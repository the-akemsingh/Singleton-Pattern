import { GameManager } from "./store";


export const logger=()=>{
    setInterval(() => {
        console.log(GameManager.getInstance().log())
    }, 5000);
} 