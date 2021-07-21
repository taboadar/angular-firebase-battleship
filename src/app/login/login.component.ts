import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase';
import * as R from 'ramda';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  @Input() error!: string | null;
  @Output() submitEM = new EventEmitter()

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.auth.currentUser.then((user) => {
      debugger;
    })
    // from(this.auth.currentUser).subscribe(user => {
    //   debugger;
    //   if(user) { this.router.navigateByUrl('/')}
    // })
  }

  async googlePopup() {
    await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    this.router.navigateByUrl('/');
  }
}
