import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-setup',
  templateUrl: './store-setup.component.html',
  styleUrls: ['./store-setup.component.scss']
})
export class StoreSetupComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }
  store_name=''
  address=''
  city=''
  zip_code=''
  payment='IBAN'

  ngOnInit() {
  }

submit(){
  this.api.createStore(this.store_name, this.address, this.city, this.zip_code, this.payment).subscribe(
    data=>{
      console.log(data,'data')
      this.router.navigateByUrl('store/setup')
    },
    err => {
      console.log(err.error,'err')
    }
  )

}
}
