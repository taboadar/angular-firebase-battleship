import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MeshHandler } from './mesh-handler';

@Injectable({
  providedIn: 'root'
})
export class WaitingStateService implements MeshHandler {

  constructor() { }
  classesHandler([x, y]: number[]): Observable<any> {
    return new BehaviorSubject<any>(null).asObservable();
  }
  
  mouseenterHandler([x, y]: number[]): void {
  }
  mouseleaveHandler([x, y]: number[]): void {
  }
  clickHandler([x, y]: number[]): void {
  }
}
