import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var Stripe;  //stripe.StripeStatic;
@Component({
  selector: 'app-sepa-payment',
  templateUrl: './sepa-payment.component.html',
  styleUrls: ['./sepa-payment.component.scss']
})
export class SepaPaymentComponent implements OnInit {

  @ViewChild('ibanElement', {static: true}) ibanElement: ElementRef;
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;
  stripe; // : stripe.Stripe;
  card;
  cardvisibility = 'block'
  paypalvisibility= 'none'
  ibanvisibility= 'none'
  cardErrors;
  selectedView='card'
  @Input() amount: number;
  // amount = 2500
  description: "nuovo stripe";

  loading = false;
  confirmation;
  constructor() { }

  ngOnInit() {
    this.stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const elements = this.stripe.elements({locale: 'it',});
    this.card = elements.create('card');
    console.log(this.cardElement)
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
swichView(view){
  if(view == 1){
    this.cardvisibility = 'block'
    this.paypalvisibility = 'none'
    this.ibanvisibility = 'none'
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
  }
}
}
