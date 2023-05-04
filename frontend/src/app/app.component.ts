import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, JWT_NAME } from './services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auction house';
  value: string = '';
  constructor (private router: Router, private authService: AuthenticationService,  private jwtHelper: JwtHelperService) {
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  navigateTo(value: any) {
    this.router.navigate(['../', value]);
  }

  logout() {
    this.authService.logout();
  }
}
