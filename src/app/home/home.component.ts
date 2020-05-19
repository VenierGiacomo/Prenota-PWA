import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// private cdRef:ChangeDetectorRef
  constructor(private api: ApiService, private storage: StorageService, private router: Router) { } 
  resp:any
  display = 'week'
  col: number
  closed: number
  placeholderName="Inserisci nome cliente"
  appointmentlist=[]
  week = []
  year =new Date().getFullYear()
  months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month = new Date().getMonth()
  month_name = this.months_names[this.month]
  nome=""
  info=""
  time = 2
  edit= false
  bgModalDisp='none'
  title_text = "Nuovo appuntamento"
  btn_text = "Aggiungi"
  employees
  selected
  currentBlock= {
    row: 0,
    col: 0,
  }
  updateAppointmentId
  openlist = [[],[],[],[],[],[],[],]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  columns= ["Lunedi","Martedi","mercoledi","Giovedi","Venerdi","Sabato","Domenica"] 
  // grid=[]
  point= {
    disp: "none",
    left: "0px",
    top: "0px",

  }
  
ngOnInit() {
// dispaly the appopriate days number and months
  var now = new  Date()
  var today = now.getDay() -1
  var day_number = now.getDate()
  for (let i=0;i<7;i++){
    var day = day_number - today  + i
    this.week.push(day)
  }

// dispaly the closed hours
var openinghours = this.storage.getEmployeehours()
for (let hour of openinghours[0].timetable){
     this.openlist[hour.wkday].push(hour.start)
     this.openlist[hour.wkday].push(hour.end)      
    }
 
  setTimeout(()=>{
    this.getAppoitments()
    this.employees = this.storage.getEmployeehours()
    this.selected = this.employees[0].id
  },500)
}

getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  var yearStart = +(new Date(Date.UTC(d.getUTCFullYear(),0,1)));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  return  weekNo
}
//Used to select the proper cell to create the event
blockPos(row, col){
    if (this.point.disp == "none"){
        this.currentBlock.row = row 
        this.currentBlock.col =col
        // document.getElementById(row+"-"+col).style.backgroundColor = '#a3d9f5'
    }
    else{
      // document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
    }
    


}
closeModal(){
    // document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
    this.point.disp = "none"
}

