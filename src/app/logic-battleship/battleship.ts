import { Ship } from "./ship";

export class Battleship extends Ship {
    constructor(cell: [number, number]) {
        super(cell, 2);
    }
}
