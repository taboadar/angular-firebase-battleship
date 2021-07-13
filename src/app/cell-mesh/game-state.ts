import { GameTurn } from "./game-turn";
import { Ship } from "./ship";

export class GameState {
    currentTurn: GameTurn;
    constrain: any;
    ships: { submarine: Ship | null, destroyed: Ship | null, battleship: Ship | null};
    shots: number[][];

    constructor() {
        this.currentTurn = GameTurn.PUT_SUBMARINE;
        this.constrain = {
            submarine: 3,
            destroyer: 4,
            battleship: 2
        };
        this.ships = {
            submarine: null,
            destroyed: null,
            battleship: null,
        }
       
        this.shots = [];
    }
}
