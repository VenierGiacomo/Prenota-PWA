import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import *  as screenfull from 'screenfull'
import { Title } from '@angular/platform-browser';
import { ControlStateMixin } from '@vaadin/vaadin-control-state-mixin';
import { Appointment } from '../services/appointment.model';
import Notiflix from "notiflix";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// private cdRef:ChangeDetectorRef
  constructor(private api: ApiService, private storage: StorageService, private router: Router ,private titleService: Title) {
    this.titleService.setTitle( "Prenota: Agenda online - Il tuo gestionale");
   }
  resp:any
  bgModalDisp='none';
  display = 'week'
  col: number
  full_screen =false
  closed: number
  placeholderName="Inserisci nome cliente"
  appointmentlist=[]
  week = []
  today = new Date().getDate()
  year =new Date().getFullYear()
  months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month 
  month_name 
  nome=""
  info=101010
  time = 2
  phone=''
  appointment_notes=''
  extra_desc=''
  edit= false
  title_text = "Nuovo appuntamento"
  btn_text = "Aggiungi"
  employees
  catalog_list
  selected
  employees_list:any=[]
  date_picker
  time_passed = 0
  currentBlock= {
    row: 0,
    col: 0,
  }
  OneView=false
  show_others=false
  updateAppointmentId
  free_hours:any
  availableSpots:any=[]
  spot_show = 'none'
  openlist = [[],[],[],[],[],[],[],]
  times =["06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  columns= ["Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato","Domenica"] 
  // grid=[]
  point= {
    disp: "none",
    left: "0px",
    top: "0px",

  }
  m_initial
  m_final
async ngOnInit() {
// dispaly the appopriate days number and months
  var now = new  Date()
  var today = now.getDay() -1
  var month = now.getMonth()
  this.month = month
  var day_number = now.getDate()
  if (today == -1){
    today= 6
  }
  for (let i=0;i<7;i++){
    if( day_number - today  + i<= this.months_days[month]){
      var day = day_number - today  + i
      if(day<1){
      day= day +this.months_days[month-1]
      }
    }else{
      var day = day_number - today  + i - this.months_days[month]
    }
    this.week.push(day)
  }
  if(this.week[6]<this.week[0] && day_number>20){
  this.month = month+1
  this.month_name=this.months_names[month+1]
}
else{
  this.month = month
  this.month_name=this.months_names[month]
}

// dispaly the closed hours
var openinghours = await this.storage.getEmployeehours()
if(openinghours==0 || openinghours[0].timetable.length == 0){
  
  this.api.getEmployees().subscribe(async data=>{
    this.employees_list = data
    // for(let user of data){
    //   await this.api.getSpecificUser(user.employee).subscribe(async data=>{
    //     await this.employees_list.push(data)
    //   },err=>{
    //     console.log(err)
    //   })
    // }
      this.api.getemployeeHours().subscribe(async data=>{
        for (let employee of this.employees_list){
          let timetable =[]
          for(let timeslot of data){
            if(employee.employee == timeslot.employee){
              timetable.push(timeslot)
            }
          }
         await this.storage.setEmployeehours(employee.employee, employee.name,timetable)
        }

      },err=>{
        console.log(err)
      })

  },err=>{
    console.log(err)
  })
}
var x = this.storage.getCatalog()
if(x.length==0){
  this.api.getStoreservice().subscribe(data=>{
    var services:any = data
    for(let service of services){
      this.storage.setCatalog(service.id, service.name, service.duration, service.duration_book, service.sex, service.max_n, service.color)
    }
  },err=>{
    console.log(err)
  })
}
// this.storage.setHomeReference(this)
  if (openinghours.length>0){
    for (let hour of openinghours[0].timetable){
      this.openlist[hour.wkday].push(hour.start)
      this.openlist[hour.wkday].push(hour.end)      
    }
  }

 
  setTimeout(()=>{
    this.getAppoitments()
    var employees = this.storage.getEmployeehours()
    if (employees.length >0){
      this.employees = this.storage.getEmployeehours()
      this.selected = this.employees[0].id
    }
    this.catalog_list = this.storage.getCatalog()
  },500)
console.log(this.month)
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
      document.getElementById(row+"-"+col).style.backgroundColor = '#a3d9f5'
  }
  else{
    document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
  }
}
closeModal(){
    document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
    this.point.disp = "none"
}

