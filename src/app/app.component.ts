import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'battleship';
  menuToggle: boolean = false;
  gameStatus$: Observable<any>;


  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private fns: AngularFireFunctions,
  ) {
    this.gameStatus$ = this.auth.user.pipe(
      mergeMap(user => {
        if(!user) { return of({}); }
        return this.firestore.collection('users').doc(user?.uid).valueChanges();
      })
    )
  }

  ngOnInit(): void {
    this.gameStatus$.subscribe(console.log)
  }

  doLogout() {
  }

  createGame() {
    console.log(this.fns)
    // console.log(this.functions)
    // this.functions.httpsCallable('createGame')({}).toPromise();
  }

}
