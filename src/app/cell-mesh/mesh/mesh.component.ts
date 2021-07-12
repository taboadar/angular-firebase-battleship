import { Component, Input, OnInit } from '@angular/core';
import { always, range , reverse, } from 'ramda';
import { noop } from 'rxjs';
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
  @Input("show") showPosition = false;
  @Input("handler") meshHandler: MeshHandler = {
    classesHandler: (tuple: Number[]) => ({}),
    mouseenterHandler: (tuple: Number[]) => {},
    mouseleaveHandler: (tuple: Number[]) => {},
    clickHandler: (tuple: Number[]) => {},
  };

  constructor() { }

  ngOnInit(): void {
  }
}
