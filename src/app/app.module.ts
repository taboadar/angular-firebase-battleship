import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellMeshModule } from './cell-mesh/cell-mesh.module';
import { GameboardComponent } from './gameboard/gameboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports/material-imports.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { USE_EMULATOR as  USE_FIREBASE_AUTH_EMULATOR} from '@angular/fire/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIREBASE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { CustomFirebaseModule } from './custom-firebase/custom-firebase.module';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CellMeshModule,
    BrowserAnimationsModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
