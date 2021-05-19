
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router, NavigationStart } from '@angular/router';
import *  as screenfull from 'screenfull'
import { Title } from '@angular/platform-browser';
// import { ControlStateMixin } from '@vaadin/vaadin-control-state-mixin';
import { Appointment } from '../services/appointment.model';
import Notiflix from "notiflix";
import { textChangeRangeIsUnchanged } from 'typescript';


declare var Pusher


@Component({
  selector: 'app-display-cal',
  templateUrl: './display-cal.component.html',
  styleUrls: ['./display-cal.component.scss']
})
export class DisplayCalComponent implements OnInit {

  constructor(private api: ApiService, private storage: StorageService, private router: Router ,private titleService: Title) {
    this.titleService.setTitle( "Prenota: Agenda online - Il tuo gestionale");
    this. router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        clearInterval(this.interval)
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
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
  year = new Date().getFullYear()
  months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month 
  month_name 
  nome=""
  info=101010
  time = 12
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
  recurring
  availableSpots:any=[]
  spot_show = 'none'
  timetables
  openlist = [[],[],[],[],[],[],[],]
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  columns= ["Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato","Domenica"] 
  giorni=["Domenica","Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato"] 
  oneviewDay
  // grid=[]
  new_customer_modal_top='-200px'
  new_customer_name=''
  new_customer_id
  point= {
    disp: "none",
    left: "0px",
    top: "0px",

  }
  m_initial
  m_final
  interval
  _loading=false
  store_clients
  show_client
  left_contact='-20vw'
  client_id
  client
  storeUseCredits =false
  to_be_payed=false
  table_line_heigth =60
  quarter_displ =true
  
  five_displ =false
  table_font_size = 12
  recurring_quantity=10
  show_recurring=false
  adons 
  serviceadons
  adons_to_show=[]
async ngOnInit() {
  var store_info = await JSON.parse( await localStorage.getItem('shop_data'))
  if(store_info.custom_size){
    this.table_line_heigth =store_info.table_line_heigth
    this.quarter_displ = store_info.quarter_displ
    this.five_displ = store_info.five_displ
    this.table_font_size = store_info.table_font_size
  }
  var root = document.documentElement;
  root.style.setProperty('--cell-height', this.table_line_heigth +'px' );
  root.style.setProperty('--cell-font-size',  this.table_font_size+'px');
  if(this.quarter_displ){
    if(!this.five_displ){
      for(let ind in this.times){
        var el
        if((+ind)%3!=1){
          el = document.getElementById(ind)
          if(el!=null){
            el.style.display='none'
          }
         
        }
      }
    }
  }else{
    for(let ind in this.times){
      if(+ind%6!=1){
        document.getElementById(ind).style.display='none'
      }
    }
  }
  setTimeout(()=>{
    var pusher = new Pusher('45f982633227395f42a9', {
      cluster: 'eu'
    });
  
    var socekt_name = store_info.store_name.replaceAll(' ','-')
    var channel = pusher.subscribe(socekt_name);
    channel.bind('become-costumer', (data)=> {
      this.new_customer_modal_top='24px'
      this.new_customer_name=data.message
      this.new_customer_id = data.id
    });
    channel.bind('update-costumer', async (data)=> {
      var client_list = await JSON.parse( localStorage.getItem('client_list'))
      var client = client_list.list.filter(value=>{return value.id == +data.client_id})
      client[0].client=data.id
      await this.storage.updateClient(client[0])
      var client_list = await JSON.parse( localStorage.getItem('client_list'))
      this.store_clients = client_list.list
      for(let el of this.store_clients ){
        el.client_name = el.client_name.toLowerCase()
      }
      Notiflix.Notify.Success("L'account di "+ client[0].client_name+" è stato collegato");
    });
  },1000)
  

  
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
        if(this.month==0){
          day= day +this.months_days[11]
        }else{
          day= day +this.months_days[month-1]
        }
   
      }
    }else{
      var day = day_number - today  + i - this.months_days[month]
    }
    this.week.push(day)
  }
  if(this.week[6]<this.week[0] && day_number>20){
    if(this.month == 11){
      this.month = 0
      this.month_name=this.months_names[0]
    }else{
      this.month = month+1
      this.month_name=this.months_names[month+1]
    }
    }
  
else{
  this.month = month
  this.month_name=this.months_names[month]
}

