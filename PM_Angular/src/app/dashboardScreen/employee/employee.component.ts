import { Component, OnInit, IterableDiffers, DoCheck } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { DashboardService } from '../dashboard.service';
import { User } from 'src/app/login/user';
import { first } from 'rxjs/operators';
import { Project } from '../projectDetails/project';
import { ProjectMembers } from '../project-members';
import { Client } from '../client';
import { Task } from '../projectDetails/task';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  currentUser!: User;
  role!: string;
  projectData: Project[] = [];
  myProjects: Project[] = [];
  myProjectIds: number[] = [];
  projectCount!: number;
  projectCosts: number = 0;
  teamCount: number = 0;
  teamMembers: ProjectMembers[] = []
  memberData: ProjectMembers[] = []
  clients: string[] = [];
  clientIds: number[] = [];
  tasks!: Task[];
  taskCount!: number;
  differ:any;

  constructor(
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    if (this.currentUser.userRolesId == 3) {
      this.role = 'Project Manager';
    } else if (this.currentUser.userRolesId == 4) {
      this.role = 'Employee';
    }
  }

  ngOnInit() {

    this.dashboardService.loadProjectIds(this.currentUser.id)
    .pipe(first())
    .subscribe((data => {
      data.map((x:ProjectMembers) => this.myProjectIds.push(x.projectId))
      console.log("employee project ids: ", this.myProjectIds)
    }))

    this.dashboardService
      .loadProjects()
      .pipe(first())
      .subscribe((data) => {
        for (let id of this.myProjectIds) {
          this.projectData.push(data.filter((x:Project) => x.id == id))
        }
        this.myProjects = this.projectData.flat()
        console.log('my projects: ', this.myProjects);
        this.projectCount = this.myProjects.length;
        for (let item of this.myProjects) {
          this.projectCosts = this.projectCosts + item.projectCost;
        }
        console.log('total costs', this.projectCosts);
        this.clientIds = [
          ...new Set(this.myProjects.map((project) => project.clientId)),
        ];
        console.log('client ids', this.clientIds);
      });

    this.dashboardService
      .loadMyProjectMembers()
      .pipe(first())
      .subscribe((data) => {
        for (let id of this.myProjectIds){
          this.memberData.push(data.filter((x:ProjectMembers) => x.projectId == id))
          this.teamMembers = this.memberData.flat()
        }
        this.teamCount = this.teamMembers.map(member => member.userListId).length
        console.log('total team members', this.teamCount);
      });

    this.dashboardService
      .loadClients()
      .pipe(first())
      .subscribe((data) => {
        console.log("client data: ", data)
        for (let id of this.clientIds) {
          this.clients.push(
            data.filter((client: Client) => client.id == id)[0].clientName
          );
        }
      console.log("client names: ", this.clients)
      });

      this.dashboardService
      .loadTasks()
      .pipe(first())
      .subscribe((data) => {
        this.tasks = data.filter((x:Task) => x.assignedToId == this.currentUser.id)
        this.taskCount = this.tasks.length
      console.log("tasks: ", this.tasks)
      });
  }

}
