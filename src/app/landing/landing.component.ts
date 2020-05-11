import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  name=''
  email=''
  subject=''
  message=''
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }
goResiter(){
  this.router.navigateByUrl('/register')
}
send(){
  var email = {
    'name': this.name,
    'email': this.email,
    'subject': this.subject,
    'message': this.message,

  }
  this.api.sendEmail(email).subscribe(
    data=>{
      console.log(data,'emali sent successfully')
      this.name=''
      this.email=''
      this.subject=''
      this.message=''
    },
    err => {
      console.log(err.error,'err')
    }
  )
}
  
}

