// import { ThisReceiver } from '@angular/compiler';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
// import { RegistrationService } from '../registration.service';

// @Component({
//   selector: 'app-personal-details',
//   templateUrl: './personal-details.component.html',
//   styleUrls: ['./personal-details.component.css']
// })
// export class PersonalDetailsComponent implements OnInit {
  
//   // public state: any;
//   // public first_name: string;
//   // public last_name: string;
//   // public email: string;
//   // public phonenumber: string;
//   // public address: string;

//   detailsForm!: FormGroup;
//   loading = false;
//   submitted = false;
//   returnUrl!: string;
//   error = '';


//   constructor(private router:Router,private activatedRoute:ActivatedRoute, private registrationService:RegistrationService, private formBuilder:FormBuilder) {
//     // this.state = this.router.getCurrentNavigation()?.extras.state;
//     // this.first_name = this.state?.['first_name'];
//     // this.last_name = this.state?.['last_name'];
//     // this.email = this.state?.['email'];
//     // this.phonenumber = this.state?.['phonenumber'];
//     // this.address = this.state?.['address'];
//     // console.log(JSON.stringify(this.state));
//    }

//   ngOnInit() {
//     this.detailsForm = this.formBuilder.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', Validators.required],
//       phonenumber: ['', Validators.required],
//       address: ['', Validators.required]
//     })

//     this.returnUrl = '/register/finish'
//   }

//   // goBack(){
//   //   this.router.navigateByUrl('/register/step-1', {state: {...this.state, first_name: this.first_name, last_name: this.last_name, email: this.email, phonenumber: this.phonenumber, address: this.address}})
//   // }
//   // toFinish(){
//   //   this.router.navigateByUrl('/register/finish', {state: {...this.state, first_name: this.first_name, last_name: this.last_name, email: this.email, phonenumber: this.phonenumber, address: this.address}})
//   // }

//   get f() { return this.detailsForm.controls; }

//   onSubmit(){
//     this.submitted = true;

//       // stop here if form is invalid
//       if (this.detailsForm.invalid) {
//           return;
//       }

//       this.loading = true;
//       this.registrationService.createUserDetails(this.f['firstName'].value, this.f['lastName'].value, this.f['email'].value, this.f['phonenumber'].value, this.f['address'].value)
//           .pipe(first())
//           .subscribe(
//             data => {
//                 this.router.navigate([this.returnUrl]);
//             },
//               error => {
//                   this.error = error.error;
//                   this.loading = false;
//               }
//           );
//   }

// }
