import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { GameRoomComponent } from './game-room/game-room.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';


const redirectoLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  { path: 'login',    component: LoginComponent,    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectoLoggedInToHome } },
  { path: 'game/:id', component: GameRoomComponent, canActivate: [AngularFireAuthGuard]},
  { path: '',     component: HomeComponent,     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
