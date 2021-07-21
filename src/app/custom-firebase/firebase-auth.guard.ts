import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import firebase from 'firebase';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { FirebaseAuthService } from './firebase-auth.service';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthGuard implements CanActivate {

  constructor(
    private auth: FirebaseAuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.auth.loggedInSubject.pipe(
        map( (user) => {
          if(R.isNil(user)) {
            return this.router.parseUrl('/login')
          }
          return true;
        })
      )
  }
}
