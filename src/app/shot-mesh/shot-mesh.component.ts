import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CellMeshComponent } from '../cell-mesh/cell-mesh.component';
import * as R from 'ramda';
import { Ship } from '../ship';

@Component({
  selector: 'app-shot-mesh',
  template: `<app-cell-mesh #mesh></app-cell-mesh>`,
  styles: [
  ]
})
export class ShotMeshComponent implements OnChanges {
  @ViewChild(CellMeshComponent) mesh!: CellMeshComponent;
  @Input() uid!: string;
  @Input() game!: any;
  @Output() onShot = new EventEmitter<[number, number]>();

  ships: Ship[] = [];
  shots: [number, number][] = [];

  constructor(
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(!this.mesh) { return; }
    const oponent = this.game.players.filter((x:any) => !R.equals(this.uid, x))[0];
    console.log({oponent})
    this.shots = this.game.shots?.[this.uid]?.map(R.split(',')).map((x: string[]) => x.map(z => Number.parseInt(z)));
    this.ships = R.prop(oponent, this.game).map((s:any) => Ship.fromJSON(s));
    this.mesh.clickHandler = this.clickHandler.bind(this);
    this.mesh.ngClassHandler   = this.ngClassHandler.bind(this);
  }

  clickHandler(x: number, y: number) {
    this.onShot.emit([x,y]);
  }

  ngClassHandler(x: number, y:number) {
    const cellInShip = R.any(s => s.containCell(x,y), this.ships)
    const cellWithShot = R.any(R.equals([x,y]), this.shots);
    return {
      error: cellWithShot && !cellInShip,
      selected: cellWithShot && cellInShip
      // error: cellInShip && !cellWithShot,
      // selected: cellInShip && cellWithShot,
    }
  }
}
