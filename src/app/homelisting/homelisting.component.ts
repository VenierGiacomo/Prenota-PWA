import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homelisting',
  templateUrl: './homelisting.component.html',
  styleUrls: ['./homelisting.component.scss']
})
export class HomelistingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goBusiness(){
    this.router.navigateByUrl('/business')
  }
  goHome(){
    this.router.navigateByUrl('')
  }
}
