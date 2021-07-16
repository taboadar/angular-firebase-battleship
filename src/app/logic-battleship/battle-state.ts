import { Battleship } from "./battleship";
import { Destroyer } from "./destroyer";
import { GameTurn } from "./game-turn";
import { Ship } from "./ship";
import { Submarine } from "./submarine";

export class BattleState {
    currentState: GameTurn;
    ships: Ship[];
    factories: ((x: [number, number]) => Ship)[];
    shots: [number, number][];

    constructor() {
        this.currentState = GameTurn.PUT_SHIPS;
        this.factories = [
            (cell) => new Destroyer(cell),
            (cell) => new Submarine(cell),
            (cell) => new Battleship(cell)
        ];
        this.ships = [];
        this.shots = [];
    }
}
