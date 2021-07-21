import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../custom-firebase/firebase-auth.service';
import * as R from 'ramda';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  @Input() error!: string | null;
  @Output() submitEM = new EventEmitter()

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {
    this.firebaseAuth.currentUser$.subscribe((user) => {
      if(!R.isNil(user)) {
        this.router.navigateByUrl('home');
      }
    })
  }

  async googlePopup() {
    await this.firebaseAuth.signInWithGoogle()
    return this.router.navigateByUrl('home');
  }
}