// dispaly the closed hours
this.timetables = await this.storage.getEmployeehours()
if(this.timetables==0 || this.timetables[0].timetable.length == 0){
  
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
      this.storage.setCatalog(service.id, service.name, service.duration, service.duration_book, service.price, service.max_n, service.color)
    }
  },err=>{
    console.log(err)
  })
}
// this.storage.setHomeReference(this)

  if (this.timetables.length>0){
    for (let hour of this.timetables[0].timetable){
      this.openlist[hour.wkday].push(hour.start_t)
      this.openlist[hour.wkday].push(hour.end_t)      
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

  this.interval = setInterval(()=>{
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
      if(this.month==0){
        week = this.getWeekNumber(new Date(this.year, 11, this.week[0]))
      }else{
        week = this.getWeekNumber(new Date(this.year, this.month-1, this.week[0]))
      }
     
  }else{
    week = this.getWeekNumber(new Date(this.year, this.month, this.week[0]))
  }
  }

  this.api.getAppointments(week).subscribe(async (data)=>{
    var just_downloaded_appo: any = []
       just_downloaded_appo = await data
       var just_downloaded_copy =just_downloaded_appo
      var copy_appo_list = this.appointmentlist
      for(let el of this.appointmentlist){
        just_downloaded_appo = just_downloaded_appo.filter((value, index, arr)=>{ return (value.id != el.id) })
     
        }
        for(let appo of just_downloaded_appo){
          this.appointmentlist.push(appo)
        //  add one view
          this.drawAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note,appo.payed )
        
        }
      
        for(let el of just_downloaded_copy){
          copy_appo_list = copy_appo_list.filter((value, index, arr)=>{ return (value.id != el.id) })
       
          }
          for(let appo of copy_appo_list){
            var no_longer_exist = document.getElementById(appo.id);
            no_longer_exist.parentNode.removeChild(no_longer_exist);
            this.appointmentlist =this.appointmentlist.filter((value, index, arr)=>{ return (value.id != appo.id) })
            } ​
          
    })
   
    
  },120000)
    let use_credits = JSON.parse( localStorage.getItem('shop_data'))
    this.storeUseCredits =use_credits.credits

  setTimeout(() => {
    this.api.getStoreClients().then((data)=>{
      this.store_clients =data  
      for(let el of this.store_clients ){
        el.client_name = el.client_name.toLowerCase()
      }
      this.show_client = this.store_clients.slice(0, 15) 

    }).catch((err)=>{
      console.log(err)
      Notiflix.Notify.Failure("C'è stato un problema nel caricate i tuoi clienti");
    })
  }, 1000);
  this.adons = await this.storage.getAdons()
  this.serviceadons = await this.storage.getServiceAdons()
  
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

closeModal(){
    document.getElementById( this.currentBlock.row+"-"+ this.currentBlock.col).style.backgroundColor = 'transparent'
    this.point.disp = "none"

}




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
      if(this.month==0){
        week = this.getWeekNumber(new Date(this.year, 11, this.week[0]))
      }else{
        week = this.getWeekNumber(new Date(this.year, this.month-1, this.week[0]))
      }
     
  }else{
    week = this.getWeekNumber(new Date(this.year, this.month, this.week[0]))
  }
  }
  
  // usa un last check 10minutes per risparmiare server
  var now = + new Date()
  // if ((now - this.time_passed )>60000){
    this.api.getAppointments(week).subscribe(


      data=>{
        this.appointmentlist= data
        this.time_passed = + new Date()
        if (this.appointmentlist.length != 0){
          if(this.OneView){
            for (let appo of this.appointmentlist){
              this.drawEmploAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year, appo.payed  )
              // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
              // this.storage.updateAppointment(appo.id, appo.start, appo.end, appo.day , appo.month, appo.year, appo.client_name, appo.phone, appo.details,  appo.employee, appo.service_n,true, appo.note)
            }
          }else{
            for (let appo of this.appointmentlist){
              this.drawAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note, appo.payed )
              // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
              // this.storage.updateAppointment(appo.id, appo.start, appo.end, appo.day , appo.month, appo.year, appo.client_name, appo.phone, appo.details,  appo.employee, appo.service_n,true, appo.note)
            }
          } 
        }
        else{console.log('empty_data')}
      },
      err => {
        Notiflix.Notify.Failure('Connessione assente');
        this.appointmentlist=[]
        this.appointmentlist = this.storage.getAllAppointmets()
        for (let appo of this.appointmentlist){
          this.drawAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note, appo.payed  )
          // this.drawfadedAppointment(appo.id, appo.start, appo.end, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year )
        }
       
      }
    )
}


