import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './dashboardScreen/employee/employee.component';
import { ProjectDetailsComponent } from './dashboardScreen/projectDetails/projectdetails.component';
import { DashboardComponent } from './dashboardScreen/dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './registration/register/register.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './dashboardScreen/addProject/addproject.component';
import { ShowProjectComponent } from './dashboardScreen/show-project/show-project.component';
import { EditProjectComponent } from './dashboardScreen/edit-project/edit-project.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ManageRolesComponent } from './profile/manage-roles/manage-roles.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { AddClientComponent } from './dashboardScreen/add-client/add-client.component'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ProjectDetailsComponent,
    DashboardComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
    AddProjectComponent,
    ShowProjectComponent,
    EditProjectComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    EditProfileComponent,
    ManageRolesComponent,
    ChangePasswordComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
