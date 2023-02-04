import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanComponent } from './plan/plan.component';
import { LessonComponent } from './lesson/lesson.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ActivateAccountPageComponent } from './activate-account-page/activate-account-page.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PlanComponent,
    LessonComponent,
    UserLoginComponent,
    PlanPageComponent,
    UserLoginPageComponent,
    UserRegisterComponent,
    UserRegisterPageComponent,
    HomePageComponent,
    ActivateAccountPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
