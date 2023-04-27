import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];

    password!: string;

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
    }
    
  binary: boolean = false;
}
