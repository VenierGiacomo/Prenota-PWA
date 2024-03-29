import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import Notiflix from "notiflix";
import Swiper from 'swiper';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private api: ApiService, private storage: StorageService, private router: Router, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Registra il tuo business e inizia a ricevere appuntamenti online");
   }

  first_name = ''
  last_name = ''
  email = ''
  sex = 'm'
  phone = ''
  password =''

  first_name_err=''
  last_name_err=''
  email_err= ''
  phone_err= ''
  password_err=''
  mySwiper 


  // store data
  store_name=''
  address=''
  city=''
  zip_code=''

  // // openingn ours
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40", "06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  toast= "none";
  catalog="none";
  color_show='none';
  colors_list=["#f2b3b3","#fccbbc","#fcecbe","#c2e9d7","#b3e1f7","#c5cbe9","#d7dbef","#ddbde6"]
  bgcolor='#f2b3b3'
  double_turn=[false,false,false,false,false,false,false]
  closed_days=[true,true,true,true,true,true,true]
  lun= ['','','','']
  mar= ['','','','']
  mer= ['','','','']
  gio= ['','','','']
  ven= ['','','','']
  sab= ['','','','']
  dom= ['','','','']
  ///catalog
  double_turn1=[false,false,false,false,false,false,false]
  closed_days1=[true,true,true,true,true,true,true]
  lun1= ['','','','']
  mar1= ['','','','']
  mer1= ['','','','']
  gio1= ['','','','']
  ven1= ['','','','']
  sab1= ['','','','']
  dom1= ['','','','']
  employees
  employee
  catalog_list=[]
  name=''
  duration=5
  // sex=3 
  max

  durations=[ "durata assente","5 min",
  "10 min",
  "15 min",
  "20 min",
  "25 min",
  "30 min",
  "35 min",
  "40 ora",
  "45 min",
  "50 min",
  "55 min",
  " 1ora",
  " 1 ora 5 min",
  " 1 ora 10 min",
  " 1 ora 15 min",
  " 1 ora 20 min",
  " 1 ora 25 min",
  " 1 ora 30 min",
  " 1 ora 35 min",
  " 1 ora 40 ora",
  " 1 ora 45 min",
  " 1 ora 50 min",
  " 1 ora 55 min",
  " 2 ore"
]
  sexs=['non spec','Uomo', 'Donna', 'Unisex' ]

  ngOnInit() {
    // allowTouchMove: false 
    this.mySwiper = new Swiper('.swiper-container', { direction: 'horizontal',allowTouchMove: false  } );
    this.getEmployees()
  }
  goLogin(){
    this.router.navigateByUrl('/login')
  }
  dateChanged(ev,day,spot){
    var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
    times[day][spot] = ev.target.__data.value
  }
  dateChanged1(ev,day,spot){
    var times=[this.lun1, this.mar1,this.mer1,this.gio1,this.ven1,this.sab1,this.dom1]
    times[day][spot] = ev.target.__data.value
  }
 async submit(){
  await this.api.deleteAllData()
  Notiflix.Block.Standard('.wrapper', 'Registrando account...');     
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
    // if(this.first_name_err == '' && this.last_name_err == '' && this.email_err == '' && this.phone_err == '' && this.password_err == ''){
      this.api.registrationConfirmation(this.first_name, this.last_name, this.email,  this.phone).subscribe(
        data=>{
          Notiflix.Block.Remove('.wrapper');
          this.mySwiper.slideNext()
        },
        err => {
          Notiflix.Block.Remove('.wrapper');
          if (err.error.email != undefined){
            this.email_err = 'Questa email è già stata utilizzata'
          }
          if (err.error.password != undefined){
            this.password_err = 'Questa password è troppo semplice. Prova ad aggiungere dei numeri'
          }
          if(err.error.email == undefined, err.error.password == undefined){
            Notiflix.Report.Failure("Errore, registrazione fallita", 'Controlla la tua connessione', 'Annulla');
          }
          console.log(err.error.password)
          console.log(err.error,'err')
        }
      )
  }
  createStore(){
    Notiflix.Block.Standard('.wrapper', 'Salvando dati...');
    this.api.createStore(this.store_name, this.address, this.city, this.zip_code).subscribe(
      data=>{
      Notiflix.Block.Remove('.wrapper');
      this.mySwiper.slideNext()
      },
      err => {
        console.log(err.error,'err')
      }
    )
  }

  storeEverything(){
    Notiflix.Block.Standard('.wrapper', 'Salvando dati...');    
    var opentimes=[]
    var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
    for (let i in times){
      var openday = []
      var openday1 = []
      var a1 = this.hours.indexOf(times[i][0])
      var a2 = this.hours.indexOf(times[i][1])
      if( this.double_turn[i]){
        var b1 = this.hours.indexOf(times[i][2])
        var b2 = this.hours.indexOf(times[i][3])
      }else{
        var b1 = 0
        var b2 = 0
      }
      if(a1 <0 && times[i][0]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if(a2 <0 && times[i][1]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if(b1 <0 && times[i][2]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if(b2 <0 && times[i][3]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if((a1<a2) && (a1*a2)>0){
        openday = [{
          "wkday": i,
          "start": a1,
          "end": a2
          }]
      }
      if((b1<b2) && (b1*b2)>0){
        openday1 = [{
          "wkday": i,
          "start": b1,
          "end": b2
          }]
      }

        opentimes = opentimes.concat(openday)
        opentimes = opentimes.concat(openday1)
    }
    this.storage.setOpenignhours(opentimes)
    this.api.setopenHours(opentimes).subscribe(
      data=>{
        Notiflix.Block.Remove('.wrapper');
        this.mySwiper.slideNext()
        this.getEmployees()
      },
      err => {
        console.log(err, 'error while storing')
      }
    )
  }
  storeOwnerours(){
    Notiflix.Block.Standard('.wrapper', 'Salvando dati...');    
    var opentimes=[]
    var times=[this.lun1, this.mar1,this.mer1,this.gio1,this.ven1,this.sab1,this.dom1]
    for (let i in times){

    }
    for (let i in times){
      var openday = []
      var openday1 = []
      var a1 = this.hours.indexOf(times[i][0])
      var a2 = this.hours.indexOf(times[i][1])
      if( this.double_turn[i]){
        var b1 = this.hours.indexOf(times[i][2])
        var b2 = this.hours.indexOf(times[i][3])
      }else{
        var b1 = 0
        var b2 = 0
      }
      if(a1 <0 && times[i][0]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if(a2 <0 && times[i][1]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if(b1 <0 && times[i][2]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if(b2 <0 && times[i][3]!=''){
        console.log(`Non è possibile selezionare ${times[i][0]} come orario. Altri orari possibili sono ${times[i][0].split(':')[0]}:00, ${times[i][0].split(':')[0]}:15, ${times[i][0].split(':')[0]}:30, ${times[i][0].split(':')[0]}:45`  )
      }
      if((a1<a2) && (a1*a2)>0){
        openday = [{
          "employee": this.employee.employee,
          "wkday": i,
          "start": a1,
          "end": a2
          }]
      }
      if((b1<b2) && (b1*b2)>0){
        openday1 = [{
          "employee": this.employee.employee,
          "wkday": i,
          "start": b1,
          "end": b2
          }]
      }

        opentimes = opentimes.concat(openday)
        opentimes = opentimes.concat(openday1)
    }
   
    if( this.employee != undefined){
          this.storage.setEmployeehours(this.employee.employee,this.employee.name, opentimes)
    }
this.api.setemployeeHours(opentimes).subscribe(
  data=>{
    Notiflix.Block.Remove('.wrapper');
    this.mySwiper.slideNext()
  },
  err => {
    console.log(err, 'error while storing')
  }
)
}
getEmployees(){
  this.api.getEmployees().subscribe(
    data=>{
      this.employees = data
      this.employee = this.employees[0]
      console.log('employee',this.employee, this.employees)
    },
      err=>{
        console.log(err)
      }
  )
}
  Backslide(){
    this.mySwiper.slidePrev()
  }
  goCalendar(){
    this.router.navigateByUrl('loading')
  }  
  goHome(){
    this.router.navigateByUrl('')
  }
  copyTimeslotsstore(){
    console.log(this.double_turn)
    this.double_turn[1]= this.double_turn[0]
    this.double_turn[2]= this.double_turn[0]
    this.double_turn[3]= this.double_turn[0]
    this.double_turn[4]= this.double_turn[0]
    this.double_turn[5]= this.double_turn[0]
    this.double_turn[6]= this.double_turn[0]
    this.closed_days[1]=  this.closed_days[0]
    this.closed_days[2]=  this.closed_days[0]
    this.closed_days[3]=  this.closed_days[0]
    this.closed_days[4]=  this.closed_days[0]
    this.closed_days[5]=  this.closed_days[0]
    this.closed_days[6]=  this.closed_days[0]
    this.mar=this.lun
    this.mer=this.lun
    this.gio=this.lun
    this.ven=this.lun
    this.sab=this.lun
    this.dom=this.lun
  }
  copyTimeslotsemplo(){
    console.log( this.mar1, this.lun1)
    this.double_turn1[1]= this.double_turn1[0]
    this.double_turn1[2]= this.double_turn1[0]
    this.double_turn1[3]= this.double_turn1[0]
    this.double_turn1[4]= this.double_turn1[0]
    this.double_turn1[5]= this.double_turn1[0]
    this.double_turn1[6]= this.double_turn1[0]
    this.closed_days1[1]=  this.closed_days1[0]
    this.closed_days1[2]=  this.closed_days1[0]
    this.closed_days1[3]=  this.closed_days1[0]
    this.closed_days1[4]=  this.closed_days1[0]
    this.closed_days1[5]=  this.closed_days1[0]
    this.closed_days1[6]=  this.closed_days1[0]
    this.mar1=this.lun1
    this.mer1=this.lun1
    this.gio1=this.lun1
    this.ven1=this.lun1
    this.sab1=this.lun1
    this.dom1=this.lun1
  }
}
