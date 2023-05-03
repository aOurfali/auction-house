import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

class CustomValidators {

  static passwordsMatch (control: AbstractControl): ValidationErrors | null {
    
      return {passwordsNotMatching: true};
    
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl( null, [Validators.required]),
    username: new FormControl(null, [
      Validators.required,
      Validators.maxLength(64)
    ]),
    email: new FormControl (null, [
      Validators.required,
      Validators.email,
      Validators.minLength(6)
    ]),
    password: new FormControl (null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    confirmPassword: new FormControl (null, [Validators.required])
  },{
     validators: CustomValidators.passwordsMatch
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.register(this.registerForm.value.name,
      this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe()
  }
}
