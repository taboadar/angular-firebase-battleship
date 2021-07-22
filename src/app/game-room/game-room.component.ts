import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators'
import { BattleStateService } from '../logic-battleship/battle-state.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent {
  currentGame$: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private activedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private battleStateService: BattleStateService,
  ) { 
    this.currentGame$ = combineLatest([this.auth.user, this.activedRoute.params]).pipe(
      mergeMap(([user, params]) => {
        return this.firestore.collection('games').doc(params.id).valueChanges();
      })
    );
  }
}
