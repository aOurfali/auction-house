import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];

    loginForm: FormGroup = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(64)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)]),
    });

    constructor(private authService:      AuthenticationService,
                private primengConfig:    PrimeNGConfig,
                private formBuilder:      FormBuilder,
                private router:           Router) {}

    ngOnInit() {
    }

    onSubmit(form: FormGroup) {
      if(this.loginForm.invalid){
        return;
      }
      this.authService.login(form.value.username, form.value.password).pipe(
        map(token => {if(token.access_token != null ) {{this.router.navigate(['/home']);}}})).subscribe();
  }
    
  binary: boolean = false;
}
