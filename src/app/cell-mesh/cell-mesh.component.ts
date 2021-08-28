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
          <span><pre>{{ showText(row,col) }}</pre></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .mesh {
    display: flex;
  }
  .row-mesh {
    flex: 1 0 auto;
    height: auto;
  };
  .row-mesh:before {
    content: '';
    display: block;
    padding-top: 100%;
  };
  .cell {
    background-color: white;
    border: black solid 1px;
  }
  .selected { background: lightgreen};
  .error { background: lightcoral};
  .ship { background: orange };
  .missingShot { background: lightgrey}
  `]
})
export class CellMeshComponent implements OnInit {
  _rows = R.range(0,5);
  _cols = R.range(0,5);

  @Input() ngClassHandler = (x:number, y:number) => ({})
  @Input() clickHandler = (x:number, y:number) => {}
  @Input() onmouseoverHandler = (x:number, y: number) => {}
  @Input() showText = (x: number, y: number) => `${x},${y}`


  constructor() { }

  ngOnInit(): void {
  }

}
