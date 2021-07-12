import { GameTurn } from "./game-turn";
import { Ship } from "./ship";

export class GameState {
    currentTurn: GameTurn;
    ships: { submarine: Ship | null, destroyed: Ship | null, battleship: Ship | null};
    shots: number[][];

    constructor() {
        this.currentTurn = GameTurn.WAITING_PLAYER;
        this.ships = {
            submarine: null,
            destroyed: null,
            battleship: null,
        }
        this.shots = [];
    }
}
