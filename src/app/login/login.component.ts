import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  async doLogin() {
    await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    this.ngZone.run(() => this.router.navigateByUrl(''))
  }

}
