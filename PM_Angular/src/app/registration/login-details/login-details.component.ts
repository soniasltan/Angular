import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {
  public state: any;
  public username: string;
  public password: string;

  constructor(private router: Router,private activatedRoute:ActivatedRoute ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    this.username = this.state?.['username'];
    this.password = this.state?.['password'];
    console.log(JSON.stringify(this.state));
     }

  ngOnInit(): void {
  }

  toNext(){
    this.router.navigateByUrl('/register/step-2', {state: {...this.state, username: this.username, password: this.password}})
  }
}
