import { PlanComponent } from './plan/plan.component';
import { Component, OnInit } from '@angular/core';
import { PlanService } from './services/plan.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lesson-plan-frontend';

  public username = '';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.username = userData.username ?? '';

    this._authService.username.subscribe(
      (newUsername) => (this.username = newUsername)
    );
  }

  ngOnDestroy() {
    this._authService.username.unsubscribe();
  }

  public isUserLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }

  public logOut(): void {
    this._authService.logOut();
  }
}
