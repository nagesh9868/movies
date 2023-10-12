import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isloggedIn?: string
  constructor(private route: Router, private http: HttpClient,
    private ngxLoader: NgxUiLoaderService) { }
  ngOnInit(): void {
    if (!sessionStorage.getItem('auth_token')) {
      this.isloggedIn = "register"
      this.route.navigate(['ssc/home'])
    }
    this.ngxLoader.start();
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      this.ngxLoader.stop();
    });
  }
}
