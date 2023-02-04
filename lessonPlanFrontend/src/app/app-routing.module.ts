import { ActivateAccountPageComponent } from './activate-account-page/activate-account-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginPageComponent },
  { path: 'register', component: UserRegisterPageComponent },
  { path: 'plan', component: PlanPageComponent },
  {
    path: 'activate-account/:id/:token',
    component: ActivateAccountPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
