import { Injectable } from '@angular/core';
import { MeshHandler } from './cell-mesh/mesh-handler';

@Injectable({
  providedIn: 'root'
})
export class WaitingForPlayerService implements MeshHandler {

  constructor() { }
  classesHandler([x, y]: number[]) {
    return {'active': true}
  }
  mouseenterHandler([x, y]: number[]): void {
  }
  mouseleaveHandler([x, y]: number[]): void {
  }
  clickHandler([x, y]: number[]): void {
  }
}
