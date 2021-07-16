import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as R from 'ramda';
import { Observable, combineLatest } from 'rxjs';
import { MeshComponent } from '../cell-mesh/mesh/mesh.component';
import { BattleState } from '../logic-battleship/battle-state';
import { BattleStateService } from '../logic-battleship/battle-state.service';
import { GameTurn } from '../logic-battleship/game-turn';


@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, AfterViewInit {
  @ViewChild('player1') p1!: MeshComponent;
  @ViewChild('player2') p2!: MeshComponent;
  isVertical: boolean = true;
  battleState$: Observable<BattleState>

  constructor(
    private battleStateService: BattleStateService
  ) {
    this.battleState$ = battleStateService.battleState$;
    console.log(this.battleStateService.battleState)
  }

  ngAfterViewInit(): void {
    combineLatest([this.battleState$, this.p1.meshCurrentCell.asObservable()])
      .subscribe(([state, currentCell]) => {
        switch (state.currentState) {
          case GameTurn.PUT_SHIPS:
            try {
              const shipFactory = state.factories[0];
              const ship = shipFactory(currentCell)
              ship.changeOrienation(this.isVertical);
              console.log(ship)
              this.p1.classHandler = (tuple) => ({
                'active': R.any(s => s.contains(tuple), state.ships),
                'no-selected': !ship.contains(tuple) && !R.any(s => s.contains(tuple), state.ships),
                'selected': ship.contains(tuple) && ship.isValidOnMesh(5, 5),
                'error': ship.contains(tuple) && (!ship.isValidOnMesh(5, 5) || R.any(s => s.intersectionWithShip(ship), state.ships)) 
              });
              this.p1.clickHandler = (tuple) => {
                if(!ship.isValidOnMesh(5,5)) { 
                  alert(`You cannot set this ship here`)
                  return;
                } else if(R.any(s => s.intersectionWithShip(ship), state.ships)) {
                  alert(`Ships intersection. No procced`);
                  return;
                }
                state.ships.push(ship);
                state.factories = R.tail(state.factories)
                if(R.isEmpty(state.factories)) {
                  state.currentState = GameTurn.WAITING_ANOTHER_PLAYER;
                }
              }
            } catch (error) {
              console.log(error)
            }
            break;
          case GameTurn.WAITING_ANOTHER_PLAYER:
            this.p1.classHandler = (tuple) => ([ 
              R.any(s => s.contains(tuple), state.ships) ? 'selected': 'no-selected'
            ])
            break;
        }
      })
  }

  ngOnInit(): void {
  }
}
