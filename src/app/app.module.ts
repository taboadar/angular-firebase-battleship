import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellMeshModule } from './cell-mesh/cell-mesh.module';
import { GameboardComponent } from './gameboard/gameboard.component';

@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CellMeshModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
