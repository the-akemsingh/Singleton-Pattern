import { gameManager } from "./store";


// const gameManager=new GameManager();

export const logger=()=>{
    setInterval(() => {
        console.log(gameManager.log())
    }, 5000);
} 