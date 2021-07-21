import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from './custom-firebase/firebase-auth.service';
import { GameTurn } from './logic-battleship/game-turn';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battleship';
  menuToggle: boolean = false;
  currentUser$: Observable<firebase.User | null>;
  gameStates = [GameTurn.PUT_SHIPS, GameTurn.WAITING_ANOTHER_PLAYER, GameTurn.START_GAME, GameTurn.END_GAME];

  constructor(
    private auth: FirebaseAuthService,
    private router: Router
  ) {
    this.currentUser$ = this.auth.currentUser$;
  }


  doLogin() {
    return this.auth.signInWithGoogle()
  }

  async doLogout() {
    await this.auth.signOut();
    return this.router.navigateByUrl('/login')
  }
}
