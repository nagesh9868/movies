import { Component, OnInit } from '@angular/core';
import { DebbardDetailsService } from '../services/debbard-details.service';
import { Router } from '@angular/router';
import { CandidateInfoComponent } from '../candidate-info/candidate-info.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service: DebbardDetailsService, private route: Router, private a: CandidateInfoComponent) { }

  ngOnInit(): void {
  }

  blankField() {
    this.service.debbardCanGet({ registrationno: "65070485c9548777b6f07efc" })
    setTimeout(() => {
      this.a.ngOnInit()
    }, 500);
  }
}
