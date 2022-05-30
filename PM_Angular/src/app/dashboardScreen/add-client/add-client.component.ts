import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup | any = null;
  submitted = false;
  returnUrl!: string;
  message!: any;
  error = '';

  constructor(private router:Router, private formBuilder:FormBuilder, private dashboardService:DashboardService) {

   }

  ngOnInit() {
    this.addClientForm = this.formBuilder.group({
      clientName: [null, [Validators.required, Validators.minLength(4)]],
      address: [null, [Validators.required, Validators.minLength(2)]],
      phonenumber: ["", [Validators.required]],
    })
    
    this.returnUrl = '/dashboard/addproject';
  }

  get f() {return this.addClientForm.controls;}

  onSubmit() {
    if (this.addClientForm.invalid) {
      this.addClientForm['submitted'] = true;
      return;
    }
    this.dashboardService
      .addClient(
        this.f['clientName'].value,
        this.f['phonenumber'].value,
        this.f['address'].value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
          console.log('submitted', data);
          this.message = data.message;
        },
        (error) => {
          if (error.error.title) {
            this.error = error.error.title;
          } else {
            this.error = error.error;
          }
        }
      );
  }

}
