import { Injectable } from '@angular/core';
import { map, tap, switchMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';

export const JWT_NAME = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {  

    console.log(username);
    console.log(password);
    return this.http.post<any>('http://localhost:3000/users/login', {username: username, password: password}).pipe(
      map((token) => {
        console.log(token.access_token)
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  register(user: User) {
    return this.http.post<any>('/api/users', user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  //getUserId(): Observable<number>{
  //  return of(localStorage.getItem(JWT_NAME)).pipe(
  //    switchMap((jwt: string) => of(this.jwtHelper.decodeToken(jwt)).pipe(
  //      map((jwt: any) => jwt.user.id)
  //    )
  //  ));
  //}

}