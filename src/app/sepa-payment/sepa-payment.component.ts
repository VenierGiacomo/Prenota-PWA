import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var Stripe;
// stripe.StripeStatic;
@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.scss']
})
export class SepaPaymentComponent implements OnInit {
  ibanvisibility= 'none'
  @ViewChild('ibanElement', {static: true}) ibanElement: ElementRef;
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;
  stripe
  card;
  iban
  cardvisibility = 'block'
  paypalvisibility= 'none'
  card_displ=true
  cardErrors;
  sepaErr;
  selectedView='card'
  @Input() amount: number;
  @Input() ref_sub: any;
  // amount = 2500
  description: "nuovo stripe";
  displ_ammount:string
  loading = false;
  confirmation;
  constructor() { }

  ngOnInit() {
    this.displ_ammount= this.amount/100 +'0'
    this.stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const elements = this.stripe.elements({locale: 'it',});
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
    });



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
    this.iban = elements.create('iban', options);
    console.log(this.ibanElement)
    // Add an instance of the IBAN Element into the `iban-element` <div>
    this.iban.mount(this.ibanElement.nativeElement);
    const form = document.getElementById('setup-form');
    const accountholderName = document.getElementById('accountholder-name');
    const email = document.getElementById('email');
    const submitButton = document.getElementById('submit-button');
    const clientSecret = submitButton.dataset.secret;
    this.iban.on('change', (event) => {
      const displayError = document.getElementById('error-message');
      if (event.error) {
        console.log(event.error)
        displayError.textContent = event.error.message;
        this.sepaErr = event.error.message;
      } else {
        console.log('no error')
        displayError.textContent = '';
        this.sepaErr = ''
      }
    });
    this.iban.addEventListener('change', ({ error }) => {


      console.log('no error')
      this.sepaErr = error && error.message;
  });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.stripe.confirmSepaDebitSetup(
        clientSecret,
        {
          payment_method: {
            sepa_debit:  this.iban,
            billing_details: {
              name: accountholderName.innerText,
              email: email.innerText,
            },
          },
        }
      );
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
  async handleIban(e) {
    e.preventDefault();
    const { source, error } = await this.stripe.createSource(this.iban);

    if (error) {
      // Inform the customer that there was an error.
      this.sepaErr = error.message;
    } else {
      // Send the token to your server.
      console.log('pagamento andato a buon fine', source)
      this.loading = true;
      this.loading = false;

    }
  }
  
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
    this.stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const elements = this.stripe.elements({locale: 'it',});
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
    console.log(this.ibanElement)
    // Add an instance of the IBAN Element into the `iban-element` <div>
    iban.mount(this.ibanElement.nativeElement);
    const form = document.getElementById('setup-form');
    const accountholderName = document.getElementById('accountholder-name');
    const email = document.getElementById('email');
    const submitButton = document.getElementById('submit-button');
    const clientSecret = submitButton.dataset.secret;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.stripe.confirmSepaDebitSetup(
        clientSecret,
        {
          payment_method: {
            sepa_debit: iban,
            billing_details: {
              name: accountholderName.innerText,
              email: email.innerText,
            },
          },
        }
      );
    });
  }
}
close(){
  this.ref_sub.selected=false
}
}