//Display the appointment modal in the proper place
showCoords($event) {
  this.nome=""
  this.info=""
  this.time=2
  this.edit = false
  if (this.point.disp == "none"){
    var x = $event.clientX;
    var y = $event.clientY;
if (y > 400){
  y = y -334
}
    this.point={
      disp:"block",
      left: (x-260)+"px",
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
//Add a new appointment
addAppointment() {
  // document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
  this.setAppoitment((this.currentBlock.row-1), (this.currentBlock.row+(this.time-1)), this.week[this.currentBlock.col], this.month, this.year, this.nome , this.info)
}
// The next three functions allow to drag and drop the events
  allowDrop(ev) { 
    ev.preventDefault();
  }
  drag(ev) {

    ev.dataTransfer.setData("height", ev.srcElement.scrollHeight);
    ev.dataTransfer.setData("text", ev.target.id);
  }
  click(ev) {
    console.log(ev)
    console.log(this.rows)
  }
  drop(ev) {
    ev.preventDefault();
    console.log(this.rows)
    var data = ev.dataTransfer.getData("text");
    var obj_height = ev.dataTransfer.getData("height");
    var id = ev.target.id
    var h1 = id.split('-')[0]-1
    var h2 = h1 + Math.round(obj_height/60)
    var col = id.split('-')[1]
    if( this.rows[h1] != undefined && this.rows[h2] != undefined && ev.target.id != data  ){
      document.getElementById(data).getElementsByClassName('task-duration')[0].innerHTML = `${this.rows[h1]}-${this.rows[h2]}`
      ev.target.append(document.getElementById(data));
      var appointments = this.storage.getAllAppointmets()
    for (let appointment of appointments){
      if(appointment.id ==data){
         this.storage.dragUpdateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.week[col], appointment.month, appointment.year, appointment.client_name, appointment.details, appointment.employee)
         this.api.updateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.week[col], appointment.month, appointment.year, appointment.client_name, appointment.details, appointment.employee).subscribe(data =>{
console.log(data)
         },err =>{
          console.log(err)
         })
       }
      }
    }

    
    
     
     
  }
// Function that displays the stored appointments
async getAppoitments(){
  this.appointmentlist= []
  var week = this.getWeekNumber(new Date(2020, 4, this.week[0]))
  var online_data: any = await this.api.getAppointments(week).subscribe(
    data=>{
      this.appointmentlist= data
      if (this.appointmentlist.length != 0){
        for (let appo of this.appointmentlist){
          this.point.disp="none"
          var height = appo.end - appo.start
          var div_height = ((height*60)-16)+'px'
          var div = document.createElement('div');
          div.ondragstart = this.drag
          var self = this
          div.onclick = function() {
           setTimeout(() => {
            self.nome = appo.client_name
            self.time = appo.end-appo.start
            self.info = appo.details
            self.edit = true
            self.updateAppointmentId =appo.id
           }, 1);
        };
          div.draggable =true
          div.classList.add('task','task--primary') 
          div.id=appo.id
          div.style.height =div_height
          div.innerHTML = `
                          <div class="task-duration" id=${ appo.id}>${this.rows[appo.start]}-${this.rows[appo.end]}</div>
                          <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${appo.id}>${appo.details} </div>
                          <div class="task-name" id=${ appo.id} >${appo.client_name}</div>`;//47 is the height of the cell 16 is 2 times the verical padding (8px)
         
          if (this.week.indexOf(appo.day)>=0 && this.getWeekNumber(new Date(this.year, this.month, this.week[0])) == appo.week && this.selected ==appo.employee){
          document.getElementById((appo.start+1)+"-"+this.week.indexOf(appo.day)).append(div)
          }
          this.storage.updateAppointment(appo.id ,appo.start, appo.end, appo.day, appo.month, appo.year, appo.client_name, appo.details, appo.employee, true)
          
        }
       
      }
      else{console.log('empty_data')}
      this.saveNotStored()
    },
    err => {
      this.appointmentlist = this.storage.getAllAppointmets()
      console.log(this.appointmentlist, 'no connection',err)
      for (let appo of this.appointmentlist){
        this.point.disp="none"
        var height = appo.end - appo.start
        var div_height = ((height*60)-16)+'px'
        var div = document.createElement('div');
        div.ondragstart = this.drag
          div.onclick = this.modifyApp
          div.draggable =true
          div.classList.add('task','task--primary') 
          div.id=appo.id
          div.style.height =div_height
          div.innerHTML = `
                          <div class="task-duration" id=${ appo.id}>${this.rows[appo.start]}-${this.rows[appo.end]}</div>
                          <div class="task-details"[innerHTML]="" id=${appo.id}>${appo.details} </div>
                          <div class="task-name" id=${ appo.id} >${appo.client_name}</div>`;//47 is the height of the cell 16 is 2 times the verical padding (8px)
        if (this.week.indexOf(appo.day)>=0 && this.getWeekNumber(new Date(this.year, this.month, this.week[0])) == appo.week && this.selected ==appo.employee){
          document.getElementById((appo.start+1)+"-"+this.week.indexOf(appo.day)).append(div);
        }
      }
     
    }
  )
}
// Function that stores appointments both locally and on server
setAppoitment(start, end, day, month, year,name, details){
  this.api.bookAppointment( start, end, day, month, year,name, details, this.selected,).subscribe(
    data=>{
      this.point.disp="none"
      var div = document.createElement('div');
      var div_height = ((this.time*60)-16)+'px'
      div.ondragstart = this.drag
      div.onclick = this.modifyApp
      div.draggable =true
      div.classList.add('task','task--primary') 
      div.id=data.id
      div.style.height =div_height
      div.innerHTML = `
          <div class="task-duration">${this.rows[this.currentBlock.row-1]}-${this.rows[this.currentBlock.row+(this.time-1)]}</div>
          <div class="task-details"[innerHTML]="">${this.info} </div>
          <div class="task-name">${this.nome}</div>`;//47 is the height of the cell 16 is 2 times the verical padding (8px)
      document.getElementById(this.currentBlock.row+"-"+this.currentBlock.col).append(div);
      this.storage.addAppointmet(data.id, start, end, day, month, year,name, details, this.selected,true)
    },
    err => {
      console.log(err, 'errr')
      this.point.disp="none"
      var div = document.createElement('div');
      var div_height = ((this.time*60)-16)+'px'
      div.ondragstart = this.drag
      div.onclick = this.modifyApp
      div.draggable =true
      div.classList.add('task','task--primary') 
      div.id= new Date().getTime().toString()
      div.style.height =div_height
      // this.currentBlock.row+this.time-1
      div.innerHTML = `
          <div class="task-duration">${this.rows[this.currentBlock.row-1]}-${this.rows[this.currentBlock.row+(this.time-1)]}</div>
          <div class="task-details"[innerHTML]="" >${this.info} </div>
          <div class="task-name">${this.nome}</div>
      `;//50is the height of the cell
      document.getElementById(this.currentBlock.row+"-"+this.currentBlock.col).append(div);
      this.storage.addAppointmet(new Date().getTime(),start, end, day, month, year,name, details, this.selected, false)
    }
  )
}
updateAppointment(){
var appointments = this.storage.getAllAppointmets()
var app
  for (let appointment of appointments){
    if(appointment.id ==this.updateAppointmentId){
      app = appointment
    }

  }
 
 app.end =app.start + Number(this.time)
 var div_height = ((this.time*60)-16)+'px'
  this.api.updateAppointment(this.updateAppointmentId, app.start, app.end ,  app.day, app.month, app.year, this.nome, this.info, this.selected).subscribe(data =>{
    document.getElementById(this.updateAppointmentId).getElementsByClassName('task-details')[0].innerHTML = `${this.info}`
    document.getElementById(this.updateAppointmentId).getElementsByClassName('task-name')[0].innerHTML = `${this.nome}`
    document.getElementById(this.updateAppointmentId).getElementsByClassName('task-duration')[0].innerHTML = `${this.rows[app.start]}-${this.rows[ app.end]}`
    document.getElementById(this.updateAppointmentId).style.height = div_height
         },err =>{
          console.log(err)
         })
  this.storage.dragUpdateAppointment(this.updateAppointmentId, app.start, app.end,  app.day, app.month, app.year, this.nome, this.info, this.selected)
  this.closeModal()
}
deleteAppointment(){
  this.api.deleteAppointment(this.updateAppointmentId).subscribe(
    data=> {
      console.log(data)
    },err =>{
      console.log(err)
     })
  this.storage.deleteAppointmet(this.updateAppointmentId)
  var paras = document.getElementById(this.updateAppointmentId);
  console.log(paras)
  paras.parentNode.removeChild(paras);
  this.closeModal()
  }
nextWeek(){
  //remove last week appoitments
  var paras = document.getElementsByClassName('task');
  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  } ​
  setTimeout(() => {
  //change dates
  var next_m = 0
  for (let day in this.week){
    if (this.week[day] +7 <= this.months_days[this.month]){
      this.week[day] +=7
    }
    else{
      if (this.week[day] +7 > this.months_days[this.month] && this.week[6] +7 <= this.months_days[this.month]){
        if (this.month == 0){
          this.week[day] =this.week[day] +7  -this.months_days[11]
          
        }else{
          this.week[day] =this.week[day] +7  -this.months_days[this.month-1]
        }
      }
      else{
        this.week[day] =this.week[day] +7  -this.months_days[this.month]
        next_m = 1
     
       
      }
    }
  }
  if(next_m == 1){
    if (this.month == 11){
      this.month =0
      this.year += 1
    }
    else{
      this.month +=1
    }
    
    next_m = 0
    this.month_name = this.months_names[this.month]
  }
  // this.week= this.week.map((value, index, array)=>{
  //   value+=7
  //   return value})
  //get appointments
  this.getAppoitments()
}, 100);
}  
pastWeek(){
  //remove last week appoitments
  var paras = document.getElementsByClassName('task');
  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  } ​
  //change dates
  setTimeout(() => {
    var next_m = 0
  for (let day in this.week){
    if (this.week[day] > 7){
      this.week[day] -=7
    }
    else{
      if (this.week[day] < 7  && this.week[6] > 7){
      if (this.month == 0){
        this.week[day] = this.week[day] -7 +this.months_days[11]
      }
      else{
        this.week[day] = this.week[day] -7 +this.months_days[this.month-1]
      }
      }
      else{
        if (this.week[day] < 7  && this.week[0] > 7){

          if (this.month == 0){
            this.week[day] = this.week[day] -7 +this.months_days[11]
            next_m = 1
          }
          else{
            this.week[day] = this.week[day] -7 +this.months_days[this.month-1]
            next_m = 1
          }
         
        }
        else{
          this.week[day]= this.week[day] -7 +this.months_days[this.month-1]
          // next_m = 1
        }
       
       
      }
    }
  }
  if(next_m == 1){
    if (this.month == 0){
      this.month = 11
      this.year -= 1
    }
    else{
      this.month -=1
    }
   
    next_m = 0
    this.month_name = this.months_names[this.month]
  }
  //get appointments
  this.getAppoitments()
  }, 100);
  
  
}    
goSettings(){
  this.router.navigateByUrl('/settings')
}
activetab(employee){
  var paras = document.getElementsByClassName('task');
  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  } ​
  this.selected = employee.id
  var timetables = this.storage.getEmployeehours()
  var work_hours:any
  for (let timetable of timetables){
    if(timetable.id == employee.id){
      work_hours = timetable.timetable
    }
  }
  this.openlist = [[],[],[],[],[],[],[],]
  for (let hour of work_hours){
   this.openlist[hour.wkday].push(hour.start)
   this.openlist[hour.wkday].push(hour.end)      
  }

 this.getAppoitments()

}

goToday(){
  console.log('clicked')
  var now = new  Date()
  this.week=[]
  var today = now.getDay() -1
  var day_number = now.getDate()
  for (let i=0;i<7;i++){
    var day = day_number - today  + i
    this.week.push(day)
  }
  this.month = now.getMonth()
  this.month_name= this.months_names[this.month]
  this.year = now.getFullYear()
  this.getAppoitments()

}
saveNotStored(){
  var unstored = this.storage.getAppointmets(false)
      if (unstored.length > 0){
        console.log('trovaro unstore')
        for(let app of unstored){
          console.log(app)
          this.api.bookAppointment( app.start, app.end, app.day, app.month, app.year, app.client_name, app.details, this.selected).subscribe(
            data=>{
              console.log(data, 'stored appointment')
              this.storage.deleteAppointmet(app.id)
              this.getAppoitments()

            },
            err => {
              console.log(err, 'error while storing')
            }
          )
        }
      }
}
modifyApp(ev){
  
 
// self.goSettings()
  console.log('porco dio', this.rows)
 
   
 

  // for (let appointment of this.appointmentlist){
  //   if (appointment.id = ev.target.id){
  //     app=appointment
  //   }
  // }
  
  // console.log(app) 

}
}
