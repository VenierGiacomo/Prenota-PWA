import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {loadStripe} from '@stripe/stripe-js';
declare var Stripe;
// stripe.StripeStatic;
@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.scss']
})
export class SepaPaymentComponent implements OnInit {

  @ViewChild('ibanElement', {static: true}) ibanElement: ElementRef;
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;
  stripe
  striperedirect
  card;
  iban
  accountholder_name
  email
  ibanvisibility= 'block'
  cardvisibility = 'none'
  paypalvisibility= 'none'
  selectedView='card'
  card_displ=true
  cardErrors;
  CLIENT_SECRET='pi_1HREVlBgAcDl7NCb7aChPOCj_secret_rq06J33Hy0PoAPLNC5JABE33t'
  sepaErr;
 
  @Input() amount: number;
  @Input() ref_sub: any;
  // amount = 2500
  description: "nuovo stripe";
  displ_ammount:string
  loading = false;
  confirmation;
  constructor() { }

  async ngOnInit() {
    this.displ_ammount= this.amount/100 +'0'
    this.striperedirect = await loadStripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const elements = stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    const style = {
      base: {
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
        color: '#fa755a',
        iconColor: '#fa755a',
        ':-webkit-autofill': {
          color: '#fa755a',
        },
      },
    };

//     var card = elements.create('card', {style: style});

// // Add an instance of the card Element into the `card-element` <div>.
// card.mount('#card-element');

// // Handle real-time validation errors from the card Element.
// card.on('change', function(event) {
//   var displayError = document.getElementById('card-errors');
//   if (event.error) {
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = '';
//   }
// });

// // Handle form submission.
// var form1 = document.getElementById('payment-form-card');
// form1.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error.
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server.
//       // stripeTokenHandler(result.token);
//     }
//   });
// });
const options = {
  style,
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend passing it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'IT',
};

// Create an instance of the IBAN Element
    const iban = elements.create('iban', options);

// Add an instance of the IBAN Element into the `iban-element` <div>
    iban.mount('#iban-element');
    iban.on('change', (event) => {
      const displayError = document.getElementById('error-message');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    const form = document.getElementById('payment-form');
    const accountholderName = document.getElementById('accountholder-name').nodeValue;
    const email = document.getElementById('email');
    const submitButton = document.getElementById('submit-button');
    const clientSecret = submitButton.dataset.secret;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(clientSecret,this.accountholder_name,this.email,accountholderName)
      stripe.confirmSepaDebitPayment(
        clientSecret,
        {
          payment_method: {
            sepa_debit: iban,
            billing_details: {
              name: this.accountholder_name,
              email: this.email,
            },
          },
        }
      ).then(function(result) {
        // Handle result.error or result.paymentIntent
        console.log(result,result.paymentIntent,result.error)
      });;
});
  
    // this.displ_ammount = this.displ_ammount.toString()+0
  }
  async handleForm(e) {
    e.preventDefault();
    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.
      this.cardErrors = error.message;
    } else {
      // Send the token to your server.
      console.log('pagamento andato a buon fine', source)
      this.loading = true;
      this.loading = false;

    }
  }
  // async handleIban(e) {
  //   e.preventDefault();
  //   const { source, error } = await this.stripe.createSource(this.iban);

  //   if (error) {
      // Inform the customer that there was an error.
    //   this.sepaErr = error.message;
    // } else {
      // Send the token to your server.
  //     console.log('pagamento andato a buon fine', source)
  //     this.loading = true;
  //     this.loading = false;

  //   }
  // }
  
swichView(view){
  if(view == 1){
    this.cardvisibility = 'block'
    this.paypalvisibility = 'none'
    this.ibanvisibility = 'none'
    this.card_displ = true
  }
  else if(view == 2){
    this.cardvisibility = 'none'
    this.paypalvisibility = 'block'
    this.ibanvisibility = 'none'
  }
  else if(view == 3){
    this.cardvisibility = 'none'
    this.paypalvisibility = 'none'
    this.ibanvisibility = 'block'
    const stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const elements = stripe.elements();
    // Custom styling can be passed to options when creating an Element.
    const style = {
      base: {
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
        color: '#fa755a',
        iconColor: '#fa755a',
        ':-webkit-autofill': {
          color: '#fa755a',
        },
      },
    };

const options = {
  style,
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend passing it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'IT',
};

// Create an instance of the IBAN Element
    const iban = elements.create('iban', options);

// Add an instance of the IBAN Element into the `iban-element` <div>
    iban.mount('#iban-element');
    iban.on('change', (event) => {
      const displayError = document.getElementById('error-message');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    const form = document.getElementById('payment-form');
    const accountholderName = document.getElementById('accountholder-name').nodeValue;
    const email = document.getElementById('email');
    const submitButton = document.getElementById('submit-button');
    const clientSecret = submitButton.dataset.secret;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(clientSecret,this.accountholder_name,this.email,accountholderName)
      stripe.confirmSepaDebitPayment(
        clientSecret,
        {
          payment_method: {
            sepa_debit: iban,
            billing_details: {
              name: this.accountholder_name,
              email: this.email,
            },
          },
        }
      ).then(function(result) {
        // Handle result.error or result.paymentIntent
        console.log(result,result.paymentIntent,result.error)
      });;
});
  }
}
close(){
  this.ref_sub.selected=false
}
async scroll(){
  
  var el = document.getElementById("contract")
  el.scrollTo({top: document.body.scrollHeight , behavior: 'smooth',});

}
async stripeOutbound(){
  const {error} = await this.striperedirect.redirectToCheckout({
    lineItems: [{
      price: 'price_HJ483KkKFlocQk', // Replace with the ID of your price
      quantity: 1,
    }],
    mode: 'subscription',
    successUrl: 'https://prenota.cc/payment_success',
    cancelUrl: 'https://prenota.cc/business',
  })
}
}
