import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  year 
  month 
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  month_displayed 
  months_days
  first_day 
  last_month_days 
  current_month_days 
  next_month_days 
  toast_text=''
  date_phone =false
  service_phone = false
  time_phone = false
  first_name = ''
  last_name = ''
  username = ''
  email = ''
  sex = 'm'
  phone = ''
  password =''

  first_name_err=''
  last_name_err=''
  username_err= ''
  email_err= ''
  phone_err= ''
  password_err=''
  error= ''
  employees_list:any=[]

  list_appointments=[]
  cal='none'
  formType='Register'
  toastx='none'
  register_form='none'
  logout_displ='none'
  today
  openhours
  availableSpots= []
  spots='none'
  ser='none'
  service:any 
  selected_date='Seleziona data'
  selected_hour
  displ_hour='Seleziona ora'
  selected_service='Seleziona servizio'
  services:any = []
  user:any= {first_name:'', last_name:''}
  times =["06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    var now = new Date()
    this.today = now.getDate()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    this.month_displayed = this.months_names[this.month]
    this.months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.first_day = new Date(this.year, this.month, 1).getDay()
    this.last_month_days = Array(this.first_day-1).fill('*')
    this.current_month_days = Array(this.months_days[this.month]).fill(0).map((x,i)=>i+1);
    this.next_month_days = ((this.last_month_days.length+this.current_month_days.length)%7==0) ? [] : Array(7-((this.last_month_days.length+this.current_month_days.length)%7))
    this.getServices()
    if(this.api.isvalidToken()){
      this.api.getUser().subscribe(data=>{
        this.user = data
      },err=>{
        console.log(err)
      })
    }
    this.api.getEmployeesfromshop(1).subscribe(data=>{
      for(let user of data){
        this.api.getSpecificUser(user.employee).subscribe(data=>{
          this.employees_list.push(data)
        },err=>{
          console.log(err)
        })
      }
    },err=>{
      console.log(err)
    })
  }
  nextMonth(){
    if  (this.month==11){
          this.month=0
          this.year +=1
    }
    else{
          this.month +=1
    }
    this.month_displayed = this.months_names[this.month]
    this.first_day = new Date(this.year, this.month, 1).getDay()
    this.last_month_days = Array(this.first_day-1).fill('*')
    this.current_month_days = Array(this.months_days[this.month]).fill(0).map((x,i)=>i+1);
    this.next_month_days = ((this.last_month_days.length+this.current_month_days.length)%7==0) ? [] : Array(7-((this.last_month_days.length+this.current_month_days.length)%7))
  }
  pastMonth(){
    if  (this.month==0){
          this.month=11
          this.year -=1
    }
    else{
          this.month -=1
    }
    this.month_displayed = this.months_names[this.month]
    this.first_day = new Date(this.year, this.month, 1).getDay()
    this.last_month_days = Array(this.first_day-1).fill('*')
    this.current_month_days = Array(this.months_days[this.month]).fill(0).map((x,i)=>i+1);
    this.next_month_days = ((this.last_month_days.length+this.current_month_days.length)%7==0) ? [] : Array(7-((this.last_month_days.length+this.current_month_days.length)%7))
  }
  selectDate(day){
    this.selected_date = `${day} ${this.months_names[this.month]} ${this.year}`
    this.today =day
    this.cal='none'
    this.displ_hour='Seleziona ora'
    this.getAppointments(day)
    this
  }
  selectHour(hour){
    this.selected_hour  = hour
    this.displ_hour = this.times[hour.start]
   
    this.spots ='none'
  }
  selectService(service){
    this.service=service
    this.selected_service  =service.name
    this.displ_hour='Seleziona ora'
    this.ser ='none'
    // this.service_phone = false
    // this.date_phone= true
    if(this.selected_date != 'Seleziona data'){
      this.getAppointments(this.today)
    }
  }
  getServices(){
    this.api.getStoreservice().subscribe(
      data=>{
        this.services =  data
      err=>{
        console.log(err)
      }
    })
  }
  getAppointments(day){
    // this.register_form="none"
    var date = new Date(this.year, this.month, day)
    var week = this.getWeekNumber(date)
    this.list_appointments=[]
    this.api.getStoreAppointments(week,2).subscribe(
      data=>{
       var appointments =  data
       for (let appointment of appointments){
         if (day == appointment.day){
          this.list_appointments.push(appointment)
         }
       }
        this.calculateAvailability(date)
      err=>{
        console.log(err)
      }
    })
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
  calculateAvailability(date){
    Notiflix.Block.Standard('.bookings-time', 'Verificando la disponibilità...');
    var day_of_week = date.getDay()
    this.availableSpots=[]
    this.api.getemployeeHours().subscribe(
      data=>{
        var days =  data
        var list = [];
        var app
        for (let day of days){
          if(day_of_week == day.wkday){
            var start = this.times.indexOf(this.rows[day.start])
            var end =  this.times.indexOf(this.rows[day.end])
            for (var i = start; i <= end; i++) {
              list.push({time: i  , employee: day.employee });
            }
          }
        }
        this.openhours = list
       
        for(let appointment of this.list_appointments){
          var start = this.times.indexOf(this.rows[appointment.start])
          var end = start+appointment.end -  appointment.start
          this.openhours = this.openhours.filter(function(value, index, arr){ return (value.time < start && appointment.employee==value.employee )|| (value.time  >= end && appointment.employee==value.employee ) || appointment.employee!=value.employee})
        } 
        var max_ind = this.openhours.length-1
        for(let idx in this.openhours){
          let id:any = idx
          if(id ==0 || id == max_ind || this.openhours[id].time-this.openhours[id-1].time> 1  || this.openhours[id].employee-this.openhours[id-1].employee!= 0 ||  app.duration == this.service.duration){
            if (app != undefined){
              if(app.duration>= this.service.duration){
                this.availableSpots.push(app)
              }
            }
            app = {start: this.openhours[id].time, duration: 1, employee:this.openhours[id].employee}
         
          }else{
              app.duration +=1
          }
        }
        this.availableSpots.sort(function(a, b) {
             return a.start - b.start;
          });
          Notiflix.Block.Remove('.bookings-time');
  
    }, err=>{
      console.log(err)
      Notiflix.Block.Remove('.bookings-time');
    })
  }
  SendBooking(type){
    if(type=='register'){
      this.submit()
    }else{
      this.login()
    }
  }
  phoneBook(){
    window.location.href= window.location.href="https://apps.apple.com/app/id1490126275"
  }
  book(){
    if (this.selected_date!='Seleziona data' &&  this.displ_hour!='Seleziona ora' && this.service !=''){
      if(this.api.isvalidToken()){
        var client_name = this.user.first_name+' '+ this.user.last_name
        var start = this.rows.indexOf(this.times[this.selected_hour.start])
        var end = start + this.service.duration
        this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone, this.service.name, this.selected_hour.employee, this.service.id,1).subscribe(data=>{
          this.toast_text= "Prenotazione andata a buon fine"
          this.toastx="block"
          Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
          this.selected_date='Seleziona data'
          this.displ_hour='Seleziona ora'
          this.selected_service='Seleziona servizio'
        setTimeout(() => {
          this.toastx="none"
        }, 3000);
        console.log(data)},
        err=>{
          Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
          console.log(err)
      })
      }else{
        this.register_form="block"
      }
     
    }else{
        this.toast_text= " I dati inseriti non sono sufficenti"
        this.toastx="block"
        setTimeout(() => {
          this.toastx="none"
        }, 3000);
    }
  }
  submit(){
    //aggiungi loading icon
    this.first_name_err = ''
    this.last_name_err = ''
    this.email_err = ''
    this.phone_err = ''
    this.password_err = ''

    if(this.first_name== ''){
      this.first_name_err = 'Inserisci il tuo nome'
    }
    if(this.last_name== ''){
      this.last_name_err = 'Inserisci il tuo cognome'
    }
    if(this.email== ''){
      this.email_err = 'Inserisci la tua email'
    }
    if(this.phone== ''){
      this.phone_err = 'Inserisci il tuo numero di telefono'
    }
    if(this.password== ''){
      this.password_err = 'Inserisci una password'
    }
    if(this.first_name_err == '' && this.last_name_err == '' &&  this.email_err == '' && this.phone_err == '' && this.password_err == ''){
      
      this.api.register(this.first_name, this.last_name,  this.email, this.sex, this.phone, this.password).subscribe(
        data=>{
          this.api.storeToken(data.token)
          var client_name = this.first_name+' '+this.last_name
          var start = this.rows.indexOf(this.times[this.selected_hour.start])
          var end = start + this.service.duration
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone, this.service.name, this.selected_hour.employee, this.service.id, 1).subscribe(data=>{
          this.register_form='none'
          this.user.first_name=this.first_name
          this.user.last_name=this.last_name
          Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');},
          err=>{
            Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connesione o prova a cambaire orario', 'Annulla');
            console.log(err)
        })
        },
        err => {
          if (err.error.email != undefined){
            this.email_err = 'Questa email è già stata utilizzata'
          }
          if (err.error.password != undefined){
            this.password_err = 'Questa password è troppo semplice. Prova ad aggiungere dei numeri'
          }
          console.log(err.error.password)
          console.log(err.error,'err')
        }
      )
    }
  }
  login(){
    this.error=''
    this.api.login(this.email,this.password).subscribe(
      data=>{
        this.api.storeToken(data.token)
        this.api.getUser().subscribe(data=>{
          this.user = data
          var client_name = this.user.first_name+' '+this.user.last_name
          var start = this.rows.indexOf(this.times[this.selected_hour.start])
          var end = start + this.service.duration 
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone, this.service.name, this.selected_hour.employee, this.service.id,1).subscribe(data=>{
          this.register_form='none'
          Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
        },
          
          err=>{
            Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connesione o prova a cambaire orario', 'Annulla');
            console.log(err)})
        },err=>{
          Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connesione e riprova', 'Annulla');
          console.log(err)
        })
      },
      err => {
        this.error = 'La password o la email che hai inserito non sono valide'
        console.log(err.error,'err')
      }
    )
  }

  logout(){
    this.user= {first_name:'', last_name:''} 
    this.api.deleteAllData()
    Notiflix.Report.Success("Il logout è stato effetuato", '', 'OK');
  }
  goHome(){
    this.router.navigateByUrl('')
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events

  onScroll($event){
    var page1 = document.getElementById('page-1').getBoundingClientRect().top 
    var page2 = document.getElementById('page-2').getBoundingClientRect().top 
    var page3 = document.getElementById('page-3').getBoundingClientRect().top 
    // var page4 = document.getElementById('page-4').getBoundingClientRect().top 
console.log(page1, page2, page3)
    if (page1<600 && page1>80 ){
      var old = document.getElementsByClassName('current')
      old[0].classList.remove("current")
       document.getElementsByClassName('page-1')[0].classList.add("current")
    }else{
      if (page2<600  && page2>80 ){
        var old = document.getElementsByClassName('current')
        old[0].classList.remove("current")
         document.getElementsByClassName('page-2')[0].classList.add("current")
      }else{
        if (page3<600  && page3>80 ){
          var old = document.getElementsByClassName('current')
          old[0].classList.remove("current")
           document.getElementsByClassName('page-3')[0].classList.add("current")
        }
        // else{
        //   if (page4<600  && page4>80 ){
        //     var old = document.getElementsByClassName('current')
        //     old[0].classList.remove("current")
        //      document.getElementsByClassName('page-4')[0].classList.add("current")
        //   }
        // }
      }
    }
    
    
    
  }
  navBox(id){
  var link = document.getElementsByClassName(id)
  var old = document.getElementsByClassName('current')
  old[0].classList.remove("current")
  link[0].classList.add("current")
  const yOffset = -160; 
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}
}
