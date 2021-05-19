import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import '@vaadin/vaadin-time-picker';
import { ApiService } from '../services/api.service';


declare var Stripe;

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
 
  fast_pay_method =false
  new_card_heigth='0px'
  new_card_display='none'
  card_btn_txt='Paga con carta'
  paymentmethods=[]
  constructor(private api: ApiService) { }
 
  async ngOnInit() {
    var stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');

    var elements = stripe.elements();


  
    // Add an instance of the card Element into the `card-element` <div>.
  
    var paymentRequest = stripe.paymentRequest({
      country: 'IT',
      currency: 'eur',
      total: {
        label: 'Demo total',
        amount: 1099,
      },
      requestPayerName: false,
      requestPayerEmail: false,
    });
    var prButton = elements.create('paymentRequestButton', {
      paymentRequest: paymentRequest,
    });
    
    // Check the availability of the Payment Request API first.
    paymentRequest.canMakePayment().then((result)=> {
      if (result) {
        this.fast_pay_method =true
        prButton.mount('#payment-request-button');
      } else {
        this.fast_pay_method =false
        document.getElementById('payment-request-button').style.display = 'none';
      }
    });
    // Handle real-time validation errors from the card Element.
   
    this.api.paymentMethods().subscribe((res:any)=>{
      console.log(res)
      if(res.data.length>0){
        this.paymentmethods=res.data
        this.card_btn_txt='Aggiungi carta'
      }else{
        this.card_btn_txt='Paga ora'
        if(!this.fast_pay_method){
          this.showNewCard()
        }
      }
     
    },(err:any)=>{
      if(err.status>=400 && err.status<500){
        this.card_btn_txt='Paga ora'
        if(!this.fast_pay_method){
          this.showNewCard()
        }
      }
    })
    
 }
 showNewCard(){
   this.new_card_display='block'
    this.card_btn_txt='Paga con carta'
   setTimeout(() => {
    var stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    var elements = stripe.elements();
    const style = {
      base: {
        // lineHeight: '30px',
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
        ':-webkit-autofill': {
          color: '#32325d',
        },
      },
      invalid: {
        // lineHeight: '30px',
        color: '#fa755a',
        iconColor: '#fa755a',
        ':-webkit-autofill': {
          color: '#fa755a',
        },
      },
    };
  
    var card = elements.create('card', {style: style});
    card.mount('#card-element');
    card.on('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    card.on('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
   },10);
 
 }
 
 scroll(forward,id){
  if(forward){
   document.getElementById(id).scrollLeft += 420;
  }else{
   document.getElementById(id).scrollLeft -= 420;
  }
 
}
 
}




  

 