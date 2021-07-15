import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var firebase;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  number
  random = [46,53,59,67,64,68,49,54]
  closed=false
  constructor(private router: Router) { }

  ngOnInit(): void {
    var date = new Date()
    var day = date.getDate()
    this.number = this.random[day%8]
    if((this.router.url=='/' ||this.router.url.includes('trieste'))&&!this.closed){
      setTimeout(() => {
        document.getElementById('prof').style.bottom='20px'
      }, 1500);
    }
  
  
   
  }
  goSponsored(){
   
    const analytics = firebase.analytics();
    analytics.logEvent('click_proof',{name:'kosanc'})
    this.router.navigateByUrl('/business')
    }
    close(){
      this.closed=true
      document.getElementById('prof').style.bottom='-600px'
    }
  }
   

