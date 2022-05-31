import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { first } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { Project } from '../projectDetails/project';
import { Client } from '../client';
import { User } from 'src/app/login/user';
import { ProjectMembers } from '../project-members';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {
  currentUser!: User;
  projectId!: any;
  project!: Project;
  clientList!: Client[];
  filteredClient!: any;
  otherUsers: User[] = [];
  teamIds!: ProjectMembers[];
  teamData: User[] = [];
  teamMembers: User[] = [];
  addUserForm: FormGroup | any = null;
  removeUserForm: FormGroup | any = null;
  modalRef!:NgbModalRef;
  returnUrl!: string;

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private dashboardService:DashboardService, private authenticationService:AuthenticationService, private formBuilder:FormBuilder, private modalService:NgbModal) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');

    this.dashboardService.loadMyProjectMembers()
    .pipe(first())
    .subscribe(data => {
      this.teamIds = data.filter((x:ProjectMembers) => x.projectId == this.projectId)
    })

    this.dashboardService.loadUsers()
    .pipe(first())
    .subscribe(
      data => {
        for (let id of this.teamIds) {
          this.teamData.push(data.filter((user:User) => user.id == id.userListId))
        }
        this.teamMembers = this.teamData.flat()
        this.otherUsers = data
        for (let member of this.teamMembers) {
          this.otherUsers = this.otherUsers.filter((data:User) => data.id != member.id)
        }
      }
    )

    this.dashboardService.loadProjectId(this.projectId)
    .pipe(first())
    .subscribe(data => {
      this.project = data[0]
    })

    this.dashboardService.loadClients()
    .pipe(first())
    .subscribe(
      data => {
        this.clientList = data;
      }
    )

    this.addUserForm = this.formBuilder.group({
      newMember: [""]
    })

    this.removeUserForm = this.formBuilder.group({
      removedMember: [""]
    })

    this.returnUrl = '/dashboard/project/'+this.projectId
  }

  getClientName(clientId: number){
    this.filteredClient = this.clientList.filter(client => client.id == clientId);
    return this.filteredClient[0].clientName
  }

  openAdd(addMember: any) {
    this.modalRef = this.modalService.open(addMember, {ariaLabelledBy: 'modal-basic-title'});
  }

  openRemove(removeMember: any) {
    this.modalRef = this.modalService.open(removeMember, {ariaLabelledBy: 'modal-basic-title'});
  }

  openDeleteProject(deleteProject: any) {
    this.modalRef = this.modalService.open(deleteProject, {ariaLabelledBy: 'modal-basic-title'});
  }

  get fAddUser() {return this.addUserForm.controls;}
  get fRemoveUser() {return this.removeUserForm.controls;}

  newMemberChange(e: any){
    this.fAddUser['newMember'].setValue(e.target.value)
  }

  submitNewMember(){
    this.modalRef.close()
    this.dashboardService.createNewProjectMember(this.fAddUser['newMember'].value, this.projectId)
    .pipe(first())
    .subscribe(data => {
      this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
        this.router.navigate([this.returnUrl])
      })
      console.log("submitted", data)
    })
  }

  removeMemberChange(e: any){
    this.fRemoveUser['removedMember'].setValue(e.target.value)
  }

  submitRemoveMember(){
    this.modalRef.close()
    this.dashboardService.deleteProjectMember(this.fRemoveUser['removedMember'].value, this.projectId)
    .pipe(first())
    .subscribe(data => {
      this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
        this.router.navigate([this.returnUrl])
      })
      console.log("submitted", data)
    })
  }

  submitDeleteProject(){
    this.modalRef.close()
    this.dashboardService.deleteProject(this.projectId)
    .pipe(first())
    .subscribe(data => {
      this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
      this.router.navigateByUrl('/dashboard')
    })
      console.log("submitted", data)
    })
  }
}
