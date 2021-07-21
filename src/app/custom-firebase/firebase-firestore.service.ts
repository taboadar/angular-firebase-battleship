import { Inject, Injectable } from '@angular/core';
import firebase from 'firebase';
import * as R from 'ramda';


export const USE_EMULATOR = 'USE_FIRESTORE_EMULATOR';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService {
  db: firebase.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_APPLICATION') private firebaseApp: firebase.app.App,
    @Inject(USE_EMULATOR) useEmulator: any[] | null,
  ) { 
    this.db = this.firebaseApp.firestore();
    if(!R.isNil(useEmulator)) {
      const [host, port, options] =useEmulator;
      this.db.useEmulator(host, port, options);
    }
  }

  collection(str: string) {
    return this.db.collection(str);
  }

  doc(str: string) {
    return this.db.doc(str);
  } 
}
