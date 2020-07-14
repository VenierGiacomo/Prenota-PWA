import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homelisting',
  templateUrl: './homelisting.component.html',
  styleUrls: ['./homelisting.component.scss']
})
export class HomelistingComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Scopri parruchieri e medici a Trieste e prendi appuntamento");
   }

  ngOnInit(): void {
  }
  goBusiness(){
    this.router.navigateByUrl('/business')
  }
  goHome(){
    this.router.navigateByUrl('')
  }
}
