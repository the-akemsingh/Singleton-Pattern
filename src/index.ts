import { gameManager } from "./store";
import { logger } from "./logger";

logger();
// const gameManager=new GameManager();

setInterval(() => {
    gameManager.addGame(Math.random().toString())
}, 5000);




//this approach is slightly better and gives structure and its easy to call the functions to add or create a new game, using classes.

// const gameManager=new GameManager(); -- this line creates a new object of the class, so doing everytime will always create a new instance of the class.

// so we created the object on the store.ts file and imported it in every other file. To ensure only one object of the class is created.

//PROBLEM WITH THIS APPROACH: by mistake developer can create new instances of the class. 
// Creating singletons is considered better practice to avoid such type of errors.