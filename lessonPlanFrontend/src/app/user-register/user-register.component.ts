import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  public isInvalid = false;
  public errorText = '';

  public activationLink = '';

  registerForm;

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.registerForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.+[a-zA-Z].+'),
        ],
      ],
      secret: [''],
    });
  }

  ngOnInit(): void {}

  registerUser(user: any): void {
    this._authService
      .register(user.username, user.password, user.secret)
      .subscribe({
        next: (data) => {
          this.errorText = '';
          this.isInvalid = false;
          this.activationLink = `/activate-account/${data.user.id}/${data.token}`;
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
    if (this.registerForm.invalid) {
    } else {
      this.registerUser({
        username: formData.value.username!,
        password: formData.value.password!,
        secret: formData.value.secret,
      });
    }
  }
}
