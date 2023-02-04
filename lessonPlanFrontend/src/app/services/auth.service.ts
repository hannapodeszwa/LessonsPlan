import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoggedInUser } from '../interfaces/logged-in-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public username = new Subject<string>();

  public logIn(username: string, password: string): Observable<LoggedInUser> {
    return this.http.post('http://127.0.0.1:8000/api-user-login/', {
      username,
      password,
    }) as Observable<LoggedInUser>;
  }

  public register(
    username: string,
    password: string,
    secret?: string
  ): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/register/', {
      username,
      password,
      secret,
    }) as Observable<any>;
  }

  public activateAccount(id: string, token: string): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:8000/activate/${id}/${token}`
    ) as Observable<any>;
  }

  public getUserName(): string {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.username ?? '';
  }

  public getSecret(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/secret/') as Observable<any>;
  }

  public setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
      this.username.next(this.getUserName());
    }
  }

  public logOut(): void {
    localStorage.removeItem('userData');
    this.username.next('');
  }
}
