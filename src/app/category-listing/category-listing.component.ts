import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit {

  constructor(private api: ApiService, private router:Router) { }
shops
  ngOnInit(): void {
    this.api.getStoresCategory(2).subscribe(async data=>{
      this.shops= await data
      console.log( this.shops)
    },err=>{
      console.log(err)
    })
  }
  navigate(url){
    url = url.substring(19)
    // console.log(url)
  this.router.navigateByUrl(url)
  }

}
