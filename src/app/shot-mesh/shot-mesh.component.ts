import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CellMeshComponent } from '../cell-mesh/cell-mesh.component';
import { ShipService } from '../ship.service';
import { ShotService } from '../shot.service';

@Component({
  selector: 'app-shot-mesh',
  template: `<app-cell-mesh #mesh></app-cell-mesh>`,
  styles: [
  ]
})
export class ShotMeshComponent implements OnInit, AfterViewInit {
  @ViewChild(CellMeshComponent) mesh!: CellMeshComponent;

  constructor(
    public shotService: ShotService,
    public shipService: ShipService
  ) { }

  ngAfterViewInit(): void {
    this.mesh.ngClassHandler = this.ngClassHandler.bind(this);
    this.mesh.clickHandler = this.clickHandler.bind(this)
  }

  ngOnInit(): void {
  
  }

  clickHandler(x: number, y: number) {
    this.shotService.addShot(x,y);
  }

  ngClassHandler(x: number, y: number) {   
    return {
      'selected': this.shotService.isShotCell(x,y) && this.shipService.isInShip(x,y),
      'error': this.shotService.isShotCell(x,y) && !this.shipService.isInShip(x,y),
    }
  }
}
