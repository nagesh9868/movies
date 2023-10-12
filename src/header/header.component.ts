import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string = ''
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.nameEmail()
  }

  nameEmail() {
    let nameEmail = sessionStorage.getItem('nameEmail')
    if (nameEmail) {
      let nameEmailParsed = JSON.parse(nameEmail)
      this.name = nameEmailParsed.name
    }
  }

  logout() {
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('nameEmail')
    this.route.navigate(['user/login'])
  }
}
