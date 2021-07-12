import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MeshHandler } from './cell-mesh/mesh-handler';
import * as R from 'ramda';
import { GameStateService } from './cell-mesh/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class MeshPreparationService implements MeshHandler {
  constructor(
    private gameState: GameStateService
  ) {}
  classesHandler([x, y]: number[]) {
    return ['no-selected']
  }
  mouseenterHandler([x, y]: number[]): void {
    console.log(this.gameState)
  }
  mouseleaveHandler([x, y]: number[]): void {
  }
  clickHandler([x, y]: number[]): void {
  }
}

