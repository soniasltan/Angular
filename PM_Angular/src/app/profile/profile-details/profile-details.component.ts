import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { User } from 'src/app/login/user';
import { ProfileService } from '../profile.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
currentUser!: User;
userDetails!: User;

  constructor(private authenticationService:AuthenticationService, private profileService:ProfileService) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  
  ngOnInit() {
    this.profileService.loadProfile(this.currentUser.id)
    .pipe(first())
    .subscribe(data => {
      delete data.password
      this.userDetails = data
      console.log("user:", data)
    })
  }

}
