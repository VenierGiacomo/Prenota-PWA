import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import '@vaadin/vaadin-time-picker';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  // Lun_time="08:00:00"
  // form = new FormGroup({ 
  //   Lun_time: new FormControl(''),
  //   lastName: new FormControl('')
  // });

  constructor() { }
  lun= ['08:00','12:00','','']
  mar= ['08:00','12:00','','']
  mer= ['08:00','12:00','','']
  gio= ['08:00','12:00','','']
  ven= ['08:00','12:00','','']
  sab= ['08:00','12:00','','']
  dom= ['08:00','12:00','','']
  ngOnInit() {
  }
  
  printval(){
    // this.lun[0]= '09:00:00'
    // console.log(this.form.value,this.form.value)
  }
  dateChanged(ev){
    console.log('Date changed', ev.target.__data.value);
  }
}




  

 