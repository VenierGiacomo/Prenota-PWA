import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private router:Router, private titleService: Title) {
    this.titleService.setTitle( "Successo, il tuo pagamento è stato processato correttamente");
   }
  ngOnInit(): void {
  }
  navBusiness(){
    this.router.navigateByUrl('i_miei_appuntamenti')
      }
      navListing(){
        this.router.navigateByUrl('home/ricerca')
      }
}
