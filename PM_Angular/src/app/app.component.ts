import { JsonpClientBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/authentication.service';
import { User } from './login/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PM_Angular';

  // username: string | null;
  currentUser!: User;

    constructor(private router: Router,
      private authenticationService: AuthenticationService){
      // if (localStorage.getItem("currentUser") != null) {
      //   this.username = JSON.parse(localStorage.getItem("currentUser"));
      // } else {
      //   this.username = ""
      // }
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}
