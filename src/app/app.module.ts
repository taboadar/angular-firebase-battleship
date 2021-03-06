import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports/material-imports.module';

import { USE_EMULATOR as USE_FIREBASE_AUTH_EMULATOR, SETTINGS, AngularFireAuth } from '@angular/fire/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIREBASE_FUNCTIONS_EMULATOR, ORIGIN, REGION} from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { CustomFirebaseModule } from './custom-firebase/custom-firebase.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { CellMeshComponent } from './cell-mesh/cell-mesh.component';
import { ShotMeshComponent } from './shot-mesh/shot-mesh.component';
import { SelectShipMeshComponent } from './select-ship-mesh/select-ship-mesh.component';
import { ShipMeshComponent } from './ship-mesh/ship-mesh.component';
import { CellSpanComponent } from './cell-span/cell-span.component';


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

console.log({useEmulators: environment.useEmulators})


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameboardComponent,
    CellMeshComponent,
    ShotMeshComponent,
    SelectShipMeshComponent,
    ShipMeshComponent,
    CellSpanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialImportsModule,
    CustomFirebaseModule,
  ],
  providers: [
    {
      provide: 'FIREBASE_FUNCTIONS_HOST',
      useValue: environment.functionsHost,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
