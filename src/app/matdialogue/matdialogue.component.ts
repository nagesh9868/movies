import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DebbardDetailsService } from '../services/debbard-details.service';


@Component({
  selector: 'app-matdialogue',
  templateUrl: './matdialogue.component.html',
  styleUrls: ['./matdialogue.component.css']
})
export class MatdialogueComponent implements OnInit {
  constructor(private service:AuthService, private debbservice:DebbardDetailsService) { }
  loginError:string = this.service.loginError
  candideteDetailsError:string = this.debbservice.candidateDetailsError
  fileUploadMsg:string = this.debbservice.fileUploadMsg
  updateMsg:string = this.debbservice.updateMsg
  ngOnInit(): void {
  }

  msgBlank(){
    this.service.loginError = ''
    this.debbservice.candidateDetailsError = ''
    this.debbservice.fileUploadMsg = ''
    this.debbservice.updateMsg = ''
  }

}
