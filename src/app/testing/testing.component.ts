import { Component, OnInit} from '@angular/core';
import '@vaadin/vaadin-time-picker';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  limit=10
  services_list=[]
  show_scroll=false
  new_customer_modal_top='-200px'
  constructor(private api: ApiService) { }
 
  ngOnInit() {
    setTimeout(()=>{
      this.new_customer_modal_top='20px'

    },3000)
    for(let i=0; i< this.limit; i++){

      this.services_list.push({name:'service ' +i, duration:'1 ora'})
    }
    if(this.services_list.length>=7){
      this.show_scroll=true
    }
    
 }
 
 scroll(forward,id){
  if(forward){
   document.getElementById(id).scrollLeft += 420;
  }else{
   document.getElementById(id).scrollLeft -= 420;
  }
 
}
 
}




  

 