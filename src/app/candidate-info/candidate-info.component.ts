import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DebbardDetailsService } from '../services/debbard-details.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class CandidateInfoComponent implements OnInit {
  yearArray: number[] = []
  examyear1 = this.service.examyear
  debbardCandidateObj?: any
  imageFile?: string
  nonImage: string = 'assets/passport.jpg'
  blank?: string
  window: any = window
  constructor(private service: DebbardDetailsService, private route: Router, private authservice: AuthService, private http: HttpClient) { }


  debbardCandidate: any = new FormGroup({
    name: new FormControl(''),
    father: new FormControl(''),
    mother: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    category: new FormControl(''),
    educationboard: new FormControl(''),
    rollnumber: new FormControl(''),
    examname: new FormControl(''),
    examyear: new FormControl(''),
    examrollno: new FormControl(''),
    debbardfrom: new FormControl(''),
    debbardupto: new FormControl(''),
    imagefile: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit(): void {
    this.authservice.home().subscribe((res: any) => {
      if (res.error) {
        sessionStorage.removeItem('auth_token')
      }
    })
    this.debbardCandidateObj = this.service.debbardCandidateObjSub.value
    this.imageFile = `assets/${this.debbardCandidateObj?.filename}`
    this.debbardCandidate = new FormGroup({
      name: new FormControl(`${this.debbardCandidateObj?.name ? this.toTitleCase(this.debbardCandidateObj?.name) : ''}`, [Validators.required, Validators.minLength(3)]),
      father: new FormControl(`${this.debbardCandidateObj?.father ? this.toTitleCase(this.debbardCandidateObj?.father) : ''}`, [Validators.required, Validators.minLength(3)]),
      mother: new FormControl(`${this.debbardCandidateObj?.mother ? this.toTitleCase(this.debbardCandidateObj?.mother) : ''}`, [Validators.required, Validators.minLength(3)]),
      dob: new FormControl(`${this.debbardCandidateObj?.dob ? this.debbardCandidateObj?.dob : ''}`, [Validators.required, Validators.minLength(3)]),
      gender: new FormControl(`${this.debbardCandidateObj?.gender ? this.debbardCandidateObj?.gender : ''}`, [Validators.required, Validators.minLength(3)]),
      category: new FormControl(`${this.debbardCandidateObj?.category ? this.debbardCandidateObj?.category : ''}`, [Validators.required]),
      educationboard: new FormControl(`${this.debbardCandidateObj?.educationboard ? this.debbardCandidateObj?.educationboard.toUpperCase() : ''}`, [Validators.required, Validators.minLength(3)]),
      rollnumber: new FormControl(`${this.debbardCandidateObj?.rollnumber ? this.debbardCandidateObj?.rollnumber : ''}`, [Validators.required, Validators.minLength(3)]),
      examname: new FormControl(`${this.debbardCandidateObj?.examname ? this.debbardCandidateObj?.examname.toUpperCase() : ''}`),
      examyear: new FormControl(`${this.debbardCandidateObj?.examyear ? this.debbardCandidateObj?.examyear : 'Select'}`, [Validators.required, Validators.minLength(3)]),
      examrollno: new FormControl(`${this.debbardCandidateObj?.examrollno ? this.debbardCandidateObj?.examrollno : ''}`, [Validators.required, Validators.minLength(3)]),
      debbardfrom: new FormControl(`${this.debbardCandidateObj?.debbardfrom ? this.debbardCandidateObj?.debbardfrom : ''}`, [Validators.required, Validators.minLength(3)]),
      debbardupto: new FormControl(`${this.debbardCandidateObj?.debbardupto ? this.debbardCandidateObj?.debbardupto : ''}`, [Validators.required, Validators.minLength(3)]),
      imagefile: new FormControl(`${this.debbardCandidateObj?.filename ? this.debbardCandidateObj?.filename : ''}`, [Validators.required, Validators.minLength(3)]),
    })

  }

  toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  get name() {
    return this.debbardCandidate.get('name')
  }

  get father() {
    return this.debbardCandidate.get('father')
  }

  get mother() {
    return this.debbardCandidate.get('mother')
  }

  get dob() {
    return this.debbardCandidate.get('dob')
  }

  get gender() {
    return this.debbardCandidate.get('gender')
  }

  get category() {
    return this.debbardCandidate.get('category')
  }

  get educationboard() {
    return this.debbardCandidate.get('educationboard')
  }

  get rollnumber() {
    return this.debbardCandidate.get('rollnumber')
  }

  get examname() {
    return this.debbardCandidate.get('examname')
  }

  get examyear() {
    return this.debbardCandidate.get('examyear')
  }

  get examrollno() {
    return this.debbardCandidate.get('examrollno')
  }

  get debbardfrom() {
    return this.debbardCandidate.get('debbardfrom')
  }

  get debbardupto() {
    return this.debbardCandidate.get('debbardupto')
  }

  get imagefile() {
    return this.debbardCandidate.get('imagefile')
  }

  candidateSave() {
    let candidateDetails = JSON.stringify(this.debbardCandidate.value)
    let candidateData = candidateDetails.toLowerCase()
    let candidateValues = JSON.parse(candidateData)
    this.service.debbardCanSave(candidateValues)
  }

  yearIncreaser() {
    for (let i = 1901; i < 2024; i++) {
      this.yearArray.push(i)
    }
  }

  fileUpload(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0]
      let formData = new FormData();
      formData.append('file', file)
      this.service.fileUpload(formData)
    }
  }

  updateDetails() {
    let candidateDetails = JSON.stringify(this.debbardCandidate.value)
    let candidateData = candidateDetails.toLowerCase()
    let candidateValues = JSON.parse(candidateData)
    this.service.updateDetails(candidateValues)
  }
}
