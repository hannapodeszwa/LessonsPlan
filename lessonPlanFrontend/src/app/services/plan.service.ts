import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Lesson } from '../interfaces/lesson';
import { Professor } from '../interfaces/professor';
import { Group } from '../interfaces/groups';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  apiURL = 'http://localhost:8000';
  constructor(private http: HttpClient) {}


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch employees list


  public getAllLessons(): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>(this.apiURL + '/lessons');
//    .pipe(retry(1), catchError(this.handleError));
  }

  public getLesson(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(this.apiURL + '/lessons/' + id)
  }

  public getAllProfessors(): Observable<Professor[]> {
    return this.http
      .get<Professor[]>(this.apiURL + '/professors');
//    .pipe(retry(1), catchError(this.handleError));
  }

  public getProfessor(id: number): Observable<Professor> {
    return this.http.get<Professor>(this.apiURL + '/professor/' + id)
  }

  public getAllGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>(this.apiURL + '/groups');
//    .pipe(retry(1), catchError(this.handleError));
  }

  public getLessonsByGroup(id: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiURL + '/groups/' + id + '/lessons')
  }

  public getLessonsByProfessor(id: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiURL + '/professors/' + id + '/lessons')
  }

  // // HttpClient API get() method => Fetch employee
  // getEmployee(id: any): Observable<Employee> {
  //   return this.http
  //     .get<Employee>(this.apiURL + '/employees/' + id)
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API post() method => Create employee
  // createEmployee(employee: any): Observable<Employee> {
  //   return this.http
  //     .post<Employee>(
  //       this.apiURL + '/employees',
  //       JSON.stringify(employee),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API put() method => Update employee
  // updateEmployee(id: any, employee: any): Observable<Employee> {
  //   return this.http
  //     .put<Employee>(
  //       this.apiURL + '/employees/' + id,
  //       JSON.stringify(employee),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // HttpClient API delete() method => Delete employee
  // deleteEmployee(id: any) {
  //   return this.http
  //     .delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  // // Error handling
  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }



}
