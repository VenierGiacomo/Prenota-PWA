import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-homelisting',
  templateUrl: './homelisting.component.html',
  styleUrls: ['./homelisting.component.scss']
})
export class HomelistingComponent implements OnInit {

  constructor(private router: Router, private titleService: Title, private plt: Platform) {
          // window.location.reload();
      this.titleService.setTitle( "Prenota: Scopri parrucchieri e medici a Trieste e prendi appuntamento");
   }

  ngOnInit(): void {
        // window.location.reload();
  }
  goBusiness(){
    this.router.navigateByUrl('/register')
  }
  goParrucchieri(){
    this.router.navigateByUrl('/aparrucchieri')
  }
  goDottori(){
    this.router.navigateByUrl('/booking')
  }
  goMassaggi(){
    this.router.navigateByUrl('/cmassaggi')
  }
  goHome(){
    this.router.navigateByUrl('')
  }
}
