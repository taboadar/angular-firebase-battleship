import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  gameStatus$: Observable<any>;
  @Input() createGame!: () => void;
  @Input() joinGame!: () => void;

  constructor(
    public auth: AngularFireAuth,
    public fdb: AngularFirestore,
  ) {

    this.gameStatus$ = this.auth.user.pipe(
      mergeMap(user => {
        if(!user) { return of({}); }
        return this.fdb.collection('users').doc(user?.uid).valueChanges()
      })
    )
  }

  ngOnInit(): void {
    
  }

  googleSignIn() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signOut() {
    this.auth.signOut();
  }
}
