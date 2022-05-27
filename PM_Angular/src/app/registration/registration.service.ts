import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  defaultUserRole: number = 4;
  newUserId!: number;
  constructor(private http: HttpClient) {
   }

  createUser(username: string, password: string, userRolesId: number, firstName: string, lastName: string, email: string, phonenumber: string, address: string) {
    return this.http.post<any>(`${environment.apiUrl}/UserLists`, {username, password, userRolesId, firstName, lastName, email, phonenumber, address})
    .pipe(map(res => {
      console.log(res);
      console.log(res.message);
      this.newUserId = res?.data?.[0]?.id;
      return res;
    }))
  }

  getPMs() {
    return this.http.get<any>(`${environment.apiUrl}/UserLists`)
  }

  getTeams() {
    return this.http.get<any>(`${environment.apiUrl}/Team`)
  }

  checkUsername(username: string) {
    return this.http.get<any>(`${environment.apiUrl}/User/CheckUser?username=${username}`)
  }
}
