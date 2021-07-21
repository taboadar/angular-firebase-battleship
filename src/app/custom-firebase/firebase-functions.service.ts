import { Inject, Injectable } from '@angular/core';
import firebase from 'firebase';
import * as R from 'ramda';

export const USE_EMULATOR = 'USE_FIREBASE_FUNCTIONS_EMULATOR';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFunctionsService {
  functions: firebase.functions.Functions;

  constructor(
    @Inject('FIREBASE_APPLICATION') private firebaseApp: firebase.app.App,
    @Inject(USE_EMULATOR) useEmulator: any[] | null,
  ) { 
    this.functions = this.firebaseApp.functions();
    if(!R.isNil(useEmulator)) {
      const [ host, port ] = useEmulator;
      this.functions.useEmulator(host, port);
    }
  }
}