//Display the appointment modal in the proper place
showCoords($event) {
  this.nome=""
  this.phone=""
  this.extra_desc=''
  this.info=101010
  this.time=2
  this.edit = false
  if (this.point.disp == "none"){
    var x = $event.clientX;
    var y = $event.clientY;
  var body = document.body,
  html = document.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
  if( height-y < 432){
      y =  height-460
  }else{
    y = Math.max(y -260,0)
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
  var month = this.month
  var year = this.year
  if(!this.OneView){
  if(this.week[6]<this.week[0]&& this.week[this.currentBlock.col]>7){
      month=month-1
      if(month==-1){
        month=11
        year-=1
      }
    }
  }
  
  
  document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
  if(this.OneView){
    if (this.info == -1){
      this.setAppoitment((this.currentBlock.row-1), (this.currentBlock.row+(this.time-1)), this.today, month, year, this.nome , this.phone, this.extra_desc, this.currentBlock.col, this.info)
    }else if (this.info == -2){
      this.setAppoitment(0, 204, this.today, month, year,"Chiuso", this.phone, "Chiuso", this.currentBlock.col, this.info)
    }else{
      var services = this.storage.getCatalog()
      var serv
      for(let service of services){
        if (service.id ==  this.info){
          serv= service
        }
      }
      this.setAppoitment((this.currentBlock.row-1), (this.currentBlock.row-1)+Number(serv.duration_book) , this.today, month, year, this.nome , this.phone, serv.name, this.currentBlock.col, this.info)
    }
  }else{
  if (this.info == -1){
      this.setAppoitment((this.currentBlock.row-1), (this.currentBlock.row+(this.time-1)), this.week[this.currentBlock.col], month, year, this.nome , this.phone, this.extra_desc, this.selected, this.info)
    }else if (this.info == -2){
      this.setAppoitment(0, 204, this.week[this.currentBlock.col], month, year, "Chiuso" , this.phone, "Chiuso", this.selected, this.info)
    }else{
      var services = this.storage.getCatalog()
      var serv
      for(let service of services){
        if (service.id ==  this.info){
          serv= service
        }
      }
      this.setAppoitment((this.currentBlock.row-1), (this.currentBlock.row-1)+Number(serv.duration_book) , this.week[this.currentBlock.col], month, year, this.nome , this.phone, serv.name, this.selected, this.info)
    }
  }
}
// The next three functions allow to drag and drop the events
  allowDrop(ev) { 
    ev.preventDefault();
  }
  drag(ev) {
    ev.dataTransfer.setData("height", ev.srcElement.scrollHeight);
    ev.dataTransfer.setData("text", ev.target.id);
    document.getElementById(ev.target.id).style.zIndex = "0"
  }
  async drop(ev) {
    if(ev.target.id.includes('-')){
      // document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var obj_height = ev.dataTransfer.getData("height");
      var id = ev.target.id
      var h1 = id.split('-')[0]-1
      var dur = Math.round(obj_height/20)
      var h2 = h1 + dur
      var col = id.split('-')[1]
      if( this.times[h1] != undefined && this.times[h2] != undefined && ev.target.id != data  ){
        var hour1=this.rows[h1]
        var hour2 = this.times[this.times.indexOf(hour1)+dur]
        document.getElementById(data).getElementsByClassName('task-duration')[0].innerHTML = `${hour1}-${hour2}`
        ev.target.append(document.getElementById(data));
        document.getElementById(data).style.zIndex = "1"
        var appointments = this.storage.getAllAppointmets()
      for (let appointment of appointments){
        if(appointment.id ==data){
          if (this.OneView){
            if(this.week[6]<this.week[0]&& this.today>7){
              appointment.month=appointment.month-1
              if(appointment.month==-1){
                appointment.month=11
                appointment.year-=1
              }
            }
            await this.storage.dragUpdateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.today, appointment.month, appointment.year, appointment.client_name, appointment.phone, appointment.details, col, appointment.service_n, appointment.note )
            this.api.updateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.today, appointment.month, appointment.year, appointment.client_name, appointment.phone, appointment.details, col, appointment.service_n, appointment.note).subscribe(data =>{
              Notiflix.Notify.Success('Modifiche salvate con successo');
            },err =>{
              console.log(err)
             })
          }else{
            if(this.week[6]<this.week[0]&& this.week[col]>7){
              appointment.month=appointment.month-1
              if(appointment.month==-1){
                appointment.month=11
                appointment.year-=1
              }
            }
            await this.storage.dragUpdateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.week[col], appointment.month, appointment.year, appointment.client_name, appointment.phone, appointment.details, appointment.employee, appointment.service_n, appointment.note)
            this.api.updateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.week[col], appointment.month, appointment.year, appointment.client_name, appointment.phone, appointment.details, appointment.employee, appointment.service_n, appointment.note).subscribe(data =>{
              Notiflix.Notify.Success('Modifiche salvate con successo');
          },err =>{
            console.log(err)
           })
         }
          }
        }
      }
    }else{
     var parentId=  document.getElementById(ev.target.id).parentElement.id
     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     var obj_height = ev.dataTransfer.getData("height");
     var id :any = parentId 
     var h1 = id.split('-')[0]-1
     var dur = Math.round(obj_height/20)
     var h2 = h1 + dur
     var col = id.split('-')[1]
     if( this.times[h1] != undefined && this.times[h2] != undefined && parentId != data  ){
       var hour1=this.rows[h1]
       var hour2 = this.times[this.times.indexOf(hour1)+dur]
       document.getElementById(data).getElementsByClassName('task-duration')[0].innerHTML = `${hour1}-${hour2}`
       document.getElementById(parentId).append(document.getElementById(data));
       document.getElementById(data).style.zIndex = "10"
       var appointments = this.storage.getAllAppointmets()
     for (let appointment of appointments){
       if(appointment.id ==data){
          this.storage.dragUpdateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.today, appointment.month, appointment.year, appointment.client_name, appointment.phone, appointment.details, col, appointment.service_n, appointment.note)
          this.api.updateAppointment(data, h1, (h1+(appointment.end-appointment.start)),  this.today, appointment.month, appointment.year, appointment.client_name, appointment.phone, appointment.details, col, appointment.service_n, appointment.appointment_notes).subscribe(data =>{
            Notiflix.Notify.Success('Modifiche salvate con successo');
          },err =>{
           console.log(err)
          })
        }
       }
      }
    }  
  }

