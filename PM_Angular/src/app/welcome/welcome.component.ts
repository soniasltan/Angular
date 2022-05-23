import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  gif!: string;

  constructor(private apiService: WelcomeService) {
    // this.gif = this.
   }

  ngOnInit() {
    // this.apiService.getGIF().subscribe((data: any) => {
    //   console.log(data)
    //   this.gif = data?.data.images.downsized_medium.url
    // })

    // this.apiService.getProject().subscribe((res: any) => {
    //   console.log(res)
    // })
  }

}