import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
selected = false
amount = 0
ref_sub = this
@Input() price_SMALL
@Input() price_MEDIUM
  constructor() { }

  ngOnInit() {
      console.log(this.price_SMALL, this.price_MEDIUM)
  }
selectesubscription(sub){
  if(sub == 1){
    if(this.price_SMALL==19){
      this.amount=1990
      setTimeout(() => {
        this.selected =true
      }, 100);
    }else{
      this.amount=2990
    setTimeout(() => {
      this.selected =true
    }, 100);
    }
    
  }else if(sub == 2){
    if(this.price_SMALL==19){
      this.amount=3990
      setTimeout(() => {
        this.selected =true
      }, 100);
    }else{
      this.amount=4990
    setTimeout(() => {
      this.selected =true
    }, 100);
    }
  }else{
    window.scrollTo({top: document.body.scrollHeight , behavior: 'smooth',});
  } 
  }
}
