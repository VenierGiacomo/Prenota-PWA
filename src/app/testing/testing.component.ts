import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  constructor() { }

 
  

  
  mySwiper 

  ngOnInit() {
    this.mySwiper == new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
  
      // If we need pagination
     
  
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  
      });
  
  }
  
}




  

 