import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators'
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  gameStatus$: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    public httpReq: HttpRequestsService,
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
