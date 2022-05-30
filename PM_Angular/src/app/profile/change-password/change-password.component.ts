import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { User } from 'src/app/login/user';
import { CustomValidationService } from 'src/app/registration/custom-validation.service';
import { ProfileService } from '../profile.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentUser!: User;
  changePasswordForm: FormGroup | any = null;
  submitted = false;
  returnUrl!: string;
  error = '';
  message!: any;

  constructor(private authenticationService:AuthenticationService ,private formBuilder:FormBuilder, private router:Router, private customValidationService:CustomValidationService, private profileService:ProfileService) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
    });
   }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]
    }, {
      validators: [
        this.customValidationService.compareValidator("confirmPassword", "newPassword")
      ]
    });

    this.returnUrl = '/profile';
  }

  get f() {return this.changePasswordForm.controls;}

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm["submitted"] = true;
      return;
    }
    this.profileService.changePassword(this.currentUser.id, this.f['currentPassword'].value ,this.f['newPassword'].value)
    .pipe(first())
    .subscribe(data => {
      this.router.navigate([this.returnUrl]);
      this.message = data.message
    }, error => {
      if (error.error.title) {
        this.error = error.error.title;
      } else {
        this.error = error.error;
      }
    })
  }

}
