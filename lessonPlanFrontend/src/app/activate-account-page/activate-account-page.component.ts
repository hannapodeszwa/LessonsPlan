import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-activate-account-page',
  templateUrl: './activate-account-page.component.html',
  styleUrls: ['./activate-account-page.component.scss'],
})
export class ActivateAccountPageComponent implements OnInit {
  private _subscription: any;

  public text = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._subscription = this._route.params.subscribe((params) => {
      const id = params['id'];
      const token = params['token'];

      this._authService.activateAccount(id, token).subscribe({
        next: (data) => {
          this.text = 'Konto zostało aktywowane pomyślnie';
          setTimeout(() => {
            this._router.navigate(['login']);
          }, 2000);
        },
        error: (error) => {
          this.text = 'Błąd w aktywacji konta';
          setTimeout(() => {
            this._router.navigate(['register']);
          }, 2000);
        },
      });
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
