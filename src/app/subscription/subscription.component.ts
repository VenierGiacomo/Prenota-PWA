import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
selected = false
amount = 0
@Input() price_SMALL
@Input() price_MEDIUM
  constructor() { }

  ngOnInit() {
      console.log(this.price_SMALL, this.price_MEDIUM)
  }
selectesubscription(sub){
  if(sub == 1){
    this.amount=1000
  }else if(sub == 2){
    this.amount=2500
  }else{
    this.amount=2000
  }
  console.log(this.amount)
  window.scrollTo({top: document.body.scrollHeight , behavior: 'smooth',});
  setTimeout(() => {
    this.selected =true
  }, 400);
  }
}
