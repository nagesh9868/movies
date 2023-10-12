import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DebbardComponent } from './debbard/debbard.component';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';
import { AuthGuard } from './guard/auth.guard';
import { UnknownpageComponent } from './unknownpage/unknownpage.component';

const routes: Routes = [
  {
    component: RegisterComponent,
    path: 'user/register',
  },
  {
    component: LoginComponent,
    path: 'user/login',
  },
  {
    component: HomeComponent, canActivate: [AuthGuard],
    path: '',
  },
  {
    component: HomeComponent, canActivate: [AuthGuard],
    path: 'ssc/home',
  },
  {
    component: DebbardComponent, canActivate: [AuthGuard],
    path: 'debbard',
  },
  {
    component: CandidateInfoComponent, canActivate: [AuthGuard],
    path: 'debbard/candidate',
  },
  {
    component: UnknownpageComponent,
    path: '**',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
