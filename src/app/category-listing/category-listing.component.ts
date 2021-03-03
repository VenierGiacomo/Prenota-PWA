import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit {

  constructor(private api: ApiService, private router:Router, private titleService: Title) { 
    this.titleService.setTitle(`I migliori ${this.categories_name[this.business_type]} a Trieste - Prenota Online`);
  }
shops
business_type 
categories_id={'parrucchieri': 2, 'campi': 7, 'medici': 1 }
categories_name={'parrucchieri': 'parrucchieri', 'campi': 'campi da Calcio e Tennis','medici':'medici' }
  ngOnInit(): void {
    var url = this.router.url.split('/')
    this.business_type= url[url.length-1]
    this.api.getStoresCategory(this.categories_id[this.business_type]).subscribe(async data=>{
      this.shops= await data
    },err=>{
      console.log(err)
    })
  }
  navigate(url){
    url = url.substring(19)
    // console.log(url)
  this.router.navigateByUrl(url)
  }
  back(){
    this.router.navigateByUrl('home/ricerca')
  }
}
