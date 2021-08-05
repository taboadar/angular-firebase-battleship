import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'battleship';
  menuToggle: boolean = false;
  playerInfo$: Observable<any>;


  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.playerInfo$ = this.auth.user.pipe(mergeMap(user => this.firestore.collection('users').doc(user!.uid).valueChanges()))
  }

  ngOnInit(): void {
  }

  doLogout() {
    this.auth.signOut().then(() => this.ngZone.run(() => this.router.navigate(['login'])))
  }

}
