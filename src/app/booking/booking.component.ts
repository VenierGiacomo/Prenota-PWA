import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';
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
  disabled_btn=false
  first_name_err=''
  last_name_err=''
  username_err= ''
  email_err= ''
  phone_err= ''
  password_err=''
  error= ''
  employees_list:any=[]

  cont = 0 
  active_services= []
  list_appointments=[]
  cal='none'
  formType='Register'
  toastx='none'
  register_form='none'
  logout_displ='none'
  hollidays = 'none'
  today
  openhours
  availableSpots= []
  spots='none'
  ser='none'
  service:any =[]
  selected_date='Seleziona data'
  selected_hour
  displ_hour='Seleziona ora'
  selected_service='Seleziona servizio'
  services:any = []
  employees_serivces
  total_service={name:'',duration:0,id:-1}
  user:any= {first_name:'', last_name:''}
  results_empl_serv:any=[]
  times =["06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  constructor(private api: ApiService, private router: Router, private titleService: Title) {
    this.titleService.setTitle( "Prenota: WellnesClinic - Medici sportivi. Prendi appuntamento onlines");
   }
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
    //  18 shop 31 owner
    this.api.getEmployeesfromshop(18).subscribe(data=>{
      this.employees_list =data
    },err=>{
      console.log(err)
    })
    this.api.getEmployeeservices(31).subscribe(data=>{
      this.employees_serivces = data
        },err=>{
          console.log(err)
        })
      //  this.api.getemployeeHoursNoLogin(31).subscribe(data=>{
      //   console.log(data)
      //     },err=>{
      //       console.log(err)
      //     })
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
  selectService(service,i){
    this.cont=0
    const index = this.service.indexOf(service);
    if (index > -1) {
      this.service.splice(index, 1);
    }else{
      this.service.push(service)
    }
    if(this.active_services[i][2]){
      this.active_services[i]=["#ffffff","#263b56",false,"#939999"]
    }else{
      this.active_services[i]=["#0061d5","#ffffff",true,"#ffffff"]
    }
    if(this.service.length==1){
      this.selected_service  =this.service[0].name
      this.cont=1
    }else{
      if(this.service.length==0){
        // if(this.selected_service=='Seleziona servizio'){
          this.selected_service  =' Seleziona servizio' 
      this.cont=0
        }else{
          for(let service of  this.active_services){
            if(service[0]==["#0061d5"]){
              this.cont=this.cont+1
            }
            }
          this.selected_service= `${this.cont} elementi selezionati`
        }    
    }
    this.displ_hour='Seleziona ora'
    if(this.selected_date != 'Seleziona data'){
      this.getAppointments(this.today)
    }
    if(this.cont==1){
      for(let ind in this.active_services){
        if (this.active_services[ind][2]){
          this.selected_service = this.services[ind].name
         
          this.total_service.id = this.services[ind].id
        }
      }
    } 
  }
  getServices(){
    this.active_services=[]
    this.api.getStoreserviceNoLogin(31).subscribe(
      data=>{
        this.services =  data
        for(let i=0;i< this.services.length;i++){
          this.active_services.push(["#ffffff", '#0061d5',false])
        }
      err=>{
        console.log(err,'storeserv')
      }
    })
  }
  getAppointments(day){
    // this.register_form="none"
    var date = new Date(this.year, this.month, day)
    var week = this.getWeekNumber(date)
    this.list_appointments=[]
    this.api.getStoreAppointments(week,31).subscribe(
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
    this.itsemploJob()
    Notiflix.Block.Standard('.bookings-time', 'Verificando la disponibilità...');
    this.total_service.duration=0
    this.total_service.name=''
        for(let service of this.service){
          this.total_service.duration = this.total_service.duration + service.duration
          if(this.service.indexOf(service) == this.service.length-1){
            this.total_service.name = this.total_service.name+service.name
          }else{
            this.total_service.name = this.total_service.name+service.name+' + '
          }
        }
    var day_of_week = date.getDay()-1
    if (day_of_week == -1){
      day_of_week= 6
    }
    this.availableSpots=[]
    this.api.getemployeeHoursNoLogin(31).subscribe(
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
          if(id ==0 || id == max_ind || this.openhours[id].time-this.openhours[id-1].time> 1  || this.openhours[id].employee-this.openhours[id-1].employee!= 0 ||  app.duration == this.total_service.duration){
            if (app != undefined){
              if(app.duration>=   this.total_service.duration){
                this.availableSpots.push(app)
              }
            }
            if(this.rows.indexOf(this.times[this.openhours[id].time])!=-1){
              app = {start: this.openhours[id].time, duration: 1, employee:this.openhours[id].employee}
            }
         
          }else{
              app.duration +=1
          }
        }
        this.availableSpots.sort(function(a, b) {
             return a.start - b.start;
          });
      this.availableSpots=[...new Set(this.availableSpots)]
      for(let ind in  this.availableSpots){
        var x:number = +ind
        // if(this.availableSpots[x]==this.availableSpots[x-1] || this.availableSpots[x]==this.availableSpots[x+1]){
        //   this.availableSpots.splice(x, 1);
        // }
        if(this.availableSpots.indexOf(this.availableSpots[x])!=x){
         
          this.availableSpots.splice(x, 1);
        }
        if(this.availableSpots.indexOf(this.availableSpots[x])!=x){
         
          this.availableSpots.splice(x, 1);
        }
      }
          Notiflix.Block.Remove('.bookings-time');
    }, err=>{
      console.log(err,'emplohours')
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
    var userAgent = navigator.userAgent || navigator.vendor ;
  if (/android/i.test(userAgent)) {
    window.location.href="http://play.google.com/store/apps/details?id=io.prenota.client"
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.href="https://apps.apple.com/app/id1523525291"
  }
  }
  itsemploJob(){
    this.results_empl_serv =[]
    var items = this.employees_serivces,
    grouped = [];

items.forEach(function (a) {
    this[a.employee] || grouped.push(this[a.employee] = []);
    this[a.employee].push(a);
}, Object.create(null));

    for(let service of this.service){
      for(let ind in grouped){
        if(this.results_empl_serv.length<grouped.length){
          this.results_empl_serv.push([grouped[ind].filter(function(value, index, arr){ return value.service_id == service.id})])
        }else{ 
          var x = grouped[ind].filter(function(value, index, arr){ return value.service_id == service.id})
          if(x.length != 0 ){
              this.results_empl_serv[ind].push(x)
          }
        }
      }
      console.log(this.selected_date, this.availableSpots, this.service)
    }
  }
  book(){
    this.disabled_btn=true
    if( this.today>26 && this.month==6 || this.today<3 && this.month==7){
      this.hollidays="block"
    }else{
      if (this.selected_date!='Seleziona data' &&  this.displ_hour!='Seleziona ora' && this.service !=''){
        if(this.api.isvalidToken()){
          var client_name = this.user.first_name+' '+ this.user.last_name
          var start = this.rows.indexOf(this.times[this.selected_hour.start])
          var end = start + this.total_service.duration
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id,18).subscribe(data=>{
            this.toast_text= "Prenotazione andata a buon fine"
            this.toastx="block"
            this.sendEmailConfirmation(this.user.email,this.user.first_name,this.user.last_name,this.today,this.months_names[this.month],this.year,this.times[this.selected_hour.start],this.total_service.name,"Wellness Clinic")
            Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
            this.selected_date='Seleziona data'
            this.displ_hour='Seleziona ora'
            this.selected_service='Seleziona servizio'
          setTimeout(() => {
            this.toastx="none"
            this.disabled_btn=false
          }, 3000);
          this.total_service={name:'',duration:0,id:-1}
          this.service=[]
          this.getServices()},
          err=>{
            Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
            console.log(err)
        })
        }else{
          this.register_form="block"
          this.disabled_btn=false
        }
       
      }else{
          this.toast_text= " I dati inseriti non sono sufficenti"
          this.toastx="block"
          setTimeout(() => {
            this.toastx="none"
          }, 3000);
      }
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
          var end = start + this.total_service.duration
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id, 18).subscribe(data=>{
          this.register_form='none'
          this.user.first_name=this.first_name
          this.user.last_name=this.last_name
          this.sendEmailConfirmation(this.email,this.first_name,this.last_name,this.today,this.months_names[this.month],this.year,this.times[this.selected_hour.start],this.total_service.name,"Wellness Clinic")
          this.toast_text= "Prenotazione andata a buon fine"
          this.toastx="block"
          Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
          this.selected_date='Seleziona data'
          this.displ_hour='Seleziona ora'
          this.selected_service='Seleziona servizio'
        setTimeout(() => {
          this.toastx="none"
        }, 3000);
        this.total_service={name:'',duration:0,id:-1}
        this.service=[]
        this.getServices()},
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
          var end = start + this.total_service.duration 
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id,18).subscribe(data=>{
          this.register_form='none'
          this.sendEmailConfirmation(this.email,this.first_name,this.last_name,this.today,this.months_names[this.month],this.year,this.times[this.selected_hour.start],this.total_service.name,"Wellness Clinic")
          this.toast_text= "Prenotazione andata a buon fine"
          this.user.first_name=this.first_name
          this.user.last_name=this.last_name
          this.toastx="block"
          Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
          this.selected_date='Seleziona data'
          this.displ_hour='Seleziona ora'
          this.selected_service='Seleziona servizio'
        setTimeout(() => {
          this.toastx="none"
        }, 3000);
        this.total_service={name:'',duration:0,id:-1}
        this.service=[]
        this.getServices()},
          
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
  sendEmailConfirmation(email, name, surname, day, month, year, time, servcie, shop){
    this.api.emailConfirmBooking(email,name,surname,day,month,year,time,servcie,shop).subscribe(
      data=>{
        console.log(data)
      },err=>{
          console.log(err)
      }
    )
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
