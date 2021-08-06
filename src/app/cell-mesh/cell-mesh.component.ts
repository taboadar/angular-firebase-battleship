import { Component, Input, OnInit } from '@angular/core';
import * as R from 'ramda';

@Component({
  selector: 'app-cell-mesh',
  template: `
    <div class="mesh">
      <div class="row-mesh" *ngFor="let row of _rows">
        <div class="cell" 
            *ngFor="let col of _cols"
            [ngClass]="ngClassHandler(row,col)"
            (click)="clickHandler(row,col)"
            (mouseenter)="onmouseoverHandler(row,col)">
          <span><pre>{{row}},{{col}}</pre></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .mesh {
    display: flex;
  }
  .cell {
    height: 50px;
    width: 50px;
    background-color: white;
    border: black solid 1px;
  }
  .selected { background: lightgreen};
  .error { background: lightcoral};
  .ship { background: lightgrey };
  `]
})
export class CellMeshComponent implements OnInit {
  _rows = R.range(0,5);
  _cols = R.range(0,5);

  @Input() ngClassHandler = (x:number, y:number) => ({})
  @Input() clickHandler = (x:number, y:number) => {}
  @Input() onmouseoverHandler = (x:number, y: number) => {}


  constructor() { }

  ngOnInit(): void {
  }

}
