import { Component, OnInit } from '@angular/core';
import { Appointment } from '../services/appointment.model';
import { ApiService } from '../services/api.service';
import { yearsPerPage } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }
  resp:any
  display = 'week'
  col: number
  closed: number
  placeholderName="Inserisci nome cliente"
  appointmentlist=[]
  week = []
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month = this.months_names[new Date().getMonth()]
  nome=""
  info=""
  time = 2
  bgModalDisp='none'
  title_text = "Nuovo appuntamento"
  btn_text = "Aggiungi"
  currentBlock= {
    row: 0,
    col: 0,
  }
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  columns= ["Lunedi","Martedi","mercoledi","Giovedi","Venerdi","Sabato","Domenica"] 
  // grid=[]
  point= {
    disp: "none",
    left: "0px",
    top: "0px",

  }
  ngOnInit() {
    var now = new  Date()
    var today = now.getDay() -1
    var day_number = now.getDate()
    for (let i=0;i<7;i++){
      var day = day_number - today  + i
      this.week.push(day)
      // if( i < day_number){
       
      // }
      // else{
      //   var day = today  day_number + i
      // }
    }
    console.log(this.week)
    this.api.openHours().subscribe(
      data=>{
        this.resp=data[0].closed_time/3+1
        this.col = data[0].wkday-1
        this.closed = (data[0].closed_time+data[0].duration)/3+1
      },
      err => {
        console.log(err,'err')
      }
    )
    this.api.login('jack','pass5523').subscribe(
      data=>{
        var token = data.token
        const token_parts = token.split(/\./);
        const token_decoded = JSON.parse(window.atob(token_parts[1]));
      },
      err => {
        console.log(err,'err')
      }
    )
    // this.api.bookApp(data).subscribe(
    //   data=>{
    //     console.log(data,'data')
    //   },
    //   err => {
    //     console.log(err,'err')
    //   }
    // )
  }
  blockPos(row, col){
    if (this.point.disp == "none"){
      this.currentBlock.row = row 
      this.currentBlock.col =col
    }
  }
  closeModal(){
    this.point.disp = "none"
  }
  deleteAppointment(){
    this.info=''
    this.point.disp = "none"

  }
  showCoords($event) {
    if (this.point.disp == "none"){
      var x = $event.clientX;
      var y = $event.clientY;
      // if (this.grid[this.currentBlock.row][this.currentBlock.col].booked){ 
      //   this.title_text="Modifica appuntamento"
      //   this.btn_text="Modifica"
      //   this.nome = this.grid[this.currentBlock.row][this.currentBlock.col].nome
      //   this.info = this.grid[this.currentBlock.row][this.currentBlock.col].info
      // }
      this.point={
        disp:"block",
        left: x+"px",
        top: y+"px",
      }
    }
    else{
      this.point={
        disp:"none",
        left: x+"px",
        top: y+"px",
      }
    }
  }
  addAppointment() {
    this.point.disp="none"
    var div = document.createElement('div');
    // this.currentBlock.row+this.time-1
    div.innerHTML = `
    <div (dragstart)="drag($event)" draggable=true class="task task--primary" id=${div.id = new Date().getTime().toString()} style='height: ${(this.time)*50}px !important'> 
        <div class="task-duration">${this.rows[this.currentBlock.row-1]}-${this.rows[this.currentBlock.row+(this.time-1)]}</div>
        <div class="task-details"[innerHTML]="">${this.info} </div>
        <div class="task-name">${this.nome}</div>
    </div>

`;//47 is the height of the cell 16 is 2 times the verical padding (8px)
    div.ondragstart = this.drag
   
    document.getElementById(this.currentBlock.row+"-"+this.currentBlock.col).append(div);
    this.setAppoitment((this.currentBlock.row-1), (this.currentBlock.row+(this.time-1)), this.week[this.currentBlock.col], new Date().getMonth(), 2020, this.nome , this.info)
    
    // this.api.bookApp(data).subscribe(
    //   data=>{
    //     console.log(data,'data')
    //   },
    //   err => {
    //     console.log(err,'err')
    //   }
    // )

  }
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("height", ev.srcElement.scrollHeight);
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    
    var data = ev.dataTransfer.getData("text");
    var obj_height = ev.dataTransfer.getData("height");
    var id = ev.target.id
    var h1 = id.split('-')[0]-1
    var h2 = h1 + Math.round(obj_height/49)
    
    if( this.rows[h1] != undefined && this.rows[h2] != undefined){
      document.getElementById(data).getElementsByClassName('task-duration')[0].innerHTML = `${this.rows[h1]}-${this.rows[h2]}`
    }
    ev.target.append(document.getElementById(data));
  }

  getAppoitments(){
    for (let appo of this.appointmentlist){
          this.point.disp="none"
          var height = appo.end - appo.start
          var div = document.createElement('div');
          div.innerHTML = `<div (dragstart)="drag($event)" draggable=true class="task task--primary" id=${div.id = new Date().getTime().toString()} style='height: ${(height)*50}px !important'> 
                          <div class="task-duration">${this.rows[appo.start]}-${this.rows[appo.end]}</div>
                          <div class="task-details"[innerHTML]="">${appo.details} </div>
                          <div class="task-name">${appo.name}</div>
                          </div>`;//47 is the height of the cell 16 is 2 times the verical padding (8px)
    div.ondragstart = this.drag
   
    document.getElementById((appo.start+1)+"-"+this.week.indexOf(appo.day)).append(div);
    }
    

  }

  setAppoitment(start, end, day, month, year,name, details){

    var appointment: Appointment = {
      start: start,
      end: end,
      day: day,
      month: month,
      year: year,
      name: name,
      details: details
    }
    this.appointmentlist.push(appointment)
    console.log(this.appointmentlist)

  }
  
  
}
