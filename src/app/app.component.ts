import { Component, OnInit } from '@angular/core';
import { GameTurn } from './logic-battleship/game-turn';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase';
import { Observable, from } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'battleship';
  menuToggle: boolean = false;
  gameStates = [GameTurn.PUT_SHIPS, GameTurn.WAITING_ANOTHER_PLAYER, GameTurn.START_GAME, GameTurn.END_GAME];

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user) => {
      debugger
    })
  }

  ngOnInit(): void {
  }


  doLogin() {
    return this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  async doLogout() {
    await this.auth.signOut();
    return this.router.navigateByUrl('/login')
  }
}
