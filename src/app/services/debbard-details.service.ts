import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { baseUrl, debbard } from 'src/environments/environment';
import { MatdialogueComponent } from '../matdialogue/matdialogue.component'
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DebbardDetailsService {
  updateMsg: string = ''
  candidateDetailsError: string = ''
  debbardCandidateObjSub = new BehaviorSubject<any>(undefined)
  examyear?: string
  registerationNo?: string
  fileUploadMsg: string = ''
  constructor(private http: HttpClient, private route: Router, private Matdialogue: MatDialog) { }

  debbardCanSave(data: any) {
    return this.http.post(`${baseUrl}debbard/candidate`, data).subscribe((res: any) => {
      this.updateMsg = res.message
      this.Matdialogue.open(MatdialogueComponent, { width: '450px' })
    })
  }
  debbardCanGet(data: any) {
    this.http.post(`${baseUrl}debbard`, data).subscribe((res: any) => {
      if (res.length > 0) {
        this.debbardCandidateObjSub.next(res[0])

        this.registerationNo = res[0]._id
        this.examyear = res[0].examyear
        this.route.navigate(['/debbard/candidate'])
      } else {
        this.candidateDetailsError = res.message
        this.Matdialogue.open(MatdialogueComponent, { width: '450px' })
      }
    })
  }

  fileUpload(data: any) {

    this.http.post(`${baseUrl}file/uploads`, data).subscribe((result: any) => {
      this.fileUploadMsg = result.message
      this.Matdialogue.open(MatdialogueComponent, { width: '450px' })
    })
  }

  updateDetails(data: any) {
    this.http.put(`${baseUrl}debbard/candidate/${this.registerationNo}`, data).subscribe((result: any) => {
      this.updateMsg = result.message
      this.Matdialogue.open(MatdialogueComponent, { width: '450px' })
    })
  }
}