import { Component, OnInit} from '@angular/core';
import '@vaadin/vaadin-time-picker';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  store_clients
  look_up_word
  show_client
  constructor(private api: ApiService) { }
 
  ngOnInit() {
    this.api.getStoreClients().subscribe((data)=>{
      this.store_clients =data  
      for(let el of this.store_clients ){
        el.client_name = el.client_name.toLowerCase()
      }
      this.show_client =this.store_clients

    })

  }
 type(){  
  var x = this.look_up_word.toLowerCase()
  this.show_client = this.store_clients.filter((val)=>{
    if(val.client_name.search(x)==0){
      return val
    }    
  }) 
  // const terms = ev.term.split(/\s/)

  // // Test all sub term
  // const result = terms.reduce(function(previousValue, currentValue) {
  //   if (test.search(currentValue) > -1) previousValue.push(currentValue)
  //   return previousValue
  // }, [])
 }
}




  

 