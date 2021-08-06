import { Injectable } from '@angular/core';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class ShotService {
  shots: [number,number][] = [];

  addShot(x: number, y: number) {
    this.shots = R.append([x,y], this.shots);
  }

  isShotCell(x: number, y: number) {
    return R.any(R.equals([x,y]), this.shots);
  }

  constructor() { }
}
