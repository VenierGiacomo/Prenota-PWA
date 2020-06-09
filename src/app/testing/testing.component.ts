import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var Stripe;  //stripe.StripeStatic;

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  constructor() { }
  @Input() amount: number;
  description: "nuovo stripe";
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;
  @ViewChild('paymentRequestButtonElement', {static: true}) paymentRequestButtonElement: ElementRef;

  stripe; // : stripe.Stripe;
  card;
  cardErrors;
  bgcolor="#f2b3b3"
  loading = false;
  confirmation;


  ngOnInit() {
    this.stripe = Stripe('pk_test_f3m2iNJqa6UdyuD9Ey8O7ZiH00eSjJ4lEt');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
    });

    const paymentRequest = this.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1099,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const elementbutton = this.stripe.elements();
    const prButton = elementbutton.create('paymentRequestButton', {
    paymentRequest,
});

(async () => {
  // Check the availability of the Payment Request API first.
  const result = await paymentRequest.canMakePayment();
  if (result) {
    console.log(result, 'succ')
    prButton.mount(this.paymentRequestButtonElement.nativeElement);
  } else {
    console.log(result, 'errr')
    this.paymentRequestButtonElement.nativeElement.style.display = 'none';
  }
})();
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
}




  

 