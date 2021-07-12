import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from './game-state';
import { GameTurn } from './game-turn';
import { Ship } from './ship';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private readonly _state = new BehaviorSubject<GameState>(new GameState());
  
  readonly gameState$ = this._state.asObservable();

  get gameState(): GameState {
    return this._state.getValue();
  }

  private set gameState(state: GameState) {
    this._state.next(state);
  }

  addShip(name: string, ship: Ship) {
    this.gameState = {
      ...this.gameState,
      ships: {
        ...this.gameState.ships,
        [name]: ship
      }
    }
  }

  insideAShip(tuple:Number[]) {
    const shipValues = R.values(this.gameState.ships).filter(x=>x instanceof Ship);
    function isInside([x,y]: Number[], ship: Ship) {
      if((ship.tail[0] == ship.head[0]) && (ship.head[0]== x)) {
        let max = Math.max(ship.tail[1], ship.head[1]);
        let min = Math.min(ship.tail[1], ship.head[1]);
        return (max >= y) && (min <= y);
      }
      else if((ship.tail[1] == ship.head[1]) && (ship.head[1] == y)) {
        let max = Math.max(ship.head[0], ship.tail[0]);
        let min = Math.min(ship.head[0], ship.tail[0]);
        return (max >= x) && (min <= x);
      }
      return false;
    }
    const isInsideCurry = R.curry(isInside);
    return R.any(isInsideCurry(tuple), shipValues);
  }

  addShot(tuple: number[]) {
    this.gameState = {
      ...this.gameState,
      shots: [...this.gameState.shots, tuple]
    }
  }

  updateTurn(gameTurn: GameTurn) {
    this.gameState = {
      ...this.gameState,
      currentTurn: gameTurn,
    }
  }

  constructor() { }
}
