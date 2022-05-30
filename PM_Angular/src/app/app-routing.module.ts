import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './dashboardScreen/add-client/add-client.component';
import { AddProjectComponent } from './dashboardScreen/addProject/addproject.component';
import { DashboardComponent } from './dashboardScreen/dashboard/dashboard.component';
import { EditProjectComponent } from './dashboardScreen/edit-project/edit-project.component';
import { ProjectDetailsComponent } from './dashboardScreen/projectDetails/projectdetails.component';
import { ShowProjectComponent } from './dashboardScreen/show-project/show-project.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ManageRolesComponent } from './profile/manage-roles/manage-roles.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { ProfileComponent } from './profile/profile.component';
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
      {path: '', redirectTo:'allprojects', pathMatch: 'full'},
      {path:'allprojects', component: ProjectDetailsComponent},
      {path:'addproject', component: AddProjectComponent},
      {path:'addclient', component: AddClientComponent},
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
      {path:'changepassword', component: ChangePasswordComponent},
      {path:'roles', component: ManageRolesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