// Function that displays the stored appointments
async getAppoitments(){
  this.appointmentlist=[]
  var week 
  if(this.OneView){
    if(this.week[6]<this.week[0]){
      if(this.today<7){
        week = this.getWeekNumber(new Date(this.year, this.month, this.today))
      }else{
        week = this.getWeekNumber(new Date(this.year, this.month, this.today))
    }
  }else{
    week = this.getWeekNumber(new Date(this.year, this.month, this.today))
  }
  }else{
    if(this.week[6]<this.week[0]){
      week = this.getWeekNumber(new Date(this.year, this.month-1, this.week[0]))
  }else{
    week = this.getWeekNumber(new Date(this.year, this.month, this.week[0]))
  }
  }
  
  // usa un last check 10minutes per risparmiare server
  var now = + new Date()
  // if ((now - this.time_passed )>60000){
    this.api.getAppointments(week).subscribe(
      data=>{
        // console.log(data)
        this.appointmentlist= data
        this.time_passed = + new Date()
        if (this.appointmentlist.length != 0){
          if(this.OneView){
            for (let appo of this.appointmentlist){
              this.drawEmploAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
              // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
              this.storage.updateAppointment(appo.id, appo.start, appo.end, appo.day , appo.month, appo.year, appo.client_name, appo.phone, appo.details,  appo.employee, appo.service_n,true, appo.note)
            }
          }else{
            for (let appo of this.appointmentlist){
              this.drawAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note )
              // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
              this.storage.updateAppointment(appo.id, appo.start, appo.end, appo.day , appo.month, appo.year, appo.client_name, appo.phone, appo.details,  appo.employee, appo.service_n,true, appo.note)
            }
          } 
        }
        else{console.log('empty_data')}
        this.saveNotStored()
      },
      err => {
        this.appointmentlist=[]
        this.appointmentlist = this.storage.getAllAppointmets()
        for (let appo of this.appointmentlist){
          this.drawAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note )
          // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
        }
       
      }
    )
}
// Function that stores appointments both locally and on server
setAppoitment(start, end, day, month, year, client_name, phone, details, employee, service){
  var week = this.getWeekNumber(new Date(year, month, day))
    this.point.disp="none"
    this.api.bookAppointment( start, end, day, month, year, client_name, this.phone, details, employee, service).subscribe(
      data=>{
        Notiflix.Notify.Success('Appuntamento registrato');
        console.log("online")
        if(this.OneView){
          this.drawEmploAppointment(data.id, start, end, details, client_name, employee, service, day ,week, month, year)
        this.storage.addAppointmet(data.id,start, end, day, month, year,client_name, phone, details, employee, service, true, '')
        this.appointmentlist.push(new Appointment(data.id,start, end, day, week, month, year, client_name, phone,  details, employee, service, ''))
        }
        else{
          this.drawAppointment(data.id, start, end, details, client_name, employee, service, day ,week, month-1, year,'')
          this.storage.addAppointmet(data.id,start, end, day, month, year,client_name, phone, details, employee, service, true, '')
          this.appointmentlist.push(new Appointment(data.id,start, end, day, week, month, year, client_name, phone,  details, employee, service, ''))
        }
      },
      err => {
        console.log("offline")
        if(this.OneView){
          this.drawEmploAppointment(new Date(), start, end, details, client_name, employee, service, day ,week, month, year)
          this.storage.addAppointmet(new Date().getTime(),start, end, day, month, year,client_name, phone, details, employee, service, false, '')
        }
        else{
            this.drawAppointment(new Date(), start, end, details, client_name, employee, service, day ,week, month-1, year,'')
            this.storage.addAppointmet(new Date().getTime(),start, end, day, month, year,client_name, phone, details, employee, service, false, '')}
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
  var new_service
if(this.info !=-1){
  var services = this.storage.getCatalog()
  for(let service of services){
    if(service.id == this.info){
      new_service = service
    }
    
  }
  app.end =app.start + Number(new_service.duration_book)
  var div_height = (new_service.duration_book*20)+'px'
  


    this.extra_desc = new_service.name
 }else{
  app.end =app.start + Number(this.time)
  var div_height = (this.time*20)+'px'
  new_service= {color: 10000, duration: this.time } 
 }
  this.api.updateAppointment(this.updateAppointmentId, app.start, app.end ,  app.day, app.month, app.year, this.nome, this.phone, this.extra_desc, app.employee , this.info, this.appointment_notes ).subscribe(data =>{
    var element = document.getElementById(this.updateAppointmentId)
    var hour1= this.rows[app.start]
    var hour2 = this.times[this.times.indexOf(hour1)+Number(new_service.duration_book)]
    element.getElementsByClassName('task-details')[0].innerHTML = `${data.details}`
    element.getElementsByClassName('task-name')[0].innerHTML = `${this.nome}`
    element.getElementsByClassName('task-duration')[0].innerHTML = `${hour1}-${hour2}`
    element.style.height = div_height
    // element.classList.remove(`c${app.service}`)
    const colors = new RegExp(/c[0-9]*/, 'g');
    element.className = element.className.replace(colors, '') 
    element.classList.add(`c${new_service.color}`)
    Notiflix.Notify.Success('Modifiche salvate con successo');
    this.storage.dragUpdateAppointment(this.updateAppointmentId, app.start, app.end,  app.day, app.month, app.year, this.nome, this.phone, this.extra_desc, app.employee, this.info, this.appointment_notes)
         },err =>{
          Notiflix.Notify.Failure("C'è stato un problema durante il salvataggio");
          console.log(err,"Siamo spiacenti. Ci sono dei problemi. Controlla la connessione")
         })
  
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
  paras.parentNode.removeChild(paras);
  this.closeModal()
  }
nextWeek(){
  //remove last week appoitments
  if(this.OneView){
    if(this.today<this.months_days[this.month]){
      this.today+=1
    }else{
      if(this.month!=11){
        this.today = 1
        this.month+=1
      }else{
        this.today = 1
        this.month=1
        this.year=+1
      }
     
    }
    var last_week = this.week
    this.week=[]
    // console.log(this.year,this.month, this.today, this.week)
    var now = new  Date(this.year,this.month, this.today)
    var today = now.getDay() -1
    var month = now.getMonth()
    var day_number = now.getDate()
    // console.log(this.year,this.month, this.today, this.week, today, month,day_number)
    if (today == -1){
      today= 6
    }
    for (let i=0;i<7;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
      this.week.push(day)
    }
  //   if(this.week[6]<this.week[0] && day_number>20){
  //   this.month = month+1
  //   this.month_name=this.months_names[month+1]
  // }
  // else{
    this.month = month
    this.month_name=this.months_names[month]
  // }
  // console.log(this.week[6]+1,this.week[6], this.today)
    this.goToday(this.week[0]!=last_week[0])
   
  } else{
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
}  
pastWeek(){
  //remove last week appoitments
  if(this.OneView){
    if(this.today>1){
      this.today-=1
    }else{
      if(this.month!=0){
        this.month= this.month-1
        this.today = this.months_days[this.month]
      }else{
        this.today = 31
        this.month=11
        this.year=-1
      }
     
    }
    var last_week = this.week
    this.week=[]
    var now = new   Date(this.year,this.month, this.today)
    var today = now.getDay() -1
    var month = now.getMonth()
    var day_number = now.getDate()
    if (today == -1){
      today= 6
    }
    for (let i=0;i<7;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
      this.week.push(day)
    }
    this.goToday(this.week[0]!=last_week[0]) //pass true or false
  

   
  } else{
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
      if (this.week[6] > 7){
      if (this.month == 0){
        this.week[day] = this.week[day] -7 +this.months_days[11]
      }
      else{
        this.week[day] = this.week[day] -7 +this.months_days[this.month-1]
      }
      }
      else{
        if (this.week[0] > 7){

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
}    
goSettings(){
  this.router.navigateByUrl('/settings')
}
goNotifications(){
  this.router.navigateByUrl('/notifications')
}
showOthers(){
  if(this.show_others){
    var paras = document.getElementsByClassName('task');
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    } ​
    this.appointmentlist =this.storage.getAllAppointmets()
    if (this.appointmentlist.length != 0){
      if(!this.OneView){
        for (let appo of this.appointmentlist){
          // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
          this.drawAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note )
        }
      }
    }
    this.show_others=false
  }else{
    this.appointmentlist =this.storage.getAllAppointmets()
    if (this.appointmentlist.length != 0){
      if(!this.OneView){
        for (let appo of this.appointmentlist){
          this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
          // this.drawAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
        }
      }
    }
    this.show_others=true
  }
}

// notifications
async activetab(employee){
  this.show_others=false
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
  this.appointmentlist = await this.storage.getAppointmets(true)
  // console.log(this.appointmentlist)
  if (this.appointmentlist.length != 0){
    if(this.OneView){
      for (let appo of this.appointmentlist){
        this.drawEmploAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
      }
    }else{
      for (let appo of this.appointmentlist){
        this.drawAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note )
      }
    }
  }
}

goToday(new_week){
  var paras = document.getElementsByClassName('task');
  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  } ​
 if (!this.OneView){
    var date = new Date()
    this.month = date.getMonth()
    this.today = date.getDate()
    this.year = date.getFullYear()
 }
 this.OneView = true
  if(new_week){
    setTimeout(() => {
      this.getAppoitments()
    }, 50);
  }else{
    setTimeout(async () => {
      this.appointmentlist = await this.storage.getAppointmets(true)
    for (let appo of this.appointmentlist){
      this.drawEmploAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
    }
  }, 100);
  }

  
}
saveNotStored(){
  var unstored = this.storage.getAppointmets(false)
      if (unstored.length > 0){
        for(let app of unstored){
          this.api.bookAppointment( app.start, app.end, app.day, app.month, app.year, app.client_name, app.phone, app.details, this.selected, app.service_n).subscribe(
            data=>{
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
drawAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year,note ){
  var height = end - start
  var div_height = (height*20)+'px'
  var div = document.createElement('div');
  div.ondragstart = this.drag
  var has_note = false
  if(note!='' && note!=null){
    has_note = true
  }
  var self = this
  // console.log(client_name, day ,week, month, year )
  div.onclick = function() {
    setTimeout(() => {
    document.getElementById( self.currentBlock.row+"-"+ self.currentBlock.col).style.backgroundColor = 'transparent'
    var appo: any = self.storage.getAppointmet(id)
    self.nome = appo.client_name
    self.time = appo.end-start
    self.info = Number(appo.service_n)
    self.extra_desc = appo.details
    self.edit = true
    self.phone=appo.phone
    self.updateAppointmentId = id
    self.appointment_notes = note
    }, 1);
};
var services = this.storage.getCatalog()
var color = 10000
for (let service_el of services){
  if (service_el.id == service){
    color = service_el.color
  }
}
  div.draggable =true
  div.classList.add('task','task--primary', `c${color}`) 
  div.id= id
  div.style.height =div_height
  div.ondragover=this.allowDrop
  div.ondrop=this.drop
  var hour1=this.rows[start]
  var hour2 = this.times[this.times.indexOf(hour1)+height]
  var div_resize = document.createElement('div');
  div_resize.classList.add('bot-drag')
  var m_pos;
  let mod_div 
  let initial_h
  var res =false
  async function resize(e){
      // var mod_div = await document.getElementById(id)
      var dy = e.y - m_pos;
      // m_pos = e.y;
      // console.log(dy%20,(Math.floor(dy/20)))
      // mod_div.style.height = initial_h
      // if (dy%20>10){
        mod_div.style.height = initial_h +dy +'px'
      // }
      // mod_div.style.height = initial_h +(Math.floor(dy/20)) *20 +'px'
      // mod_div.draggable =true
      // mod_div.style.zIndex = "1"
      // console.log( initial_h + dy)
  }

  div_resize.addEventListener("mousedown", async function(e){
    res =true
      m_pos = e.y;
      mod_div = await document.getElementById(id)
      mod_div.draggable =false
      initial_h =  parseInt(mod_div.style.height.slice(0, -2))
      document.addEventListener("mousemove", resize, false);
  }, false);
  document.addEventListener("mouseup", async function(){
    mod_div.draggable =true
    if(res){
    var hei = parseInt(mod_div.style.height.slice(0, -2))
    var appo: any = await self.storage.getAppointmet(id)
    if(hei%20>10){
      mod_div.style.height  = Math.ceil(hei/20)*20 +'px'
      hour2 = self.times[self.times.indexOf(hour1)+Math.ceil(hei/20)]
      if(has_note){
      mod_div.innerHTML =`<div class="task-duration" id=${id}>${hour1}-${hour2} <img src='../assets/icons/info.svg'></div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id=${id} >${client_name}</div>`
      }else{
        mod_div.innerHTML =`<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
        <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
        <div class="task-name" id=${id} >${client_name}</div>`
      }
      div.appendChild(div_resize)
      start = self.rows.indexOf(hour1)
      end = self.rows.indexOf(hour1) + self.times.indexOf(hour2)- self.times.indexOf(hour1)
      self.api.updateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note).subscribe(async data =>{
        Notiflix.Notify.Success('Modifiche salvate con successo');
        await self.storage.dragUpdateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note)
      },err =>{
        console.log(err)
       })
    }else{
      mod_div.style.height  = Math.floor(hei/20)*20+'px'
      hour2 = self.times[self.times.indexOf(hour1)+Math.floor(hei/20)]
      if(has_note){
      mod_div.innerHTML =`<div class="task-duration" id=${id}>${hour1}-${hour2} <img src='../assets/icons/info.svg'></div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id=${id} >${client_name}</div>`
      }else{
        mod_div.innerHTML =`<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
        <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
        <div class="task-name" id=${id} >${client_name}</div>`
      }
      div.appendChild(div_resize)
      start = self.rows.indexOf(hour1)
      end = self.rows.indexOf(hour1) + self.times.indexOf(hour2) - self.times.indexOf(hour1)
      self.api.updateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note).subscribe(async data =>{
        Notiflix.Notify.Success('Modifiche salvate con successo');
        await self.storage.dragUpdateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note)
      },err =>{
        console.log(err)
       })
    }
    // setTimeout(() => {
    //   self.point.disp = 'none'
    // }, 1); 
      document.removeEventListener("mousemove", resize, false);
      res=false
    }
  }, false);
  // <div><img src='../assets/icons/info.svg'></div>
  if(has_note){
    div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2} <img src='../assets/icons/info.svg'></div>
    <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
    <div class="task-name" id=${id} >${client_name}</div>`//60 is the height of the cell 16 is 2 times the verical padding (8px)
  }else{
    div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
                  <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
                  <div class="task-name" id=${id} >${client_name}</div>`//60 is the height of the cell 16 is 2 times the verical padding (8px)
  }
  div.appendChild(div_resize)
  if(this.week[6]<this.week[0]){1
    if(day<7){
      if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month, day)) == week && this.selected ==employee){
        document.getElementById((start+1)+"-"+this.week.indexOf(day)).append(div)
        }
    }else{
      if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month-1, day)) == week && this.selected ==employee){
        document.getElementById((start+1)+"-"+this.week.indexOf(day)).append(div)
        }
    }}
  if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month, day)) == week && this.selected ==employee){
  document.getElementById((start+1)+"-"+this.week.indexOf(day)).append(div)
  }
  
  }  
  drawfadedAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year ){
    var height = end - start
    var div_height = (height*20)+'px'
    var div = document.createElement('div');
    div.style.opacity = '0.5'
    var self = this
    
  var services = this.storage.getCatalog()
  var color = 10000
  for (let service_el of services){
    if (service_el.id == service){
      color = service_el.color
    }
  }
    div.classList.add('task','task--primary', `c${color}`) 
    div.id= id
    div.style.height =div_height
    div.style.zIndex = '-1 !important'
    div.ondragover=this.allowDrop
    div.style.pointerEvents ='none'
    div.ondrop=this.drop
    // div.style.top = "15px"
    var hour1=this.rows[start]
    var hour2 = this.times[this.times.indexOf(hour1)+height]
    // <div><img src='../assets/icons/info.svg'></div>
    div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
                    <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
                    <div class="task-name" id=${id} >${client_name}</div>`;//60 is the height of the cell 16 is 2 times the verical padding (8px)
    if(this.week[6]<this.week[0]){1
      if(day<7){
        if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month, day)) == week && this.selected !=employee){
         if(document.getElementById((start+1)+"-"+this.week.indexOf(day)).childElementCount ==0){
          document.getElementById((start+1)+"-"+this.week.indexOf(day)).append(div)
         } 
          }
      }else{
        if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month-1, day)) == week && this.selected !=employee){
          if(document.getElementById((start+1)+"-"+this.week.indexOf(day)).childElementCount == 0){
            document.getElementById((start+1)+"-"+this.week.indexOf(day)).append(div)
          }
         
          }
      }}
    if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month, day)) == week && this.selected !=employee){
      if(document.getElementById((start+1)+"-"+this.week.indexOf(day)).childElementCount == 0){
        document.getElementById((start+1)+"-"+this.week.indexOf(day)).append(div)
      }
    }
    
    } 
  drawEmploAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year ){
    var height = end - start
    var div_height = (height*20)+'px'
    var div = document.createElement('div');
    div.ondragstart = this.drag
    var self = this
    div.onclick = function() {
      setTimeout(() => {
      // document.getElementById( self.currentBlock.row+"-"+ self.currentBlock.col).style.backgroundColor = 'transparent'
      var appo: any = self.storage.getAppointmet(id)
      self.nome = appo.client_name
      self.time = appo.end-start
      self.info = Number(appo.service_n)
      self.extra_desc = appo.details
      self.edit = true
      self.phone=appo.phone
      self.updateAppointmentId = id
      self.appointment_notes = appo.note
      }, 1);
  };
  var services = this.storage.getCatalog()
  var color = 10000
  for (let service_el of services){
    if (service_el.id == service){
      color = service_el.color
    }
  }
    div.draggable =true
    div.classList.add('task','task--primary', `c${color}`) 
    div.id= id
    div.style.height =div_height
    div.ondragover=this.allowDrop
    div.ondrop=this.drop
    
    // div.style.top = "15px"
    var hour1=this.rows[start]
    var hour2 = this.times[this.times.indexOf(hour1)+height]
    var div_resize = document.createElement('div');
  div_resize.classList.add('bot-drag')
  var m_pos;
  let mod_div 
  let initial_h
  var res =false
  async function resize(e){
      // var mod_div = await document.getElementById(id)
      var dy = e.y - m_pos;
      // m_pos = e.y;
      // console.log(dy%20,(Math.floor(dy/20)))
      // mod_div.style.height = initial_h
      // if (dy%20>10){
        mod_div.style.height = initial_h +dy +'px'
      // }
      // mod_div.style.height = initial_h +(Math.floor(dy/20)) *20 +'px'
      // mod_div.draggable =true
      // mod_div.style.zIndex = "1"
      // console.log( initial_h + dy)
  }

  div_resize.addEventListener("mousedown", async function(e){
    res =true
      m_pos = e.y;
      mod_div = await document.getElementById(id)
      mod_div.draggable =false
      initial_h =  parseInt(mod_div.style.height.slice(0, -2))
      document.addEventListener("mousemove", resize, false);
  }, false);
  document.addEventListener("mouseup", async function(){
    if(res){
    mod_div.draggable =true
    var hei = parseInt(mod_div.style.height.slice(0, -2))
    var appo: any = await self.storage.getAppointmet(id)
    if(hei%20>10){
      mod_div.style.height  = Math.ceil(hei/20)*20 +'px'
      hour2 = self.times[self.times.indexOf(hour1)+Math.ceil(hei/20)]
      mod_div.innerHTML =`<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id=${id} >${client_name}</div>`
      div.appendChild(div_resize)
      start = self.rows.indexOf(hour1)
      end = self.rows.indexOf(hour1) + self.times.indexOf(hour2)- self.times.indexOf(hour1)
      self.api.updateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note).subscribe(async data =>{
        Notiflix.Notify.Success('Modifiche salvate con successo');
        await self.storage.dragUpdateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note)
      },err =>{
        console.log(err)
       })
    }else{
      mod_div.style.height  = Math.floor(hei/20)*20+'px'
      hour2 = self.times[self.times.indexOf(hour1)+Math.floor(hei/20)]
      mod_div.innerHTML =`<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id=${id} >${client_name}</div>`
      div.appendChild(div_resize)
      start = self.rows.indexOf(hour1)
      end = self.rows.indexOf(hour1) + self.times.indexOf(hour2) - self.times.indexOf(hour1)
      self.api.updateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note).subscribe(async data =>{
        Notiflix.Notify.Success('Modifiche salvate con successo');
        await self.storage.dragUpdateAppointment(id, start, end,  appo.day, appo.month, appo.year, appo.client_name, appo.phone, appo.details, appo.employee, appo.service_n, appo.note)
      },err =>{
        console.log(err)
       })
    }
    // setTimeout(() => {
    //   self.point.disp = 'none'
    // }, 1); 
      document.removeEventListener("mousemove", resize, false);
      res=false
    }
  }, false);
    // <div><img src='../assets/icons/info.svg'></div>
    div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
                    <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
                    <div class="task-name" id=${id} >${client_name}</div>`;//60 is the height of the cell 16 is 2 times the verical padding (8px)
    div.appendChild(div_resize)
    if(this.week[6]<this.week[0]){1
      if(day<7){
        if (this.today==day && this.month==month &&  this.year==year){
          document.getElementById((start+1)+"-"+employee).append(div)
          }
      }else{
        
        if (this.today==day &&  this.month-1==month &&  this.year==year){
          document.getElementById((start+1)+"-"+employee).append(div)
          }
      }}
      
    if (this.today==day && this.month==month &&  this.year==year){
    document.getElementById((start+1)+"-"+employee).append(div)
    }
    
    }   
