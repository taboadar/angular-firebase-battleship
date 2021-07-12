import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState } from '../cell-mesh/game-state';
import { GameStateService } from '../cell-mesh/game-state.service';
import { GameTurn } from '../cell-mesh/game-turn';
import { MeshComponent } from '../cell-mesh/mesh/mesh.component';
import { MeshPreparationService } from '../mesh-preparation.service';
import { WaitingForPlayerService } from '../waiting-for-player.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, AfterViewInit {
  @ViewChild('player1') p1!: MeshComponent;
  @ViewChild('player2') p2!: MeshComponent;
  gameState$: Observable<GameState>;
  
  constructor(
    private gameState: GameStateService,
    private preparationSVC: MeshPreparationService,
    private waitingSVC: WaitingForPlayerService,
  ) {
    this.gameState$ = this.gameState.gameState$
  }

  ngAfterViewInit(): void { 
    this.gameState$.subscribe((state) => {
      console.log(state);
      switch(state.currentTurn) {
        case GameTurn.WAITING_PLAYER:
          this.p1.meshHandler = this.preparationSVC;
          break;
        case GameTurn.WAITING_PLAYER_2:
          this.p1.meshHandler = this.waitingSVC;
          break;
      }
    })
  }

  ngOnInit(): void {
  }

  nextStep() {
    this.gameState.updateTurn(GameTurn.WAITING_PLAYER_2)
  }
}
