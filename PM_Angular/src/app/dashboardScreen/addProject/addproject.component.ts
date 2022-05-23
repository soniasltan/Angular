import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { DashboardService } from '../dashboard.service';
import { User } from 'src/app/login/user';
import { Client } from '../client';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddProjectComponent implements OnInit {
  currentUser!: User;
  addProjectForm: FormGroup | any = null;
  statuses = ["Created", "In Progress", "Complete"];
  clientList!: Client[];
  loading = false;
  submitted = false;
  returnUrl!: string;
  message!: any;
  error = '';
  newProjectId!: number;

  constructor(private router:Router, private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private dashboardService:DashboardService) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
   }

  ngOnInit() {
    this.addProjectForm = this.formBuilder.group({
      projectName: [null, [Validators.required, Validators.minLength(2)]],
      projectDescription: [null, [Validators.required, Validators.minLength(2)]],
      clientId: ["", [Validators.required]],
      status: ["", [Validators.required]],
      projectCost: [null, [Validators.required]]
    })

    this.dashboardService.loadClients()
    .pipe(first())
    .subscribe(
      data => {
        this.clientList = data;
      }
    )
 
    this.returnUrl = '/dashboard';
  }


  get f() {return this.addProjectForm.controls;}

  clientChange(e: any){
    this.f['clientId'].setValue(e.target.value)
    console.log("changed clientId val: ", this.f['clientId'].value)
  }

  onSubmit(){
    this.addProjectForm['submitted'] = true;
    if (this.addProjectForm.invalid) {
      return
    }
    this.dashboardService.createNewProject(this.f['projectName'].value, this.f['projectDescription'].value, this.f['clientId'].value, this.currentUser.id, this.f['status'].value, this.f['projectCost'].value)
    .pipe(first())
          .subscribe(
            data => {
              console.log("submitted", data)
              this.message = data.message;
              this.newProjectId = data.projectId;
              console.log("new Project ID: ",this.newProjectId)
              this.dashboardService.createNewProjectMember(this.currentUser.id, this.newProjectId)
              .pipe(first())
              .subscribe(data => {
                console.log("new project member: ", data)
              })
              this.router.navigate([this.returnUrl]);
            },
              error => {
                  this.error = error.error;
                  console.log("error", this.error)
                  this.loading = false;
              }
          );

  }

}
