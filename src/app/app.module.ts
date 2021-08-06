import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports/material-imports.module';

import { USE_EMULATOR as USE_FIREBASE_AUTH_EMULATOR, SETTINGS, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIREBASE_FUNCTIONS_EMULATOR, ORIGIN, REGION } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { CustomFirebaseModule } from './custom-firebase/custom-firebase.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GameboardComponent } from './gameboard/gameboard.component';


export function initializeApp1(afa: AngularFireAuth): any {
  // https://stackoverflow.com/questions/65025005/angularfireauth-emulator-login-is-lost-on-page-reload
  return () => {
    return new Promise(resolve => {
      // fdb.firestore.useEmulator('http://localhost',8080);  
      afa.useEmulator(`http://${location.hostname}:9099/`);
      setTimeout(() => resolve({}), 300 ); // delay Angular initialization by 100ms
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialImportsModule,
    CustomFirebaseModule,
  ],
  providers: [
    {
      provide: USE_FIREBASE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', '9099'] : null,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', '8080'] : undefined
    },
    {
      provide: USE_FIREBASE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', '5001'] : undefined,
    },
    {
      provide: ORIGIN,
      useFactory: () => environment.useEmulators ? 'http://localhost:5001' : undefined
    },
    {
      provide: REGION,
      useValue: 'us-central1'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      // for some reason this dependency is necessary for this solution to work.
      // Maybe in order to trigger the constructor *before* waiting 100ms?
      deps: [AngularFireAuth],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
