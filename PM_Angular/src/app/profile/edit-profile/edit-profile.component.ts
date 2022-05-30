import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/login/user';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  currentUser!: User;
  userDetails!: User;
  editProfileForm: FormGroup | any = null;
  editableDetails!: {};
  returnUrl!: string;
  loading = false;
  submitted = false;
  message!: any;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
  }

  ngOnInit() {
    this.profileService.loadProfile(this.currentUser.id)
    .pipe(first())
    .subscribe(data => {
      this.userDetails = data
      this.editableDetails = { address: data.address, phonenumber: data.phonenumber };
      this.editProfileForm.setValue(this.editableDetails);
    })

    this.editProfileForm = this.formBuilder.group({
      phonenumber: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.returnUrl = '/profile';
  }

  get f() {
    return this.editProfileForm.controls;
  }

  onSubmit() {
    if (this.editProfileForm.invalid) {
      this.editProfileForm['submitted'] = true;
      return;
    }
    console.log(this.editProfileForm.value);
    this.profileService
      .editProfile(
        this.currentUser.id,
        this.f['phonenumber'].value,
        this.f['address'].value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
          this.message = data.message;
        },
        (error) => {
          if (error.error.title) {
            this.error = error.error.title;
          } else {
            this.error = error.error;
          }
          this.loading = false;
        }
      );
  }
}
