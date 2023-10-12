import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError = this.service.loginError
  constructor(private service: AuthService, private route: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('auth_token')) {
      this.route.navigate(['ssc/home'])
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
    password: new FormControl('', [Validators.minLength(3), Validators.required])
  });

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  loginFormData() {
    this.service.login(this.loginForm.value)
  }
}
