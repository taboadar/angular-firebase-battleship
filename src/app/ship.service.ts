import { Injectable } from '@angular/core';
import { Ship } from './ship';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  addMultipleShips(payload: any[]) {
    this.ships = payload.map((x) => Ship.fromJSON(x))
  }
  
  addShip(ship: Ship) {
    this.ships = [...this.ships, ship];
  }

  isInShip(x:number, y:number) {
    return R.any(s => s.containCell(x,y), this.ships)
  }

  ships: Ship[] = [];

  constructor() { }
}
