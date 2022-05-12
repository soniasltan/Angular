import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboardScreen/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FinishRegistrationComponent } from './registration/finish-registration/finish-registration.component';
import { LoginDetailsComponent } from './registration/login-details/login-details.component';
import { PersonalDetailsComponent } from './registration/personal-details/personal-details.component';
import { RegisterComponent } from './registration/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/step-1',
    component: LoginDetailsComponent
  },
  {
    path: 'register/step-2',
    component: PersonalDetailsComponent
  },
  {
    path: 'register/finish',
    component: FinishRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
