import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
declare var $: any;
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
  last_selected = 'hero'
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
navigateToSection(el: string){
  if(el =='hero' || el =='contact'){
    document.getElementById(el).scrollIntoView({behavior:"smooth"})
  }
  else if((this.last_selected =='hero' && el =='services')
  || (this.last_selected =='services' && el =='about')  
  ||(this.last_selected =='about' && el =='services') 
  || (this.last_selected =='about' && el =='counts') 
  || (this.last_selected =='contacts' && el =='counts')  ){
    document.getElementById(el).scrollIntoView({behavior:"smooth"})
    setTimeout(() => {
      window.scrollBy({top:-50, 
        behavior: 'smooth',}) 
    }, 400); 
  }
  else if((this.last_selected =='hero' && el =='counts')
  || (this.last_selected =='contacts' && el =='services') 
  || (this.last_selected =='counts' && el =='services')   ){
    document.getElementById(el).scrollIntoView({behavior:"smooth"})
    setTimeout(() => {
      window.scrollBy({top:-50, 
        behavior: 'smooth',}) 
    }, 800); 
  
  }
  else {
    document.getElementById(el).scrollIntoView({behavior:"smooth"})
    setTimeout(() => {
      window.scrollBy({top:-50, 
        behavior: 'smooth',}) 
    }, 600); 
  
  }
  this.last_selected = el
} 
  
}

