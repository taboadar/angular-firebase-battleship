import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellMeshModule } from './cell-mesh/cell-mesh.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports/material-imports.module';

import { USE_EMULATOR as  USE_FIREBASE_AUTH_EMULATOR, SETTINGS} from '@angular/fire/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIREBASE_FUNCTIONS_EMULATOR, ORIGIN, REGION} from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { CustomFirebaseModule } from './custom-firebase/custom-firebase.module';
import { LoginComponent } from './login/login.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { HomeComponent } from './home/home.component';
import { GameboardComponent } from './gameboard/gameboard.component'
import { FormsModule } from '@angular/forms';
import { GameCardComponent } from './game-card/game-card.component';
import { ShipSelectorComponent } from './ship-selector/ship-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameRoomComponent,
    HomeComponent,
    GameboardComponent,
    GameCardComponent,
    ShipSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CellMeshModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialImportsModule,
    CustomFirebaseModule,
  ],
  providers: [
    {
      provide: USE_FIREBASE_AUTH_EMULATOR,
      useValue: environment.useEmulators ? ['localhost','9099'] : null,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost','8080'] : undefined
    },
    {
      provide: USE_FIREBASE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost','5001'] : undefined,
    },
    {
      provide: ORIGIN,
      useFactory: () => environment.useEmulators ? 'http://localhost:5001' : undefined
    },
    {
      provide: REGION,
      useValue: 'us-central1'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
