import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DebbardDetailsService } from '../services/debbard-details.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-debbard',
  templateUrl: './debbard.component.html',
  styleUrls: ['./debbard.component.css']
})
export class DebbardComponent implements OnInit {

  constructor(private http: HttpClient, private service: DebbardDetailsService, private route: Router, private authservice: AuthService) { }


  ngOnInit(): void {
    this.authservice.home().subscribe((res: any) => {
      if (res.error) {
        console.log(res);
        sessionStorage.removeItem('auth_token')
      }
    })
  }

  debbardCanInfo = new FormGroup({
    registrationno: new FormControl('', [Validators.required, Validators.minLength(24)])
  })

  get registrationno() {
    return this.debbardCanInfo.get('registrationno')
  }

  registrationForm() {
    this.service.debbardCanGet(this.debbardCanInfo.value)
  }
  file: any;

  getFile(event: any) {
    this.file = event.target.files[0];
    console.log("file", this.file);
  }


  submitData(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const formData = new FormData();
      formData.append('file', file);

      this.http.post(`${baseUrl}file/uploads`, formData).subscribe((res) => {
      })
    }
  }
}
