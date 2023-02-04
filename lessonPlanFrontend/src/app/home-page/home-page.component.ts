import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  public secretMessage = '';

  ngOnInit(): void {
    this._authService
      .getSecret()
      .subscribe((response) => (this.secretMessage = response.secret));
  }
}
