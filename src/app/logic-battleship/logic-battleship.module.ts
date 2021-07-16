import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../cell-mesh/game-state.service';



@NgModule({
  declarations: [ GameStateService ],
  imports: [
    CommonModule
  ],
  exports: [GameStateService]
})
export class LogicBattleshipModule { }
