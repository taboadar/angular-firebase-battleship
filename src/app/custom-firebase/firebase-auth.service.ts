import { Inject, Injectable } from '@angular/core';
import firebase from 'firebase';
import * as R from 'ramda';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

export const USE_EMULATOR = 'USE_FIREBASE_AUTH_EMULATOR';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private auth: firebase.auth.Auth;
  loggedInSubject: ReplaySubject<firebase.User | null>;
  currentUser$: Observable<firebase.User | null>;

  constructor(
    @Inject('FIREBASE_APPLICATION') private firebaseApp: firebase.app.App,
    @Inject(USE_EMULATOR) useEmulator: string[] | null,
  ) {
    this.auth = this.firebaseApp.auth();
    if(!R.isNil(useEmulator)) { 
      this.auth.useEmulator(`http://${useEmulator.join(":")}`)
    }
    this.loggedInSubject = new ReplaySubject(1);
    this.auth.onAuthStateChanged(this.loggedInSubject);
    this.currentUser$ = this.loggedInSubject.asObservable();
  }

  signInWithGoogle() {
    return this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signOut() {
    return this.auth.signOut();
  }
}
