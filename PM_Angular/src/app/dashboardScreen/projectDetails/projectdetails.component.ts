import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Project } from './project'
import { Task } from './task';
import { User } from 'src/app/login/user';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap'
import { Client } from '../client';
import { ProjectMembers } from '../project-members';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  projects!: Project[];
  tasks!: any;
  error = '';
  currentUser!: User;
  projectIds: number[] = [];
  currentProject!: any;
  otherUsers: User[] = [];
  otherUserData: User[] = [];
  otherUserIds: ProjectMembers[] = [];
  teamIds!: ProjectMembers[];
  teamData: User[] = [];
  memberData: ProjectMembers[] = [];
  projectData: Project[] = [];
  teamMembers: User[] = [];
  clientList!: Client[];
  filteredClient!: any;
  // deleteProjectModal!: NgbActiveModal;

  addUserForm: FormGroup | any = null;
  removeUserForm: FormGroup | any = null;
  // deleteProjectForm: FormGroup | any = null;

  constructor(private dashboardService:DashboardService, private authenticationService:AuthenticationService, private modalService:NgbModal, private formBuilder:FormBuilder) { 
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

  }

  ngOnInit() {
    this.dashboardService.loadProjectIds(this.currentUser.id)
    .pipe(first())
    .subscribe(data => {
      data.map((x:ProjectMembers) => this.projectIds.push(x.projectId))
      console.log("my project ids: ", this.projectIds)
    })

    this.dashboardService.loadMyProjectMembers()
    .pipe(first())
    .subscribe(data => {
      this.otherUserIds = data
      for (let id of this.projectIds) {
        this.memberData.push(data.filter((x:ProjectMembers) => x.projectId == id))
        this.otherUserIds = this.otherUserIds.filter((x:ProjectMembers) => x.projectId != id)
      }
      console.log("other user ids: ", this.otherUserIds)
      console.log("member data: ", this.memberData)
      this.teamIds = this.memberData.flat()
      console.log("proj details comp teamIds: ", this.teamIds)
    })

    // this.dashboardService.loadUsers()
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     this.teamMembers = data.filter((x:TeamMembers) => x.teamId == this.currentUser.teamId)
    //     this.otherUsers = data.filter((x:TeamMembers) => x.teamId != this.currentUser.teamId)
    // })

    this.dashboardService.loadUsers()
    .pipe(first())
    .subscribe(
      data => {
        for (let id of this.teamIds) {
          this.teamData.push(data.filter((user:User) => user.id == id.userListId))
        }
        this.teamMembers = this.teamData.flat()
        console.log("pushed members: ", this.teamMembers)
        this.otherUsers = data
        for (let member of this.teamMembers) {
          this.otherUsers = this.otherUsers.filter((data:User) => data.id != member.id)
        }
        // this.otherUsers = this.otherUserData.flat()
        console.log("other users: ", this.otherUsers)
      }
    )

    this.dashboardService.loadProjects()
    .pipe(first())
    .subscribe(
      data => {
        for (let id of this.projectIds) {
          this.projectData.push(data.filter((x:Project) => x.id == id))
        }
        this.projects = this.projectData.flat()
        console.log("my project list: ", this.projects)
      }
    )

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

    // this.deleteProjectForm = this.formBuilder.group({
    //   deletedProject: [""]
    // })
    
  }

  getClientName(clientId: number){
    this.filteredClient = this.clientList.filter(client => client.id == clientId);
    return this.filteredClient[0].clientName
  }

  openAdd(addMember: any) {
    this.modalService.open(addMember, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result)
    });
  }

  openRemove(removeMember: any) {
    this.modalService.open(removeMember, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result)
    });
  }

  // openDeleteProject(deleteProject: any) {
  //   this.deleteProjectModal = this.modalService.open(deleteProject, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     console.log(result)
  //   });
  // }

  get fAddUser() {return this.addUserForm.controls;}
  get fRemoveUser() {return this.removeUserForm.controls;}
  // get fDeleteProject() {return this.deleteProjectForm.controls;}
 
  
  newMemberChange(e: any){
    this.fAddUser['newMember'].setValue(e.target.value)
    console.log("changed user val: ", this.fAddUser['newMember'].value)
  }

  submitNewMember(){
    this.dashboardService
  }

  removeMemberChange(e: any){
    this.fRemoveUser['removeMember'].setValue(e.target.value)
    console.log("changed user val: ", this.fRemoveUser['removeMember'].value)
  }

  // deleteProjectChange(e: any){
  //   this.fDeleteProject['deletedProject'].setValue(e.target.value)
  //   console.log("changed project val: ", this.fDeleteProject['deletedProject'].value)
  // }

  // submitProjectDelete(){
  //   // this.dashboardService.deleteProject(this.fDeleteProject['deletedProject'])
  //   // .pipe()
  //   this.deleteproject.close()
  // }

}
