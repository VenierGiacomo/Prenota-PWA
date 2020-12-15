import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-cmassaggi',
  templateUrl: './cmassaggi.component.html',
  styleUrls: ['./cmassaggi.component.scss']
})
export class CmassaggiComponent implements OnInit {
  year
  month
  day
  just_entered= 0
  cal='none'
  formType='Register'
  toastx='none'
  register_form='none'
  logout_displ='none'
  spin='block'
  spin_spots = "none"
  // spin_spots1= "none"
  spin_spots_neg = "visible"
  // spin_spots1_neg= "visible"
  spots='none'
  serv_displ='none'
  service:any =[]
  selected_date='Seleziona data'
  selected_hour
  displ_hour='Seleziona ora'
  selected_service='Seleziona servizio'
  cont_scroll =false
  today
  unique :any
  uniques:Array<any> =[]
  user:any= {first_name:'', last_name:'',phone:''}
  confirm='none'
  first_name = ''
  last_name = ''
  username = ''
  email = ''
  sex = 'm'
  button_text='Prenota un appuntamento'
  phone = ''
  password =''
  ser_height = '0px'
  first_name_err=''
  last_name_err=''
  username_err= ''
  email_err= ''
  phone_err= ''
  password_err=''
  error= ''
  o:any ={}
  list_appointments
  services:any=[]
  week = []
  emplo_show:any=[]
  availableSpots
  openhours
  timeslot 
  final_spots
  final_spots_displ=[]
  employees_serivces
  empl_hours
  results_empl_serv:any=[]
  disabled_btn= false
  active_date:any = []
  employees_list:any = []
  cont = 0 
  active_services= []
  app_to_book:any
 list_work = []
 availableSpots1:any =[]
  all_app_week1:any=[]
  show_something= false
  text_c ='#0061d5'
  time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  week_name = ["Lun","Mar","Mer","Gio","Ven","Sab","Dom"]
  months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  total_service={name:'',duration:0,id:-1}
  selected_services:any=[]
  // rand = [ 6, 12, 21, 32 ,47 ,49 ]
  times =["06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  months_short=['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic']
  years=[2020,2021]
  email1
  password1
  filtr =  []
  empl_for_service=[]
  //automante
  max_spots=-1
  id =27
  name ="CMassaggi"
  last_selected_week=0
  appointments
  book_site= false
  constructor(private api: ApiService, private router: Router, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Aparrucchieri - Parrucchiere Trieste. Prendi appuntamento online");
   }
   async ngOnInit() {
    // Notiflix.Block.Standard('.service', 'Caricamento serivzi...');
    // this.api.storeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwiZXhwIjoxNTk2MTkwMTU1LCJlbWFpbCI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwib3JpZ19pYXQiOjE1OTM1MjUyMzJ9.JuKYHCyGe9BNt-WNitG3cH0Dm36_gF290C3vTKAtDV8")
    // this.apiNative.storeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwiZXhwIjoxNTk2MTkwMTU1LCJlbWFpbCI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwib3JpZ19pYXQiOjE1OTM1MjUyMzJ9.JuKYHCyGe9BNt-WNitG3cH0Dm36_gF290C3vTKAtDV8")
    var now = new Date()
    var today = now.getDay()
    this.day = now.getDate()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    var now = new  Date()
    var month = now.getMonth()
    var day_number = now.getDate()

  //  window.addEventListener('scroll', function(ev) {

   
// },false);
  for (let i=0;i<20;i++){
      if((day_number + i)<= this.months_days[month]){
        var day = {"number" :day_number + i, "week_day" : ((today+i-1)%7), "month":this.month}
        this.active_date.push(false)
        this.week.push(day)
      }else{
        var day = {"number" :day_number + i - this.months_days[month], "week_day" : ((today+i-1)%7), "month":this.month+1 }
        this.active_date.push(false)
        this.week.push(day)
      }
  }
    await this.getservices()
    // this.getAppointments(this.day)
    await this.tokenValidation()
    await this.calculateWorkdates()
    await this.getEmployees()
    this.active_date[0]=true
 
    this.api.getEmploservicebyStore(this.id).subscribe(async data=>{
      this.employees_serivces = await data
        },err=>{
          console.log(err)
        })
        if(this.mobileCheck()){
          this.button_text="Prenota con l'app"
          this.book_site= true
        }else{
          this.button_text="Prenota appuntamento"
          this.book_site= false
          }
  }
  mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };
  getEmployees(){
   
      this.api.getEmployeesfromshop(this.id).subscribe( async data=>{
        this.employees_list = await data        
      },err=>{
        console.log(err)
      })
    
  
  }
  showCalendar(){
    this.serv_displ='none'
    this.cal='block'
    this.spots='none'

  }

