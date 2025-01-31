interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  //games array and its constructor
  games: Game[] = [];
  private constructor() {
    this.games = [];
  }

  //defining instance and serving it
  private static instance: GameManager;
  static getInstance() {
    //if instance of this class is already there, return it else create the instance and serve it.
    if(GameManager.instance){
        return GameManager.instance;
    }
    GameManager.instance=new GameManager();
    return GameManager.instance;
  }

  //methods of game
  addMove(gameId: string, move: string) {
    console.log(`Adding move ${move} to game ${gameId}`);
    const game = this.games.find((game) => game.id === gameId);
    game?.moves.push(move);
  }
  addGame(gameId: string) {
    const game = {
      id: gameId,
      whitePlayer: "Elon",
      blackPlayer: "Kamala",
      moves: [],
    };
    this.games.push(game);
  }
  log() {
    console.log(this.games);
  }
}

