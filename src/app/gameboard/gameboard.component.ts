import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() height: number = 5;
  @Input() width: number = 5;
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
              const ShipFactory = state.factories[0];
              const currentShip = ShipFactory(currentCell)
              currentShip.changeOrienation(this.isVertical);
              this.p1.classHandler = (tuple) => ({
                'active': R.any(s => s.contains(tuple), state.ships),
                'no-selected': !currentShip.contains(tuple) && !R.any(ship => ship.contains(tuple), state.ships),
                'selected': currentShip.contains(tuple) && currentShip.isValidOnMesh(this.width, this.height),
                'error': currentShip.contains(tuple) && (!currentShip.isValidOnMesh(this.width, this.height) || R.any(ship => ship.intersectionWithShip(currentShip), state.ships)) 
              });
              this.p1.clickHandler = (tuple) => {
                if(!currentShip.isValidOnMesh(this.width,this.height)) { 
                  alert(`You cannot set this ship here`)
                  return;
                } else if(R.any(s => s.intersectionWithShip(currentShip), state.ships)) {
                  alert(`Ships intersection. No procced`);
                  return;
                }
                state.ships.push(currentShip);
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
