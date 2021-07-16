import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BattleState } from './battle-state';

@Injectable({
  providedIn: 'root'
})
export class BattleStateService {
  private readonly _state = new BehaviorSubject<BattleState>(new BattleState());
  readonly battleState$ = this._state.asObservable();

  get battleState(): BattleState {
    return this._state.getValue();
  }

  private set battleState(state: BattleState) {
    this._state.next(state);
  }

  constructor() { }
}
