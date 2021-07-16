import { Ship } from "./ship";

export class Destroyer extends Ship {
    constructor(cell:[number, number]) {
        super(cell, 4);
    }
}
