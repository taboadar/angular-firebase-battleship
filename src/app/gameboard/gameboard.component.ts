import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { GameState } from '../cell-mesh/game-state';
import { GameStateService } from '../cell-mesh/game-state.service';
import { GameTurn } from '../cell-mesh/game-turn';
import { MeshComponent } from '../cell-mesh/mesh/mesh.component';
import * as R from 'ramda';
import { ThrowStmt } from '@angular/compiler';
import { Ship } from '../cell-mesh/ship';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, AfterViewInit {
  @ViewChild('player1') p1!: MeshComponent;
  @ViewChild('player2') p2!: MeshComponent;
  isVertical: boolean = true;
  gameState$: Observable<GameState>;
  
  constructor(
    private gameStateService: GameStateService
  ) {
    this.gameState$ = this.gameStateService.gameState$
  }

  ngAfterViewInit(): void { 
    combineLatest([this.gameState$, this.p1.meshCurrentCell.asObservable()])
      .subscribe(([state, cell]) => {
        console.log(`Turn ${state.currentTurn} pos ${cell}`)
        switch(state.currentTurn) {
          case GameTurn.PUT_SUBMARINE:
            this.p1.classHandler = (tuple) => {
              let [x,y] = cell;
              let submarineLength = state.constrain.submarine;
              let newCssClass = {
                'selected': R.any(R.identity, R.map(nY => R.equals([x,nY], tuple) ,R.range(y, y+ submarineLength))),
                'no-active': this.gameStateService.insideAShip(tuple),
              }
              return R.filter<any>(R.identity, newCssClass)
            };
            this.p1.clickHandler = (tuple) => {
              const [x,y] = tuple;
              const ship = new Ship;
              ship.head = tuple;
              ship.tail = [x, y + (state.constrain.submarine-1)];
              this.gameStateService.addShip('submarine', ship);
              this.gameStateService.updateTurn(GameTurn.PUT_DESTROYER);
            }
        }
      });

    combineLatest([this.gameState$, this.p2.meshCurrentCell.asObservable()])
      .subscribe(([state, cell]) => {})
  }

  ngOnInit(): void {
  }

  triggerCurrentCellP1(tuple: number[]){
    console.log(tuple)
  }
}
