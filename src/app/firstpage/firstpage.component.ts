import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent implements OnInit {

  constructor(private router:Router, private titleService: Title) {
    this.titleService.setTitle( " Prenota : Prendi appuntamento online con parrucchieri e medici a Trieste");
   }
   


  ngOnInit(): void {
  }
  navBusiness(){
this.router.navigateByUrl('business')
  }
  navListing(){
    this.router.navigateByUrl('home/ricerca')
  }
  
}
