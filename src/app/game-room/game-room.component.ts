import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'
import { BattleStateService } from '../logic-battleship/battle-state.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent {
  currentGame$: Observable<any>;
  gameId$: Observable<string>;

  constructor(
    private auth: AngularFireAuth,
    private activedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private battleStateService: BattleStateService,
    private activeRoute: ActivatedRoute
  ) { 
    this.gameId$ = this.activeRoute.params.pipe(map((params)=> params.id))
    this.currentGame$ = combineLatest([this.auth.user, this.activedRoute.params]).pipe(
      mergeMap(([user, params]) => {
        return this.firestore.collection('games').doc(params.id).valueChanges();
      })
    );
  }
}
