import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:AuthService, private route:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('auth_token')){
      this.route.navigate(['ssc/home'])
    }
  }

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  
  get name(){
    return this.registerForm.get('name')
  }
  
  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }


  registerFormData(){
    this.service.register(this.registerForm.value)
  }

}
