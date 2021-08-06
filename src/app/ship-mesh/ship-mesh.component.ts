import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CellMeshComponent } from '../cell-mesh/cell-mesh.component';
import { ShipService } from '../ship.service';
import { ShotService } from '../shot.service';
import * as R from 'ramda';

@Component({
  selector: 'app-ship-mesh',
  template: `<app-cell-mesh #mesh></app-cell-mesh>`,
  styles: [
  ]
})
export class ShipMeshComponent implements OnInit, AfterViewInit {
  @ViewChild(CellMeshComponent) mesh!: CellMeshComponent;

  constructor(
    public shipService: ShipService,
    public shotService: ShotService) { }

  ngAfterViewInit(): void {
    this.mesh.ngClassHandler = this.ngClassHandler.bind(this)
  }

  ngClassHandler(x: number, y:number) {
    const cellInShip = R.any(s => s.containCell(x,y), this.shipService.ships)
    const cellWithShot = this.shotService.isShotCell(x,y);
    return {
      'selected': cellInShip && !cellWithShot,
      'error': cellInShip && cellWithShot,
    }
  }

  ngOnInit(): void {
  }

}
