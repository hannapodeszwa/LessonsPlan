import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  public isInvalid = false;
  public errorText = '';

  logInForm;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.logInForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.+[a-zA-Z].+'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  logInUser(user: UserCredentials): void {
    this._authService.logIn(user.username, user.password).subscribe({
      next: (data) => {
        this.isInvalid = false;
        this.errorText = '';
        this._authService.setLoggedInUser(data);
        setTimeout(() => {
          this._router.navigate(['plan']);
        }, 100);
      },
      error: (error) => {
        this.isInvalid = true;
        this.errorText =
          error.error.username ??
          error.error.password ??
          error.error.non_field_errors ??
          'Unknown error occured';
      },
    });
  }

  onSubmit(formData: FormGroup): void {
    if (this.logInForm.invalid) {
    } else {
      this.logInUser({
        username: formData.value.username!,
        password: formData.value.password!,
      });
    }
  }
}