fullScreen(){
  if (screenfull.isEnabled && this.full_screen ==false) {
    screenfull.request();
    this.full_screen =true
  }else{
    if (screenfull.isEnabled) {
      this.full_screen =false
      screenfull.exit();
    }
  }
  
} 
async displayWeek(set_week){
  if(set_week){
    this.OneView=false
    this.display ='week'
    this.getAppoitments()
  }else{
    var now = new  Date()
    var today = now.getDay() -1
    var month = now.getMonth()
    this.month = month
    var day_number = now.getDate()
    this.week=[]
    if (today == -1){
      today= 6
    }
    for (let i=0;i<7;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
      this.week.push(day)
    }
    if(this.week[6]<this.week[0] && day_number>20){
    this.month = month+1
    this.month_name=this.months_names[month+1]
  }
  else{
    this.month = month
    this.month_name=this.months_names[month]
  }
  this.OneView=false
  this.display ='week'
  // dispaly the closed hours
  // this.storage.setHomeReference(this)
    
      this.getAppoitments()
  }
}
notes(){
}
displayMonth(){
  this.display ='month'
}
get myMethodFunc() {
  return this.setWeek.bind(this);
}
setWeek(week, month, year){
  this.week = week
  this.month = month
  this.month_name = this.months_names[month]
  this.year = year
  var paras = document.getElementsByClassName('task');
  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  } ​
  this.displayWeek(true)
}
setStoreserviceDefault(){
  this.api.setStoreserviceDefault().subscribe(data=>{
    console.log(data)
  },err=>{
    console.log(err)
  })
}
pickerApoointment(){
  var now =new Date(this.date_picker)
  var hour:any = now.getHours()
  var min:any = now.getMinutes()
  var day = now.getDate()
  var month = now.getMonth()
  var year = now.getFullYear()
  if (min<10){
    min="0"+min.toString()
  }
  if (hour<10){
    hour="0"+hour.toString()
  }
  var start = this.rows.indexOf(`${hour}:${min}`)
  if (this.info == -1){
    this.setAppoitment(start, start+(this.time-1), day, month, year, this.nome ,this.phone, this.extra_desc,this.selected, this.info)
  }
  else{
    var services = this.storage.getCatalog()
    var serv
    for(let service of services){
      if (service.id ==  this.info){
        serv= service
      }
    }
    this.setAppoitment(start, start+Number(serv.duration_book) , day, month, year, this.nome , this.phone,serv.name,this.selected, this.info)
  }
  this.bgModalDisp = 'none'
}
async freeSpots(){
  this.spot_show = 'block'
  this.availableSpots=[]
  this.selected 
  var timetables = this.storage.getEmployeehours()
  var work_hours:any
  for (let timetable of timetables){
    // if(timetable.id == this.selected ){
      work_hours = timetable.timetable
      var list:any =[]
      for (let day of work_hours){
        // if(day_of_week == day.wkday){
          var start = this.times.indexOf(this.rows[day.start])
          var end =  this.times.indexOf(this.rows[day.end])
          for (var i = start; i <= end; i++) {
            list.push({time: i  , employee: day.employee, day: day.wkday, name:timetable.name });
          }
        // }
      }
      this.free_hours =list
      var self = this
      for(let appointment of this.appointmentlist){
        var start = this.times.indexOf(this.rows[appointment.start])
        var end = start+appointment.end -  appointment.start        
        this.free_hours = this.free_hours.filter(function(value, index, arr){ return (value.time < start && appointment.employee==value.employee  )|| (value.time  >= end && appointment.employee==value.employee ) || appointment.employee!=value.employee || self.week.indexOf(appointment.day)!=value.day; })
      } 
      var app
      for(let idx in this.free_hours){
      
          let id:any = idx
          var length =this.free_hours.length-1
          if(id ==0  ||this.free_hours[id-1].time-this.free_hours[id].time<- 1 || id == length||this.free_hours[id].time<this.free_hours[id-1].time ){
            if (app != undefined){
              if(app.duration>=3){
                if (this.free_hours[id].time<this.free_hours[id-1].time){
                  app.duration -=1 
                  this.availableSpots.push(app)
                }else{
                  this.availableSpots.push(app)
                }
               
              }
               
            }
            if(this.rows.indexOf(this.times[this.free_hours[id].time])!=-1){
              app = {start: this.free_hours[id].time, duration: 1, employee:this.free_hours[id].employee, day: this.free_hours[id].day, name:this.free_hours[id].name} 
            }
          }else{
              app.duration +=1
          }
       
        }
        this.availableSpots.sort(function(a, b) {
          return a.employee - b.employee;
        });
}

  // console.log(this.availableSpots)
  // }
}
groupBy(arr, property) {
  return arr.reduce(function(memo, x) {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}
nextWeSpots(){
    //remove last week appoitments
    if(this.OneView){
      if(this.today<this.months_days[this.month]){
        this.today+=1
      }else{
        if(this.month!=11){
          this.today = 1
          this.month+=1
        }else{
          this.today = 1
          this.month=1
          this.year=+1
        }
       
      }
      var last_week = this.week
      this.week=[]
      // console.log(this.year,this.month, this.today, this.week)
      var now = new  Date(this.year,this.month, this.today)
      var today = now.getDay() -1
      var month = now.getMonth()
      var day_number = now.getDate()
      // console.log(this.year,this.month, this.today, this.week, today, month,day_number)
      if (today == -1){
        today= 6
      }
      for (let i=0;i<7;i++){
        if( day_number - today  + i<= this.months_days[month]){
          var day = day_number - today  + i
          if(day<1){
          day= day +this.months_days[month-1]
          }
        }else{
          var day = day_number - today  + i - this.months_days[month]
        }
        this.week.push(day)
      }
    //   if(this.week[6]<this.week[0] && day_number>20){
    //   this.month = month+1
    //   this.month_name=this.months_names[month+1]
    // }
    // else{
      this.month = month
      this.month_name=this.months_names[month]
    // }
    // console.log(this.week[6]+1,this.week[6], this.today)
      this.goToday(this.week[0]!=last_week[0])
     
    } else{
    var paras = document.getElementsByClassName('task');
    while(paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    } ​
    setTimeout(async () => {
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
    await this.getAppoitments()
    setTimeout(() => {
      this.freeSpots()
    }, 800);
  }, 100);
  
  }

}
pastWeSpots(){
  //remove last week appoitments
  if(this.OneView){
    if(this.today>1){
      this.today-=1
    }else{
      if(this.month!=0){
        this.month= this.month-1
        this.today = this.months_days[this.month]
      }else{
        this.today = 31
        this.month=11
        this.year=-1
      }
     
    }
    var last_week = this.week
    this.week=[]
    var now = new   Date(this.year,this.month, this.today)
    var today = now.getDay() -1
    var month = now.getMonth()
    var day_number = now.getDate()
    if (today == -1){
      today= 6
    }
    for (let i=0;i<7;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
      this.week.push(day)
    }
    this.goToday(this.week[0]!=last_week[0]) //pass true or false
  

   
  } else{
  var paras = document.getElementsByClassName('task');
  while(paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  } ​
  //change dates
  setTimeout(async () => {
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
  await this.getAppoitments()
    setTimeout(() => {
      this.freeSpots()
    }, 800);
  }, 100);
  
}
}    
}


