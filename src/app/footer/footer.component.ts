import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  number
  random = [5,8,9,7,11,6,10,12]
  constructor(private router: Router) { }

  ngOnInit(): void {
    // var date = new Date()
    // var day = date.getDate()
    // this.number = this.random[day%8]
    // console.log(this.router.url)
    // if(this.router.url=='/home/ricerca/medici'||this.router.url=='/')
    // setTimeout(() => {
    //   document.getElementById('prof').style.bottom='20px'
    // }, 2500);
  
   
  }
  goSponsored(){
    this.router.navigateByUrl('/appuntamento/TK_Business')
  }
   
}
