import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { first } from 'rxjs/operators';
import { Project } from '../projectDetails/project';
import { Client } from '../client';
import { User } from 'src/app/login/user';

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

  constructor(private route:Router, private activatedRoute:ActivatedRoute, private dashboardService:DashboardService, private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.projectId)

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
  }

  getClientName(clientId: number){
    this.filteredClient = this.clientList.filter(client => client.id == clientId);
    return this.filteredClient[0].clientName
  }

}
