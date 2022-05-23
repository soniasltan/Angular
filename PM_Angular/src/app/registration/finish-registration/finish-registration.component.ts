import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.css']
})
export class FinishRegistrationComponent implements OnInit {

  public state: any;

  constructor(private router:Router,private activatedRoute:ActivatedRoute, private registrationService: RegistrationService) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    console.log(JSON.stringify(this.state));
   }

  ngOnInit(): void {
  }

}
