import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import * as R from 'ramda';
import { CellMeshComponent } from '../cell-mesh/cell-mesh.component';
import { Ship } from '../ship';
import { ShipService } from '../ship.service';

@Component({
  selector: 'app-select-ship-mesh',
  template: `<app-cell-mesh #mesh></app-cell-mesh>`,
  styles: []
})
export class SelectShipMeshComponent implements  OnChanges, AfterViewInit {
  @Input() isVertical!: boolean;
  @Output() shipsComplete = new EventEmitter<Ship[]>();
  @ViewChild(CellMeshComponent) mesh!: CellMeshComponent;
  private shipFactory: Ship[] = [
    new Ship('Destroyer',4), 
    new Ship('Submarine', 3), 
    new Ship('Battleship',2),
    new Ship('Battleship2',2),
  ]
  ship = this.shipFactory[0];
  private shipService = new ShipService();

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.mesh.ngClassHandler = this.ngClassHandler.bind(this);
  }

  ngAfterViewInit(): void {
    this.mesh.onmouseoverHandler = this.onmouseoverHandler.bind(this);
    this.mesh.clickHandler = this.clickHandler.bind(this);
    this.mesh.ngClassHandler = this.ngClassHandler.bind(this);
  }

  onmouseoverHandler(x: number,y:number) {
    this.ship?.setBody(x,y,this.isVertical);
  }

  ngClassHandler(x: number, y: number) {
    const cellInCurrentShip = this.ship?.containCell(x,y);
    const cellInSelectedShips = R.any( s => s.containCell(x,y) , this.shipService.ships)
    const currentShipIntersection = R.any(s => s.containShip(this.ship), this.shipService.ships)
    return {
      'selected': cellInCurrentShip && this.ship?.isValidOnMesh(5,5),
      'ship': cellInSelectedShips,
      'error': cellInCurrentShip && (!this.ship?.isValidOnMesh(5,5) || currentShipIntersection)
    }
  }

  clickHandler(x: number, y: number) {
    const shipsTail = R.tail(this.shipFactory);
    if(R.any(s => this.ship.containShip(s), this.shipService.ships)) {
      alert('You can not put the ship here');
      return;
    }
    if(this.ship.isValidOnMesh(5,5)) {
      this.shipService.addShip(this.ship)
    }
    if(R.isEmpty(shipsTail)) {
      console.log(this.shipService.ships)
      this.shipsComplete.emit(this.shipService.ships);
      return;
    }
    if(!this.ship?.isValidOnMesh(5,5)) {
      alert('Ship is not valid')
      return;
    }
    this.shipFactory = shipsTail;
    this.ship = this.shipFactory[0];
  }

}
