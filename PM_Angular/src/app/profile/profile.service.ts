import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) {
   }

   loadProfile(id: number){
     return this.http.get<any>(`${environment.apiUrl}/UserLists/${id}`)
     .pipe(map(res => {
       return res.data[0]
     }))
   }

   editProfile(id: number, phonenumber: string, address: string){
     return this.http.put<any>(`${environment.apiUrl}/UserLists/EditDetails`, {id, phonenumber, address})
     .pipe(map(res => {
       return res;
     }))
   }

   changePassword(id: number, currentPassword: string, newPassword: string) {
     return this.http.put<any>(`${environment.apiUrl}/UserLists/EditPassword`, {id, currentPassword, newPassword})
     .pipe(map(res => {
       return res;
     }))
   }

   editRole(id: number, userRolesId: number) {
     return this.http.put<any>(`${environment.apiUrl}/UserLists/EditRole`, {id, userRolesId})
     .pipe(map(res => {
       return res;
     }))
   }
}
