import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unknownpage',
  templateUrl: './unknownpage.component.html',
  styleUrls: ['./unknownpage.component.css']
})
export class UnknownpageComponent implements OnInit {
  isLoggedIn: boolean = false
  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem('auth_token')) {
      this.isLoggedIn = true
    }
  }
}
