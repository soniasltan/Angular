import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {
  public state: any;
  public username: string;
  public password: string;

  userForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  message = '';

  constructor(private router: Router,private activatedRoute:ActivatedRoute, private registrationService:RegistrationService, private formBuilder: FormBuilder ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.username = this.state?.['username'];
    this.password = this.state?.['password'];
    console.log(JSON.stringify(this.state));
     }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.returnUrl = '/register/step-2'
  }

  // toNext(){
  //   this.router.navigateByUrl('/register/step-2', {state: {...this.state, username: this.username, password: this.password}})
  // }

  get f() { return this.userForm.controls; }

  onSubmit(){
    this.submitted = true;

      // stop here if form is invalid
      if (this.userForm.invalid) {
          return;
      }

      this.loading = true;
      // this.registrationService.createUser(this.f['username'].value, this.f['password'].value)
      //     .pipe(first())
      //     .subscribe(
      //       data => {
      //           this.router.navigate([this.returnUrl]);
      //           console.log(data)
      //           this.message = data.message;
      //       },
      //         error => {
      //             this.error = error.error;
      //             this.loading = false;
      //         }
      //     );
  }
}
