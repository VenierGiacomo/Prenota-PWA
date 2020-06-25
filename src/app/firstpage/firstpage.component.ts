import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navBusiness(){
this.router.navigateByUrl('business')
  }
  navListing(){
    this.router.navigateByUrl('home/ricerca')
  }
  
}
