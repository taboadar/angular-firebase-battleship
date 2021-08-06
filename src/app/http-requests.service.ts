import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    @Inject('FIREBASE_FUNCTIONS_HOST') private host: string,
    private http: HttpClient,
    private auth: AngularFireAuth) { 
      this.auth.idToken.subscribe(token => {
        this.headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
      })
    }

  createGame() {
    return this.http.post(this.host + '/createGame', {data: {}}, { headers: this.headers }).toPromise();
  }
}
