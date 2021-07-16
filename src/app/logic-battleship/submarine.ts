import { Ship } from "./ship";

export class Submarine extends Ship {
    constructor(cell: [number, number]) {
        super(cell, 3);
    }
}
