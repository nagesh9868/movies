import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.service.home().subscribe((res: any) => {
      if (res.error) {
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('nameEmail')
      }
    })
  }

}
