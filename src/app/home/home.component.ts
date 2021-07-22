import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeGames$: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private functions: AngularFireFunctions,
    private router: Router,
    private ngZone:  NgZone,
  ) { 
    this.activeGames$ = this.firestore.collection('games').valueChanges();
  }

  ngOnInit(): void {
    this
  }

  joinGame(game_id: string) { 
    this.functions.httpsCallable('joinToGame')({game_id})
      .toPromise()
      .then(data => this.ngZone.run(() => this.router.navigateByUrl(`/game/${game_id}`)))
  }

  createNewGame() {
    this.functions.httpsCallable('joinToGame')({})
      .toPromise()
      .then(data => {
        this.ngZone.run(() => this.router.navigateByUrl(`/game/${data.game_id}`))
      })
  }

}
