import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/login/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
currentUser!: User;
editProfileForm: FormGroup | any = null;
editableDetails!: {};
returnUrl!: string;
loading = false;
submitted = false;
message!: any;
error = '';

  constructor(private authenticationService:AuthenticationService, private formBuilder:FormBuilder) {
    this.authenticationService.currentUser.subscribe(
      (x) => {
        this.currentUser = x;
        this.editableDetails = {"email": x.email, "address": x.address, "phonenumber": x.phonenumber};
        console.log(this.editableDetails);
      }
    );
   }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      phonenumber: ["", [Validators.required]],
      address: ["", [Validators.required, Validators.minLength(2)]]
    });

    this.editProfileForm.setValue(this.editableDetails);
    
  }

  onSubmit(){
    if (this.editProfileForm.invalid) {
      this.editProfileForm["submitted"] = true;
      return;
  }
    console.log(this.editProfileForm.value);
    }

}
