import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'battleship';
  menuToggle: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
  }

  doLogout() {
    this.auth.signOut().then(() => this.ngZone.run(() => this.router.navigate(['login'])))
  }

}
