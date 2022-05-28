import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './dashboardScreen/addProject/addproject.component';
import { DashboardComponent } from './dashboardScreen/dashboard/dashboard.component';
import { EditProjectComponent } from './dashboardScreen/edit-project/edit-project.component';
import { ProjectDetailsComponent } from './dashboardScreen/projectDetails/projectdetails.component';
import { ShowProjectComponent } from './dashboardScreen/show-project/show-project.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ManageRolesComponent } from './profile/manage-roles/manage-roles.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileComponent } from './profile/profile.component';
import { FinishRegistrationComponent } from './registration/finish-registration/finish-registration.component';
import { LoginDetailsComponent } from './registration/login-details/login-details.component';
// import { PersonalDetailsComponent } from './registration/personal-details/personal-details.component';
import { RegisterComponent } from './registration/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path:'', component: ProjectDetailsComponent},
      {path:'addproject', component: AddProjectComponent},
      {path:'project/:id', component: ShowProjectComponent},
      {path:'updateproject/:id', component: EditProjectComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path:'', component: ProfileDetailsComponent},
      {path:'edit', component: EditProfileComponent},
      {path:'roles', component: ManageRolesComponent}
    ]
  },
  // {
  //   path: 'register/step-2',
  //   component: PersonalDetailsComponent
  // },
  // {
  //   path: 'register/finish',
  //   component: FinishRegistrationComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
