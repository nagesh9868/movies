import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
import { MatdialogueComponent } from '../matdialogue/matdialogue.component'
import { MatDialog } from '@angular/material/dialog'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | undefined 
  isLoggedIn = new BehaviorSubject<boolean>(false)
  loginError: string = ''
  constructor(private http: HttpClient, private route: Router, private matdialogue: MatDialog) { }

  login(loginData: any) {
    return this.http.post(`${baseUrl}user/login`, loginData).subscribe((result: any) => {
      if (result.token) {
        sessionStorage.setItem("auth_token", result.token);
        sessionStorage.setItem('nameEmail', JSON.stringify({ name: result.name, email: result.email }))
        this.route.navigate(['/ssc/home']);
      } else {
        this.loginError = result.message
        this.matdialogue.open(MatdialogueComponent, { width: '450px' })
      }
    })
  }

  register(registerData: any) {
    return this.http.post(`${baseUrl}user/register`, registerData).subscribe((result: any) => {
      if (result.name && result.email) {
        this.route.navigate(['user/login'])
      }else {
        this.loginError = result.message
        this.matdialogue.open(MatdialogueComponent, { width: '450px' })
      }
    })
  }

  home() {
    let headers = new HttpHeaders()
      .set("Authorization", `bearer ${sessionStorage.getItem('auth_token')}`)
    return this.http.post(`${baseUrl}home`, {}, { headers })
  }
}
