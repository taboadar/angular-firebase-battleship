import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseAuthService } from '../custom-firebase/firebase-auth.service';
import { FirebaseFirestoreService } from '../custom-firebase/firebase-firestore.service';
import { FirebaseFunctionsService } from '../custom-firebase/firebase-functions.service';
import firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showFiller: boolean = false;
  @Input() menuToggle!: boolean;
  _gamesOfUser = new BehaviorSubject<firebase.firestore.QueryDocumentSnapshot[] | null>(null);
  gamesOfUser$ = this._gamesOfUser.asObservable();

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private functionsService: FirebaseFunctionsService,
    private firestoreService: FirebaseFirestoreService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.firebaseAuth.currentUser$.pipe(map((user) => {
      return this.firestoreService.collection('games').where('players', 'array-contains', user?.uid).onSnapshot(snapshot => {
        this._gamesOfUser.next(snapshot.docs);
      })
    }))
  }

  async logout() {
    await this.firebaseAuth.signOut();
    return this.router.navigateByUrl('/login');
  }

  async createNewGame() {
    const request = this.functionsService.functions.httpsCallable('joinToGame');
    const results = await request();
    const { game_id } = results.data;
    this.router.navigateByUrl(`/game/${game_id}`);
  }

}
