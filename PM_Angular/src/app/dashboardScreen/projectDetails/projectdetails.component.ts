import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { first } from 'rxjs/operators';
import { Project } from './project'
import { User } from 'src/app/login/user';
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
  projectData: Project[] = [];
  clientList!: Client[];
  filteredClient!: any;

  constructor(private dashboardService:DashboardService, private authenticationService:AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

  }

  ngOnInit() {
    this.dashboardService.loadProjectIds(this.currentUser.id)
    .pipe(first())
    .subscribe(data => {
      data.map((x:ProjectMembers) => this.projectIds.push(x.projectId))
    })

    this.dashboardService.loadProjects()
    .pipe(first())
    .subscribe(
      data => {
        for (let id of this.projectIds) {
          this.projectData.push(data.filter((x:Project) => x.id == id))
        }
        this.projects = this.projectData.flat()
      }
    )

    this.dashboardService.loadClients()
    .pipe(first())
    .subscribe(
      data => {
        this.clientList = data;
      }
    )
    
  }

  getClientName(clientId: number){
    this.filteredClient = this.clientList.filter(client => client.id == clientId);
    return this.filteredClient[0].clientName
  }

}
