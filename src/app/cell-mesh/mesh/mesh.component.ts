import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { range , reverse, } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { MeshHandler } from '../mesh-handler';

@Component({
  selector: 'app-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss']
})
export class MeshComponent implements OnInit {
  _width: number[] = [];
  _height: number[] = [];
  @Input()
  set width(num: number) {
    this._width = range(0, num);
  }
  @Input()
  set height(num: number) {
    this._height = reverse(range(0, num))
  }
  @Input() id!: string;
  @Input("show") showPosition = false;
  @Input() classHandler: (t:[number, number]) => any = (tuple:[number, number]) => {
    return {'no-selected': true}
  }
  @Input() clickHandler = (tuple:[number, number]) => {};
  @Input() disabledHandler = (tuple:[number, number]) => false;

  @Output() meshCurrentCell = new EventEmitter<[number, number]>();

  constructor() { }
  ngOnInit(): void {
    this.meshCurrentCell.emit([-1,-1])
  }

  setCurrentCell(tuple: [number, number]) {
    this.meshCurrentCell.emit(tuple);
  }

  turnOffCell() {
    this.meshCurrentCell.emit([-1,-1]);
  }
}
