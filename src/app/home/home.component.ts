import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showFiller: boolean = false;
  @Input() menuToggle!: boolean;

  constructor(
    private auth: AngularFireAuth,
    private functions: AngularFireFunctions,
    private firestore: AngularFirestore,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login')
  }

  async createNewGame() {
    const callable = this.functions.httpsCallable('joinToGame');
    const data$ = callable({});
    data$.subscribe(console.log)
    // console.log(this.functions)
    // this.functions.httpsCallable('joinToGame')({}).toPromise().catch(console.log)
  }

}
