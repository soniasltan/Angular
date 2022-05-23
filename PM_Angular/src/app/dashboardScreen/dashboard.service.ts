import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from "./projectDetails/task";
import { Project } from './projectDetails/project';
import { ProjectMembers } from './project-members';
import { Client } from './client';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  filtered!: Task;
  myProjectIds: number[] = [];
  myProjects: Project[] = [];
  projectData: Project[] = [];
  teamMembers: ProjectMembers[] = [];
  memberData: ProjectMembers[] = [];
  clients!: Client[];


  constructor(private http:HttpClient) {
   }

  loadProjectIds(userListId: number){
    return this.http.get<any>(`${environment.apiUrl}/User/ProjectTeam/?UserId=${userListId}`)
    .pipe(map(res => {
      console.log("current user project teams: ", res.data)
      // res.data.map((data:ProjectMembers) => {
      //   this.myProjectIds.push(data.projectId)
      // })
      // console.log("my project ids: ", this.myProjectIds)
      return res.data
    }))
  }

  loadProjects(){
    return this.http.get<any>(`${environment.apiUrl}/Projects`)
    .pipe(map(res => {
      console.log("all projects: ", res.data)
      // for (let id of this.myProjectIds) {
      //   this.projectData = res.data.filter((x:Project) => x.id == id)
      // }
      // this.myProjects = this.projectData.flat()
      // console.log("service my projects: ", this.myProjects)
      return res.data;
    }))
  }

  loadTasks(){
    return this.http.get<any>(`${environment.apiUrl}/Task`)
    .pipe(map(res => {
      console.log("tasks: ",res.data)
      return res.data
    }))
  }

  loadMyProjectMembers(){
    return this.http.get<any>(`${environment.apiUrl}/ProjectMembers`)
    .pipe(map(res => {
      console.log("all project members: ",res.data)
      // for (let id of this.myProjectIds) {
      //   this.memberData.push(res.data.filter((x:ProjectMembers) => x.projectId == id))
      // }
      // this.teamMembers = this.memberData.flat()
      // console.log("my team members: ", this.teamMembers)
      return res.data
    }))
  }

  loadClients(){
    return this.http.get<any>(`${environment.apiUrl}/Client`)
    .pipe(map(res => {
      console.log("clients: ",res.data)
      return res.data
    }))
  }

  loadUsers(){
    return this.http.get<any>(`${environment.apiUrl}/UserLists`)
    .pipe(map(res => {
      console.log("users: ",res.data)
      return res.data
    }))
  }

  createNewProject(projectName: string, projectDescription: string, clientId: string, projectManagerId: number, status: string, projectCost: number){
    return this.http.post<any>(`${environment.apiUrl}/Projects`, {projectName, projectDescription, clientId, projectManagerId, status, projectCost})
    .pipe(map(res => {
      console.log(res);
      console.log(res.message);
      return res;
    }))
  }

  createNewProjectMember(userListId: number, projectId: number){
    return this.http.post<any>(`${environment.apiUrl}/ProjectMembers`, {userListId, projectId})
    .pipe(map(res => {
      console.log(res)
      return res;
    }))
  }

  deleteProject(projectId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/Projects/${projectId}`)
    .pipe(map(res => {
      console.log(res)
      return res;
    }))
  }

  loadProjectId(projectId: number) {
    return this.http.get<any>(`${environment.apiUrl}/Projects/${projectId}`)
    .pipe(map(res => {
      console.log("proj id" + projectId + "data: ", res.data)
      return res.data
    }))
  }

  editProject(id: number, projectName: string, projectDescription: string, clientId: string, projectManagerId: number, status: string, projectCost: number) {
    return this.http.put<any>(`${environment.apiUrl}/Projects/${id}`, {id, projectName, projectDescription, clientId, projectManagerId, status, projectCost})
    .pipe(map(res => {
      return res
    }))
  }

    
}
