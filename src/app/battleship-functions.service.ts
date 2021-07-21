import { Injectable } from '@angular/core';
import { FirebaseFunctionsService } from './custom-firebase/firebase-functions.service';

@Injectable({
  providedIn: 'root'
})
export class BattleshipFunctionsService {

  constructor(
    private firebaseFunctionsService: FirebaseFunctionsService 
  ) { }

  // joinToGame() {
  //   return this.firebaseFunctionsService.functions.httpsCallable('helloWorld')
  // }
}
