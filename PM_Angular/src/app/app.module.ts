import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './dashboardScreen/employee/employee.component';
import { ProjectDetailsComponent } from './dashboardScreen/projectDetails/projectdetails.component';
import { TeamComponent } from './dashboardScreen/team/team.component';
import { DashboardComponent } from './dashboardScreen/dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './registration/register/register.component';
import { LoginDetailsComponent } from './registration/login-details/login-details.component';
import { FinishRegistrationComponent } from './registration/finish-registration/finish-registration.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './dashboardScreen/addProject/addproject.component';
import { ShowProjectComponent } from './dashboardScreen/show-project/show-project.component';
import { EditProjectComponent } from './dashboardScreen/edit-project/edit-project.component'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ProjectDetailsComponent,
    TeamComponent,
    DashboardComponent,
    WelcomeComponent,
    RegisterComponent,
    LoginDetailsComponent,
    FinishRegistrationComponent,
    LoginComponent,
    AddProjectComponent,
    ShowProjectComponent,
    EditProjectComponent
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