  getservices(){
    this.active_services=[]
      this.api.getStoreservicebyStore(this.id).subscribe(
        async data=>{
          this.services = await data
          for(let i=0;i< this.services.length;i++){
            this.active_services.push(["#ffffff", '#263b56',false])
          }          
        err=>{
          console.log(err)
        }
      })
    
  }
  closeBooking(){
    setTimeout(() => {
      this.serv_displ='none'
    this.cal='none'
    this.spots='none'
  
    }, 200);
    
  }
  showServices(){
    if(this.mobileCheck()){
      var userAgent = navigator.userAgent || navigator.vendor ;
      if (/android/i.test(userAgent)) {
        window.location.href="http://play.google.com/store/apps/details?id=io.prenota.client"
      }
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href="https://apps.apple.com/app/id1523525291"
      }
    }else{
      setTimeout(() => {
        this.serv_displ= 'block'
        this.cal='none'
        this.spots='none'
      }, 200);
    }
  }
  async tokenValidation(){
   
      if(this.api.isvalidToken()){
        this.api.getUser().subscribe( async data=>{
          this.user = await data
        },err=>{
          console.log(err)
        })
      }
    
    
  }
  async getAppointments(day){
    console.log('called')
    var date = new Date(this.year, this.month, day)
    var week = this.getWeekNumber(date)
    if(this.last_selected_week==week){
      this.last_selected_week=week
      for (let appointment of this.appointments){
        if (day == appointment.day){
         this.list_appointments.push(appointment)
        }
      }
      var all_serv = this.service
      for(let ind in this.service){
        this.service = await all_serv.slice(0,+ind+1)

         await this.calculateAvailability(date)
  
      }
    }else{
      this.last_selected_week=week
      this.list_appointments=[]
      this.api.getAppointmentsByshop(week,this.id).subscribe(
        async data=>{
         this.appointments =  await data
         for (let appointment of this.appointments){
           if (day == appointment.day){
            this.list_appointments.push(appointment)
           }
         }
         var all_serv = this.service
        for(let ind in this.service){
          this.service =await all_serv.slice(0,+ind+1)   
           await this.calculateAvailability(date)
     
        }
         
        err=>{
          console.log(err)
        }
      })
    }
    
    
  }
  groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  selectService(service,i){
    this.uniques=[]
    // Notiflix.Block.Standard('.all_spots', 'Calcolando disponibilità...');
    this.spin_spots = "block"
    this.spin_spots_neg = "hidden"
   
    this.cont=0
    const index = this.service.indexOf(service);
    if (index > -1) {
      this.service.splice(index, 1);
      this.empl_for_service.splice(index, 1)
    }else{
      this.service.push(service)
      var list =[ ]
      for(let ser of this.employees_serivces){
        if(service.id == ser.service_id){
          var name = this.employees_list.filter( function( el ) {
            return el.employee == ser.employee})
          list.push({id:ser.employee, name: name[0].name})
        }
      }
      this.empl_for_service.push(list)
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
    if( this.service.length!=0){
      this.selected_services = ' selec'
      this.getAppointments(this.day)
    }
    this.firstweek_availability()
    // this.calculateAvailability(date)
  }

  async DatePicker(date_avi, ind, bool) {
    // this.final_spots =[]
    // Notiflix.Block.Standard('.time', 'Calcolando disponibilità...');
    // this.spin_spots1='block'
    // this.spin_spots1_neg='hidden'
      for (let indd in this.active_date){
        this.active_date[indd]=false
      }
      this.today= `${date_avi.number} ${this.months[date_avi.month]} ${this.year}`
      this.day = date_avi.number
      this.month = date_avi.month
      this.active_date[ind] = true
      this.getAppointments(this.day)
      this.selected_date = this.today
      if(bool){
        setTimeout(() => {
          this.showSpots()
        }, 100);
      }
   
      // await this.calculateAvailability(date)
      
  }
  getOptionsArrray(array){
    let options = [];
    array.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }
  selectTime(spot){
    this.selected_hour  = spot[0]
    this.timeslot = this.times[spot[0].start]
    this.confirm='block'
    this.app_to_book = spot
    this.displ_hour =  this.timeslot
    setTimeout(() => {
      this.serv_displ='none'
      this.cal='none'
      this.spots='none'
    }, 500);
   
    // console.log( this.app_to_book)
  }
  showSpots(){
    setTimeout(() => {
      this.serv_displ='none'
      this.cal='none'
      this.spots='block'
    }, 100);
    
    
  }
  async calculateWorkdates(){
   
       await this.api.getemployeeHoursByShop(this.id).subscribe(async data=>{
        this.empl_hours = await data
      var empl = await data
      var x:any =[]
      for(let work of empl){
        for(let day of this.week){
          if(day.week_day == work.wkday){
            if(day.number<=this.day+1 && day.month==this.month){
            }else{
              x.push(day)
            }
          }
        }
      }
      this.unique= [...new Set(x)];
      this.unique.sort(function(a, b){
        if (a.month < b.month) return -1;
        if (a.month > b.month) return 1;
        if (a.number > b.number) return 1;
        if (a.number < b.number) return -1;
      })
      this.day=this.unique[0].number
      this.month =this.unique[0].month
      // console.log(this.unique)
      this.today= `${this.day} ${this.months[this.month]} ${this.year}`
      this.spin = 'none'
      this.getAppointments(this.day)
    },err =>{
      console.log(err) 
  }) 
  }

  emploShow(){
    this.emplo_show=[]
  for (let empl of this.employees_list){
    var x = 0
    for (let el of this.final_spots){
       if(empl.employee==el[0].employee){
          x= 1
       }
     }
     if(x==1){
      this.emplo_show.push(true)
     }else{
      this.emplo_show.push(false)
     }
    }
    this.show_something =false
    for(let el of this.emplo_show){
      if(el){
        this.show_something =true
      }
    }
  }
  async itsemploJob(){
    this.results_empl_serv =[]
    var items = this.employees_serivces,
    grouped = [];
items = await items.filter(function(value, index, arr){ ;return value.service_id != null })
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
    }
  }
  filter_s(){
    this.final_spots
  }
  async firstweek_availability(){
    this.uniques=[]
    this.availableSpots1=[]
    // this.final_spots =[]
    var now = new  Date()
    var today = now.getDay() -1
    var month = now.getMonth()
    var day_number = now.getDate()
    var week_n =this.getWeekNumber(now)
    var week:any=[]
    var week2:any=[]
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
    week.push(day)
    }
    for (let i=7;i<14;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
    week2.push(day)
    }
    var list1 =[ ]
    for (let day of this.empl_hours){
        var start = this.times.indexOf(this.rows[day.start])
        var end =  this.times.indexOf(this.rows[day.end])
        for (var i = start; i <= end; i++) {
          list1.push({time: i  , employee: day.employee, day: week[day.wkday], week_day: day.wkday});
        }
      }
      for (let day of this.empl_hours){
        var start = this.times.indexOf(this.rows[day.start])
        var end =  this.times.indexOf(this.rows[day.end])
        for (var i = start; i <= end; i++) {
          list1.push({time: i  , employee: day.employee, day: week2[day.wkday], week_day: day.wkday});
        }
      }
      this.list_work = list1
 
       if (this.just_entered == 0){

    
        this.api.getAppointmentsByshop2(week_n,this.id).subscribe(
          async data=>{
           this.all_app_week1 =  await data
           for(let appointment of  this.all_app_week1){
            var start = this.times.indexOf(this.rows[appointment.start])
            var end = start+appointment.end -  appointment.start
            this.list_work =  this.list_work.filter(function(value, index, arr){ return (value.time < start && appointment.employee==value.employee )|| (value.time  >= end && appointment.employee==value.employee || appointment.employee!=value.employee || appointment.day!=value.day )})
          } 
          var app
          var tot_dur=0
            for(let serv_ind of this.service){
             tot_dur = tot_dur+ serv_ind.duration_book
            }
            
        

            for(let idx in this.list_work){
       
              let id:any = idx
              var length =this.list_work.length-1
              if(id ==0 || id == length || this.list_work[id].time-this.list_work[id-1].time> 1 || this.list_work[id].time-this.list_work[id-1].time< 0  || this.list_work[id].employee-this.list_work[id-1].employee!= 0 || app == undefined || app.duration == tot_dur){
                if (app != undefined){
                  if(app.duration >=   tot_dur){
                    this.availableSpots1.push(app)
                    app =undefined
                }
              }else{
                if(this.rows.indexOf(this.times[this.list_work[id].time])!=-1){
                  app = { duration: 1, day: this.list_work[id].day} 
                }
               }
             }else{
                 app.duration +=1
             }
           
            }
            
            let weeks=[]
            for(let spot of this.availableSpots1){
                weeks.push(spot.day)
              
            }
            weeks= await [...new Set(weeks)]
          
        
            var weeks1 =week
            for (let day of week2){
              weeks1.push(day)
            }
            
            weeks1 = await weeks1.filter( function( el ) {
              return weeks.indexOf( el ) < 0;
            } );
            
          
       
              this.uniques = await this.unique.filter( function( el ) {
                return weeks1.indexOf( el.number ) < 0;
              } );
              
              this.DatePicker(this.uniques[0],0,false)
             //  Notiflix.Block.Remove('.all_spots');
              this.spin_spots = "none"
              this.spin_spots_neg = "visible"
          
        },err=>{
          console.log(err)
        })   
      this.just_entered=1
    }else{
          for(let appointment of  this.all_app_week1){
           var start = this.times.indexOf(this.rows[appointment.start])
           var end = start+appointment.end -  appointment.start
           this.list_work =  this.list_work.filter(function(value, index, arr){ return (value.time < start && appointment.employee==value.employee )|| (value.time  >= end && appointment.employee==value.employee || appointment.employee!=value.employee || appointment.day!=value.day )})
         } 
         var app
         var tot_dur=0
            for(let serv_ind of this.service){
             tot_dur = tot_dur+ serv_ind.duration_book
            }
            
         
           for(let idx in this.list_work){
       
             let id:any = idx
             var length =this.list_work.length-1
             if(id ==0 || id == length || this.list_work[id].time-this.list_work[id-1].time> 1 || this.list_work[id].time-this.list_work[id-1].time< 0  || this.list_work[id].employee-this.list_work[id-1].employee!= 0 || app == undefined || app.duration == tot_dur){
               if (app != undefined){
                 if(app.duration >=   tot_dur){
                  this.availableSpots1.push(app)
                  app =undefined
               }
              }else{
                if(this.rows.indexOf(this.times[this.list_work[id].time])!=-1){
                  app = { duration: 1, day: this.list_work[id].day} 
                }
               }
             }else{
                 app.duration +=1
             }
          
           }
           
           let weeks=[]
           for(let spot of this.availableSpots1){
               weeks.push(spot.day)
             
           }
           weeks= await [...new Set(weeks)]
         
       
           var weeks1 =week
           for (let day of week2){
             weeks1.push(day)
           }
           
           weeks1 = await weeks1.filter( function( el ) {
             return weeks.indexOf( el ) < 0;
           } );
           
      
             this.uniques = await this.unique.filter( function( el ) {
               return weeks1.indexOf( el.number ) < 0;
           
             } );
            //  Notiflix.Block.Remove('.all_spots');
             this.spin_spots = "none"
             this.spin_spots_neg = "visible"
        }
      
     
      
  }
  async calculateAvailability(date){
    // this.itsemploJob()
      this.total_service.duration=0
      this.total_service.name=''
          for(let service of this.service){
            if(this.service.indexOf(service) == this.service.length-1){
              this.total_service.name = this.total_service.name+service.name
            }else{
              this.total_service.name = this.total_service.name+service.name+' + '
              this.total_service.id = -1
            }
          }
          if(this.service.length==1){
             this.total_service.id = this.selected_services[0].id
          }else{
            this.total_service.id = -1
          }
      var serv_ind = this.service.length-1
      if(serv_ind == 0){
        var day_of_week = date.getDay()-1
        if (day_of_week == -1){
          day_of_week= 6
        }
        this.availableSpots=[]
        // this.api.getemployeeHoursByShop(this.id).subscribe(async  data=>{
        //     this.empl_hours =  await data
            var list = [];
            var app
            for (let day of this.empl_hours){

              if(day_of_week == day.wkday){
                var start = this.times.indexOf(this.rows[day.start])
                var end =  this.times.indexOf(this.rows[day.end])
                for (var i = start; i <= end; i++) {
                  list.push({time: i  , employee: day.employee });
                }
              }

            }
            this.openhours = await list
            for(let appointment of this.list_appointments){
              var start = this.times.indexOf(this.rows[appointment.start])
              var end = start+appointment.end -  appointment.start
              this.openhours = this.openhours.filter(function(value, index, arr){ return (value.time < start && appointment.employee==value.employee )|| (value.time  >= end && appointment.employee==value.employee ) || appointment.employee!=value.employee})
            } 
            for (let empl of this.employees_serivces){
              if( empl.service_id == this.service[0].id){                
                var y = empl.employee
                var empl_name = this.employees_list.find(x => x.employee === y).name;
                var service_name = this.services.find(x => x.id === empl.service_id).name;
                var max_ind = this.openhours.length-1
                // let _mid =0
                for(let idx in this.openhours){
                  // console.log(idx ,this.openhours[idx].employee)
                  if(this.openhours[idx].employee==y){
                    let id:any = idx
                    // console.log(id , this.openhours[id] , this.openhours[id-1] , this.openhours[id], this.openhours[id-1],  app , this.service[serv_ind])
                    if(id ==0 || id == max_ind || this.openhours[id].time-this.openhours[id-1].time> 1  || this.openhours[id].employee-this.openhours[id-1].employee!= 0 || app == undefined || app.duration == this.service[serv_ind].duration_book){
                      if (app != undefined){
                        if(app.duration >=   this.service[serv_ind].duration_book){
                          this.availableSpots.push(app)
                          // console.log(app)
                        }
                      }
                      if(this.rows.indexOf(this.times[this.openhours[id].time])!=-1){
                        app = {start: this.openhours[id].time, duration: 1, employee:y, emplo_name:empl_name, service: this.service[0].id , service_name: service_name}
                      }
                  
                    }else{
                        app.duration +=1
                    }
                  }
                  }
                }
               
              }
                  this.final_spots=[]
 
                this.availableSpots= await [...new Set(this.availableSpots)]
                if(this.max_spots!=-1){
                  if(this.service.length==1){
                    for(let emplo of this.employees_list){
                      var d_final = this.availableSpots.filter(function(value, index, arr){ return (value.employee == emplo.employee )})
                      var limit = Math.min((d_final.length),this.max_spots)
                      for(let i=0;i<limit;i++){
                          var x =Math.round( Math.random()*(d_final.length-1))
                          this.final_spots.push([d_final[x]])  
                          d_final.splice(x,1)    
                         
                      }
                    }
                }
                // console.log(this.final_spots)
                this.final_spots=await [...new Set(this.final_spots)]
                 
                this.final_spots.sort(function(a, b) {
                  return a[0].start - b[0].start;
               });
               this.final_spots_displ =this.final_spots
               this.filtr =  []
               var g = this.final_spots_displ[0][0].employee
               this.filtr.push(g)
               this.final_spots_displ = this.final_spots.filter((v, i)=> {
                var c = true
                for(let i = 0;i< v.length; i++){
                  
                  if(v[i]["employee"] != this.filtr[i]){
                      c=false
                      
                  }
                }
                return (c);
              })
       
              }else{
                for(let spot of this.availableSpots ){
                    this.final_spots.push([spot])
                  }
                this.final_spots=await [...new Set(this.final_spots)]
                 
                this.final_spots.sort(function(a, b) {
                  return a[0].start - b[0].start;
               });
               this.filtr =  []
               this.final_spots_displ =this.final_spots               
               var g = this.final_spots_displ[0][0].employee
               this.filtr.push(g)
               await this.filter_serv()
              }
            //  console.log('run first')
              
      }else{
        var day_of_week = date.getDay()-1
        if (day_of_week == -1){
          day_of_week= 6
        }
        // Notiflix.Block.Standard('.bookings-time', 'Verificando la disponibilità...');
        // console.log(this.final_spots, serv_ind)
        this.availableSpots = this.final_spots
        // console.log(this.availableSpots, this.final_spots)
        var list = [];
        var app
        for (let day of this.empl_hours){
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
          this.openhours = this.openhours.filter(function(value, index, arr){ return (value.time <= start && appointment.employee==value.employee )|| (value.time  >= end && appointment.employee==value.employee ) || appointment.employee!=value.employee})
        } 
        var o:any = this.groupBy( this.openhours, 'employee')
      // setTimeout(async () => {
        this.final_spots=[]
        var last_spot_ind = +serv_ind - 1
        var dur_client =this.service[last_spot_ind].duration
        var duration = this.service[serv_ind].duration_book
       
        for (let empl of this.employees_serivces){
          if( empl.service_id == this.service[serv_ind].id){
               x = empl.employee
              var empl_name = this.employees_list.find(l => l.employee === x).name;
              var service_name = this.services.find(x => x.id === empl.service_id).name; 
              for(let spot of this.availableSpots){
                let time_spot = JSON.parse(JSON.stringify(spot));
                let obj = this.openhours.find(obj => obj.time == (Math.ceil(dur_client/3)*3)+spot[last_spot_ind].start && obj.employee == empl.employee && spot.length == last_spot_ind+1 );
                // console.log(obj)
                if(obj!=undefined){
                  var ind = this.openhours.indexOf(obj)
                  if(ind+duration<this.openhours.length){
                    if (obj.time+duration == this.openhours[ind+duration].time && x!=undefined){
                      time_spot.push({start: obj.time, duration: duration,employee:x,emplo_name:empl_name, service: this.service[serv_ind].id,service_name: service_name})
                      this.final_spots.push(time_spot)
                    }
                  }
                }
              }
          }

        
      }
      if(this.max_spots!=-1){
          for(let emplo of this.employees_list){
            var d_final = this.final_spots.filter(function(value, index, arr){ return (value.employee == emplo.employee )})
            var limit = Math.min((d_final.length),this.max_spots)
            for(let i=0;i<limit;i++){
                 y =Math.random()*(d_final.length-1)
                this.final_spots.push([d_final[y]])
                d_final.splice(y,1)
            }
           
        
      }
    }
   
      // this.final_spots=[...new Set(this.final_spots)]
      await  this.final_spots.sort(function(a, b) {
        return a[0].start - b[0].start;
     });
    this.filtr =  []
    for( let el of  this.final_spots[0]){
      this.filtr.push(el.employee)
    }
    // console.log( this.final_spots)
    await this.filter_serv()
    // await this.emploShow()
    // }, 700);
  }
    // }
      
}
filter_serv(){
  this.final_spots_displ = this.final_spots.filter((v, i)=> {
    var c = true
    for(let i = 0;i< v.length; i++){
      if(v[i]["employee"] != this.filtr[i]){
          c=false
      }
    }
    return (c);
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


async book(){
  var appointment = {
    studio: this.name,
    date: this.today,
    service: this.total_service.name,
    time: this.timeslot,
  }
        var month = this.month
        var day = this.day
      if (day!=1){
        day=day-1
      }else{
        day = this.months_days[this.month]-1
        month=month-1
      }
   var x = this.timeslot.split(":")
    // console.log(new Date(this.year, month, this.day, x[0]-2), `Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} oggi alle ${this.timeslot}`, new Date(this.year, this.month, day, 11),`Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} il ${this.today} alle ${this.timeslot}`,)
    if(this.api.isvalidToken()){

      for (let  ind in this.app_to_book){
        Notiflix.Block.Standard('.cont', 'Prenotazione in corso...');
        var client_name = this.user.first_name+' '+ this.user.last_name
        var start = this.rows.indexOf(this.times[this.app_to_book[ind].start])
        var end = start + this.app_to_book[ind].duration
        // console.log(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id,this.name)
        this.api.bookAppointmentNoOwner(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
          // console.log(data)
          if( ind == '0'){
            // console.log(this.user.email,this.user.first_name,this.user.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.total_service.name,this.name)
            this.sendEmailConfirmation(this.user.email,this.user.first_name,this.user.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
          }
      Notiflix.Block.Remove('.cont');
       Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
       var ok_btn = document.getElementById('NXReportButton')
       ok_btn.addEventListener("click",async ()=>{this.router.navigateByUrl('i_miei_appuntamenti')},false) 
    },
      err=>{
        Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
        console.log(err)
        Notiflix.Block.Remove('.cont');
        })
      }
    }else{
      this.presentRegisterModal()
    }
  }
  SendBooking(type){
    if(type=='register'){
      this.submit()
    }else{
      this.login()
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
        async data=>{
          this.api.storeToken(data.token)
          for (let  ind in this.app_to_book){
            var client_name = this.first_name+' '+this.last_name
            var start = + this.rows.indexOf(this.times[this.app_to_book[ind].start])
            var end = start + this.app_to_book[ind].duration
            this.api.bookAppointmentNoOwner(start, end, this.day, this.month, this.year, client_name, this.phone, this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
            this.register_form='none'
            this.user.first_name=this.first_name
            this.user.last_name=this.last_name
            if( ind == '0'){
              this.sendEmailConfirmation(this.email,this.first_name,this.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
            }
            await Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
            var ok_btn = document.getElementById('NXReportButton')
            ok_btn.addEventListener("click",()=>{this.router.navigateByUrl('i_miei_appuntamenti')},false) 
            this.selected_date='Seleziona data'
            this.displ_hour='Seleziona ora'
            this.selected_service='Seleziona servizio'
          setTimeout(() => {
            this.toastx="none"
          }, 3000);
          this.total_service={name:'',duration:0,id:-1}
          this.service=[]},
            err=>{
              Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connesione o prova a cambaire orario', 'Annulla');
              console.log(err)
          })
        }
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
  async login(){
    this.error=''
    this.api.login(this.email1,this.password1).subscribe(
     async data=>{
        this.api.storeToken(data.token)
        this.api.getUser().subscribe(async data=>{
        this.user = await data
        for (let  ind in this.app_to_book){
          // await this.storage.setAppointment(appointment)
          Notiflix.Block.Standard('.cont', 'Prenotazione in corso...');
          var client_name = this.user.first_name+' '+this.user.last_name
          var start = + this.rows.indexOf(this.times[this.app_to_book[ind].start])
          var end = start + this.app_to_book[ind].duration
          // console.log(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id,this.name)
          this.api.bookAppointmentNoOwner(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
            // console.log(data)
            if( ind == '0'){
                this.sendEmailConfirmation(this.email1,this.user.first_name,this.user.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
              }
              // await this.storage.setAppointment(appointment)
          Notiflix.Block.Remove('.cont');
           Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
           var ok_btn = document.getElementById('NXReportButton')
              ok_btn.addEventListener("click",async ()=>{this.router.navigateByUrl('i_miei_appuntamenti')},false) 
       
          //  await this.pay()
       
          },
          err=>{
            Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
            console.log(err)
            Notiflix.Block.Remove('.cont');
            })
          
          }
        },err => {
          this.error = 'Error getting user data'
          console.log(err.error,'err')
        })
      },
      err => {
        this.error = 'La password o la email che hai inserito non sono valide'
        console.log(err.error,'err')
      }
    )
  }
  async bookfromLogin(email,first_name,last_name){
    var appointment = {
      studio: this.name,
      date: this.today,
      service: this.total_service.name,
      time: this.timeslot,
    }

      var token = await this.api.isvalidToken()
       var month = this.month
        var day = this.day
      if (day!=1){
        day=day-1
      }else{
        day = this.months_days[this.month]-1
        month=month-1
      }
   var x = this.timeslot.split(":")
    // console.log(new Date(this.year, month, this.day, x[0]-2), `Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} oggi alle ${this.timeslot}`, new Date(this.year, this.month, day, 11),`Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} il ${this.today} alle ${this.timeslot}`,)
    if(this.api.isvalidToken()){
    for (let  ind in this.app_to_book){
      // await this.storage.setAppointment(appointment)
      Notiflix.Block.Standard('.cont', 'Prenotazione in corso...');
      var client_name =first_name+' '+ last_name
      var start = + this.rows.indexOf(this.times[this.app_to_book[ind].start])
      var end = start + this.app_to_book[ind].duration
      // console.log(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id,this.name)
      this.api.bookAppointmentNoOwner(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
        // console.log(data)
        if( ind == '0'){
            this.sendEmailConfirmation(email,first_name,last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
          }
          // await this.storage.setAppointment(appointment)
      Notiflix.Block.Remove('.cont');
       Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
       var ok_btn = document.getElementById('NXReportButton')
          ok_btn.addEventListener("click",async ()=>{this.router.navigateByUrl('i_miei_appuntamenti')},false) 
   
      //  await this.pay()
   
      },
      err=>{
        Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
        console.log(err)
        Notiflix.Block.Remove('.cont');
        })
      }
      }else{
        this.presentRegisterModal()
      }
    
    }
  sendEmailConfirmation(email, name, surname, day, month, year, time, servcie, shop){
      this.api.emailConfirmBooking(email,name,surname,day,month,year,time,servcie,shop).subscribe(
        data=>{
          // console.log(data)
        },err=>{
            console.log(err)
        }
      )
    
}

presentRegisterModal(){
  this.register_form="block"
  this.disabled_btn=false
}



logScrolling(ev){
  if (ev.detail.scrollTop>100){
this.text_c='#fff'
  }else{
    this.text_c='#0061d5'
  }
}
goBookSite(){
  // if(this.mobileCheck()){
    window.location.href = 'https://mobile.prenota.cc/business/27'
  // }
}

}