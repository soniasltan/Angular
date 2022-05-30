import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { DashboardService } from '../dashboard.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../client';
import { User } from 'src/app/login/user';
import { Project } from '../projectDetails/project';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  currentUser!: User;
  projectId!: any;
  project!: Project;
  editProjectForm: FormGroup | any = null;
  statuses = ["Created", "In Progress", "Complete"];
  clientList!: Client[];
  returnUrl!: string;
  loading = false;
  submitted = false;
  message!: any;
  error = '';

  constructor(private router:Router,private activatedRoute:ActivatedRoute ,private formBuilder:FormBuilder, private dashboardService:DashboardService, private authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    
    this.editProjectForm = this.formBuilder.group({
      projectName: ["", [Validators.required, Validators.minLength(2)]],
      projectDescription: ["", [Validators.required, Validators.minLength(2)]],
      clientId: ["", [Validators.required]],
      status: ["", [Validators.required]],
      projectCost: ["", [Validators.required]]
    })

    this.dashboardService.loadProjectId(this.projectId)
      .pipe(first())
      .subscribe(data => {
        this.project = data[0];
        delete this.project.id;
        delete this.project.projectManagerId;
        delete this.project.createdDate;
        this.editProjectForm.patchValue(this.project);
      })

      this.dashboardService.loadClients()
        .pipe(first())
        .subscribe(
          data => {
            this.clientList = data;
          }
        )
      
        this.returnUrl = '/dashboard/project/'+this.projectId
}

get f() {return this.editProjectForm.controls;}

clientChange(e: any){
  this.f['clientId'].setValue(e.target.value)
}

onSubmit(){
  this.editProjectForm['submitted'] = true;
  if (this.editProjectForm.invalid) {
    return
  }
  this.dashboardService.editProject(parseInt(this.projectId), this.f['projectName'].value, this.f['projectDescription'].value, this.f['clientId'].value, this.currentUser.id, this.f['status'].value, this.f['projectCost'].value)
  .pipe(first())
        .subscribe(
          data => {
            this.message = data.message;
            this.router.navigate([this.returnUrl]);
          },
            error => {
                this.error = error.error;
                this.loading = false;
            }
        );

}

}
