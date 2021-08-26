import { AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Ship } from '../ship';
import * as R from 'ramda';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit, OnChanges {
  @Input('game') gameRef!: string;
  @Input('uid') userUid!: string
  game$: Observable<any> = of({});
  state: string = 'SELECT_SHIP'
  isPlayer1: boolean = false;
  orientation = false;

  constructor(
    private fdb: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.game$ = this.fdb.collection('games').doc(this.gameRef).valueChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fdb.collection('games').doc(this.gameRef).valueChanges()
      .subscribe((snapshot: any) => {
        this.state = snapshot.state;
        this.isPlayer1 = snapshot.p1 == this.userUid;
      })
  }

  async updateShotInfo(shot: [number, number]) {
    const gameRef = this.fdb.collection('games').doc(this.gameRef);
    const gameData = (await gameRef.get().toPromise()).data() as any;
    return await gameRef.set({
      shots: {
        ...gameData.shots,
        [this.userUid] : R.append(shot.join(','), gameData.shots?.[this.userUid] || []),
      }
    }, { merge: true})
  }

  async shipsSelectedHandler(ships: Ship[]) {
    const user = await this.auth.currentUser;
    const body = {
      [user?.uid || '']: ships.map(ship => ship.toJSON())
    }
    await this.fdb.collection('games').doc(this.gameRef).update(body)
  }

}
