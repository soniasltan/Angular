import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  
  public state: any;
  public first_name: string;
  public last_name: string;
  public email: string;
  public phonenumber: string;
  public address: string;


  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.first_name = this.state?.['first_name'];
    this.last_name = this.state?.['last_name'];
    this.email = this.state?.['email'];
    this.phonenumber = this.state?.['phonenumber'];
    this.address = this.state?.['address'];
    console.log(JSON.stringify(this.state));
   }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigateByUrl('/register/step-1', {state: {...this.state, first_name: this.first_name, last_name: this.last_name, email: this.email, phonenumber: this.phonenumber, address: this.address}})
  }
  toFinish(){
    this.router.navigateByUrl('/register/finish', {state: {...this.state, first_name: this.first_name, last_name: this.last_name, email: this.email, phonenumber: this.phonenumber, address: this.address}})
  }

}
