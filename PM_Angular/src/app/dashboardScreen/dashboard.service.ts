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
      return res.data
    }))
  }

  loadProjects(){
    return this.http.get<any>(`${environment.apiUrl}/Projects`)
    .pipe(map(res => {
      return res.data;
    }))
  }

  loadTasks(){
    return this.http.get<any>(`${environment.apiUrl}/Task`)
    .pipe(map(res => {
      return res.data
    }))
  }

  loadMyProjectMembers(){
    return this.http.get<any>(`${environment.apiUrl}/ProjectMembers`)
    .pipe(map(res => {
      return res.data
    }))
  }

  loadClients(){
    return this.http.get<any>(`${environment.apiUrl}/Client`)
    .pipe(map(res => {
      return res.data
    }))
  }

  loadUsers(){
    return this.http.get<any>(`${environment.apiUrl}/UserLists`)
    .pipe(map(res => {
      return res.data
    }))
  }

  createNewProject(projectName: string, projectDescription: string, clientId: string, projectManagerId: number, status: string, projectCost: number){
    return this.http.post<any>(`${environment.apiUrl}/Projects`, {projectName, projectDescription, clientId, projectManagerId, status, projectCost})
    .pipe(map(res => {
      return res;
    }))
  }

  createNewProjectMember(userListId: number, projectId: number){
    return this.http.post<any>(`${environment.apiUrl}/ProjectMembers`, {userListId, projectId})
    .pipe(map(res => {
      return res;
    }))
  }

  deleteProjectMember(userListId: number, projectId: number){
    return this.http.delete<any>(`${environment.apiUrl}/ProjectMembers?UserListId=${userListId}&ProjectId=${projectId}`,)
    .pipe(map(res => {
      return res;
    }))
  }

  deleteProject(projectId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/Projects/${projectId}`)
    .pipe(map(res => {
      return res;
    }))
  }

  loadProjectId(projectId: number) {
    return this.http.get<any>(`${environment.apiUrl}/Projects/${projectId}`)
    .pipe(map(res => {
      return res.data
    }))
  }

  editProject(id: number, projectName: string, projectDescription: string, clientId: string, projectManagerId: number, status: string, projectCost: number) {
    return this.http.put<any>(`${environment.apiUrl}/Projects/${id}`, {id, projectName, projectDescription, clientId, projectManagerId, status, projectCost})
    .pipe(map(res => {
      return res
    }))
  }

  addClient(clientName: string, address: string, phonenumber: string) {
    return this.http.post<any>(`${environment.apiUrl}/Client`, {clientName, address, phonenumber})
    .pipe(map(res => {
      return res
    }))
  }

    
}
