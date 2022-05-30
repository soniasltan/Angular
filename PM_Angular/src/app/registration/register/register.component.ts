import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegistrationService } from '../registration.service';
import { CustomValidationService } from '../custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUserForm: FormGroup | any = null;
  defaultRole = 4;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  message!: any;
  newUserValues!: any;
  usernameMsg!: any;
  usernameStatus!: any;
  
  constructor(private router:Router,private activatedRoute:ActivatedRoute, private registrationService:RegistrationService, private formBuilder:FormBuilder, private customValidationService:CustomValidationService) {

   }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]], 
      confirmPassword: [null, [Validators.required]], 
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      phonenumber: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.minLength(2)]]
    }, {
      validators: [
        this.customValidationService.compareValidator("confirmPassword", "password")
      ]
    });

    this.returnUrl = '/login';
    }

  get f() {return this.newUserForm.controls;}

  onSubmit(){
    if (this.f['username'].value && !this.f['password'].value){
      return
    } else if (this.newUserForm.invalid) {
      this.newUserForm["submitted"] = true;
      return;
  }
    this.newUserValues = this.newUserForm.value
    delete this.newUserValues["confirmPassword"];
    this.newUserForm["submitted"] = true;
    this.registrationService.createUser(this.f['username'].value, this.f['password'].value, this.defaultRole, this.f['firstName'].value, this.f['lastName'].value, this.f['email'].value, this.f['phonenumber'].value, this.f['address'].value)
          .pipe(first())
          .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                this.message = data.message;
            },
              error => {
                if (error.error.title) {
                  this.error = error.error.title;
                } else {
                  this.error = error.error
                }
                  this.loading = false;
              }
          );
    }

  checkUsername() {
    if(this.f['username'].invalid) {
      return
    } else {
      this.registrationService.checkUsername(this.f['username'].value)
      .subscribe(
        res => {
          if (res.status == 'unavailable') {
            this.usernameMsg = res.message
            this.usernameStatus = res.status
            this.newUserForm.reset()
          } else {
            this.usernameMsg = res.message
            this.usernameStatus = res.status
          }
        }
      )
    }
  }

}
