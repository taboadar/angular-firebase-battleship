import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'


const redirectoLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  // { path: 'login',    component: LoginComponent,    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectoLoggedInToHome } },
  // { path: '',     component: HomeComponent,     canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