nextWeek(){
  if(this.week[0]==28 && this.month ==0 ){
    this.year=2021
  }
  //remove last week appoitments
  if(this.OneView){
    this.oneviewDay = (this.oneviewDay+1)%7

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
  if(this.week[0]<=7 && this.month ==0 ){
    this.year=2020
  }
  this.oneviewDay = (this.oneviewDay+6)%7

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


async activetab(employee){
  var paras = document.getElementsByClassName('task');
  

  while(paras[0]) {
    
    paras[0].parentNode.removeChild(paras[0]);
  } ​
  this.selected = employee.id
  
  var work_hours:any
  for (let timetable of this.timetables){
    if(timetable.id == employee.id){
      work_hours = timetable.timetable
    }
  }
  this.openlist = [[],[],[],[],[],[],[],]
  for (let hour of work_hours){
    this.openlist[hour.wkday].push(hour.start)
      this.openlist[hour.wkday].push(hour.end)      
  }
  // console.log(this.appointmentlist)
  if (this.appointmentlist.length != 0){

    if(this.OneView){
      for (let appo of this.appointmentlist){
        this.drawEmploAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year, appo.payed  )
      }
    }else{
      for (let appo of this.appointmentlist){        
        this.drawAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year,appo.note, appo.payed )
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
   this.oneviewDay =  date.getDay()

    this.year = date.getFullYear()
 }
 this.OneView = true
  if(new_week){
    setTimeout(() => {
      setTimeout(async () => {
        if(this.quarter_displ){
          if(!this.five_displ){
            for(let ind in this.times){
              var el
              if((+ind)%3!=1){
                el = document.getElementById(ind)
                if(el!=null){
                  el.style.display='none'
                }
               
              }
            }
          }
        }else{
          for(let ind in this.times){
            
            if(+ind%6!=1){
              document.getElementById(ind).style.display='none'
            }
          }
        }
        // this.appointmentlist = await this.storage.getAppointmets(true)
      for (let appo of this.appointmentlist){
        this.drawEmploAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year, appo.payed )
      }
    }, 100);
      this.getAppoitments()
    }, 50);
  }else{
    setTimeout(async () => {
      if(this.quarter_displ){
        if(!this.five_displ){
          for(let ind in this.times){
            var el
            if((+ind)%3!=1){
              el = document.getElementById(ind)
              if(el!=null){
                el.style.display='none'
              }
             
            }
          }
        }
      }else{
        for(let ind in this.times){
          
          if(+ind%6!=1){
            document.getElementById(ind).style.display='none'
          }
        }
      }
      // this.appointmentlist = await this.storage.getAppointmets(true)
    for (let appo of this.appointmentlist){
      this.drawEmploAppointment(appo.id, appo.start_t, appo.end_t, appo.details, appo.client_name, appo.employee, appo.service_n, appo.day ,appo.week, appo.month, appo.year, appo.payed )
    }
  }, 100);
  }

  
}

drawAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year,note,payed ){
  var height = end - start
  if(this.quarter_displ){
    var div_height = (height*this.table_line_heigth/3)+'px'
    if(this.five_displ){
      var div_height = (height*this.table_line_heigth)+'px'
    }
  }else{
  
      var div_height = (height*this.table_line_heigth/6)+'px'
    
    
  }
  
  var div = document.createElement('div');
  
  var has_note = false
  if(note!='' && note!=null){
    has_note = true
  }
  var self = this
  var appo 
  
  // console.log(client_name, day ,week, month, year )

var services = this.storage.getCatalog()
var color = 10000
for (let service_el of services){
  if (service_el.id == service){
    color = service_el.color
  }
}
if(service==-1){
  var color = 6
}
  
  div.classList.add('task','task--primary', `c${color}`) 
  div.id= id
  div.style.height =div_height

  var hour1=this.times[start]
  var hour2 = this.times[end]
  
 
  
  if(has_note){
    if(payed){
      div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2} <img src='../assets/icons/info.svg'></div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id='${id}-name' >${client_name}   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-selector="TRANSACTION.STATUS_ICON" class="e1mbu2mn9 css-17kcjw3-StyledIconSuccess-StyledStatusIcon-StyledStatusIcon ewhta3v0"><path d="M8.183 12.684l2.572 2.571 5.142-6.428" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`//60 is the height of the cell 16 is 2 times the verical padding (8px)
    }else{
      div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2} <img src='../assets/icons/info.svg'></div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id='${id}-name'>${client_name}  </div>`//60 is the height of the cell 16 is 2 times the verical padding (8px)
    }
   
  }else{
    if(payed){
      div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id='${id}-name'>${client_name}  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-selector="TRANSACTION.STATUS_ICON" class="e1mbu2mn9 css-17kcjw3-StyledIconSuccess-StyledStatusIcon-StyledStatusIcon ewhta3v0"><path d="M8.183 12.684l2.572 2.571 5.142-6.428" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`//60 is the height of the cell 16 is 2 times the verical padding (8px)
    }else{
      div.innerHTML = `<div class="task-duration" id=${id}>${hour1}-${hour2}</div>
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id='${id}-name' >${client_name}  </div>`//60 is the height of the cell 16 is 2 times the verical padding (8px)
    }
   
  }
  var to_append = undefined
  if(this.week[6]<this.week[0]){
    if(day<7){
      if(this.month==0){
        if (this.week.indexOf(day)>=0 && this.selected ==employee){
          to_append =document.getElementById((start+1)+"-"+this.week.indexOf(day))
          if(to_append!=null && to_append!=undefined){
            to_append.append(div)
          }
          }
      }
      if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month, day)) == week && this.year ==year && this.selected ==employee){
        to_append = document.getElementById((start+1)+"-"+this.week.indexOf(day))

        if(to_append!=null && to_append!=undefined){
          to_append.append(div)
        }
        }
    }else{
      if(this.month==0){
        if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, 11, day)) == week && this.year ==year && this.selected ==employee){
          to_append =  document.getElementById((start+1)+"-"+this.week.indexOf(day))
          if(to_append!=null && to_append!=undefined){
            to_append.append(div)
          }
          }
      }
      if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month-1, day)) == week && this.year ==year && this.selected ==employee){
        to_append = document.getElementById((start+1)+"-"+this.week.indexOf(day))
        if(to_append!=null && to_append!=undefined){
          to_append.append(div)
        }
        }
    }}
  if (this.week.indexOf(day)>=0 && this.getWeekNumber(new Date(this.year, this.month, day)) == week  && this.year ==year && this.selected ==employee){
    to_append =document.getElementById((start+1)+"-"+this.week.indexOf(day))
  if(to_append!=null && to_append!=undefined){
    to_append.append(div)
  }
  }
  
  }  

  drawEmploAppointment(id, start, end, details, client_name, employee, service, day ,week, month, year,payed ){
    var height
    if(this.quarter_displ){
       height = (end - start)
       if(this.five_displ){
        height = (end - start)*3
       }
    }else{
       height = (end - start)/2
    }
    
    var div_height = ((height*7)-1)+'px'
    var div = document.createElement('div');
    div.style.zIndex='1'
    
    var self = this

  var services = this.storage.getCatalog()
  var color = 10000
  for (let service_el of services){
    if (service_el.id == service){
      color = service_el.color
    }
  }
  if(service==-1){
    var color = 6
  }
    div.draggable =true
    div.classList.add('task','task--primary', `c${color}`) 
    div.id= id
    div.style.height =div_height
   
    

    var hour1=this.rows[start]
    var hour2 = this.times[this.times.indexOf(hour1)+height]

    if(payed){
      div.innerHTML = `
      <!-- <div class="task-duration" id=${id}>${hour1}-${hour2}</div> -->
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id='${id}-name' >${client_name}  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" data-selector="TRANSACTION.STATUS_ICON" class="e1mbu2mn9 css-17kcjw3-StyledIconSuccess-StyledStatusIcon-StyledStatusIcon ewhta3v0"><path d="M8.183 12.684l2.572 2.571 5.142-6.428" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>`;//60 is the height of the cell 16 is 2 times the verical padding (8px)
    }else{
      div.innerHTML = `
      <!-- <div class="task-duration" id=${id}>${hour1}-${hour2}</div> -->
      <div class="task-details"[innerHTML]="" (click)='nextWeek()'id=${id}>${details} </div>
      <div class="task-name" id='${id}-name' >${client_name}  </div>`;//60 is the height of the cell 16 is 2 times the verical padding (8px)
    }
  
    // div.appendChild(div_resize)
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
  setTimeout(() => {
    if(this.quarter_displ){
      if(!this.five_displ){
        for(let ind in this.times){
          var el
          if((+ind)%3!=1){
            el = document.getElementById(ind)
            if(el!=null){
              el.style.display='none'
            }
           
          }
        }
      }
    }else{
      for(let ind in this.times){
        if(+ind%6!=1){
          document.getElementById(ind).style.display='none'
        }
      }
    }
  }, 200);
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

groupBy(arr, property) {
  return arr.reduce(function(memo, x) {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}


type(){  
  var x = this.nome.toLowerCase()
  this.show_client = this.store_clients.filter((val)=>{
    if(val.client_name.includes(x)){
      return val
    }
  })
}

capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};





}