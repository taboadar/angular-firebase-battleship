import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CellMeshComponent } from '../cell-mesh/cell-mesh.component';
import * as R from 'ramda';
import { Ship } from '../ship';

@Component({
  selector: 'app-ship-mesh',
  template: `<app-cell-mesh #mesh></app-cell-mesh>`,
  styles: [
  ]
})
export class ShipMeshComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(CellMeshComponent) mesh!: CellMeshComponent;
  @Input() uid!: string;
  @Input() game!: any;
  ships: Ship[] = [];
  shots: [number, number][] = [];
  currentCell: [number, number] = [-1,-1];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!R.isNil(changes.game.currentValue)){
      const oponent = this.game.players.filter((x:any) => !R.equals(this.uid, x))[0];
      this.shots = this.game.shots?.[oponent]?.map(R.split(',')).map((x: string[]) => x.map(z => Number.parseInt(z)));
      this.ships = R.prop(this.uid, this.game).map((s:any) => Ship.fromJSON(s));
      this.mesh.ngClassHandler = this.ngClassHandler.bind(this);
      this.mesh.onmouseoverHandler = this.onmouseoverHandler.bind(this);
      this.mesh.showText = this.showText.bind(this);
    }
  }

  showText(x: number, y: number) {
    const ship = R.head(this.ships.filter(s => s.containCell(x,y)));
    if(ship) {
      return ship.name.toUpperCase().charAt(0);
    }
    return `${x},${y}`
  }
  
  onmouseoverHandler(x: number,y: number) {
    this.currentCell = [x, y]
  }

  ngAfterViewInit(): void {                                                         
    this.mesh.ngClassHandler = this.ngClassHandler.bind(this)
  }

  ngClassHandler(x: number, y:number) {
    const cellInShip = R.any(s => s.containCell(x,y), this.ships)
    const cellWithShot = R.any(R.equals([x,y]), this.shots || []);
    return {
      selected: cellInShip && !cellWithShot,
      error: cellInShip && cellWithShot,
      missingShot: cellWithShot && !cellInShip
    }
  }

  ngOnInit(): void {
  }

}
