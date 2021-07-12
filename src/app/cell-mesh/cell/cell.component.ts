import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { o } from 'ramda';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, OnDestroy, OnChanges {
  @Input() ngClasses: any = {}

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void { 
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

}
