import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-dlf',
  templateUrl: './dlf.component.html',
  styleUrls: ['./dlf.component.scss']
})
export class DlfComponent implements OnInit {
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
  employees_list:any=[]
  disabled_btn=false
  cont = 0 
  active_services= []
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
  serv_displ='none'
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
  actual_month
  max_spots = -1
  actual_day
  time_duration: string[] = ["5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore"];
  times =["06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  constructor(private api: ApiService, private router: Router, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Dopo Lavoro Ferroviario - Visite mediche sportive a Trieste. Prendi appuntamento online");
    // window.location.reload();
   }
ngOnInit(){
    var now = new Date()
    this.today = now.getDate()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    this.actual_day=now.getDate()+1
    this.actual_month=now.getMonth()
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
  this.api.getEmployeesfromshop(34).subscribe(data=>{
    this.employees_list =data 
    },err=>{
      console.log(err)
    })
this.api.getEmployeeservices(415).subscribe(async data=>{
      this.employees_serivces = await data
        },err=>{
          console.log(err)
        })
        if(this.mobileCheck()){
          this.button_text="Prenota con l'app"
        }else{
          this.button_text="Prenota appuntamento"
          }
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
    var date1 = new Date(this.year, this.actual_month,this.actual_day  ); 
    var date2 = new Date(this.year,this.month, day); 
    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24)); 
    if (day>this.actual_day || this.month>this.actual_month){
      if(Difference_In_Days<22){
        if(Difference_In_Days>=1){
          this.selected_date = `${day} ${this.months_names[this.month]} ${this.year}`
          this.today =day
          this.displ_hour='Seleziona ora'
          this.getAppointments(day)
          setTimeout(() => {
            this.cal='none'
          }, 100);
        }else{
        Notiflix.Notify.Init({position:'center-top'});
        Notiflix.Notify.Warning('Non è possibile prenotare con meno di 2 giorni di anticipo');
        }
      }else{
        Notiflix.Notify.Init({position:'center-top'});
        Notiflix.Notify.Warning('Al momento si accettano solo prenotazioni con un massimo di 21 giorni di anticipo');
      }
    }else{
      Notiflix.Notify.Init({position:'center-top'});
      Notiflix.Notify.Warning('Attenzione! Seleziona una data valida');
    }
   
  }
  selectHour(hour){
    this.selected_hour  = hour
    this.displ_hour = this.times[hour.start]
    setTimeout(() => {
      this.spots='none'
    }, 100);
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
    this.api.getStoreserviceNoLogin(415).subscribe(
      data=>{
        this.services =  data
        for(let i=0;i< this.services.length;i++){
          this.active_services.push(["#ffffff", '#263b56',false])
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
    this.api.getStoreAppointments(week,415).subscribe(
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
  groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
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
    this.api.getemployeeHoursNoLogin(415).subscribe(
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
        if(this.availableSpots.indexOf(this.availableSpots[x])!=x){
         
          this.availableSpots.splice(x, 1);
        }
        if(this.availableSpots.indexOf(this.availableSpots[x])!=x){
         
          this.availableSpots.splice(x, 1);
        }
      }
      if(this.max_spots!=-1){
        var o:any = this.groupBy( this.availableSpots, 'employee')
        // console.log( this.availableSpots, o,1)
        this.availableSpots = []
        for(let ind in this.employees_list){
          var empl_id = this.employees_list[ind].employee.toString()
          var x = Math.floor(o[empl_id].length/(this.max_spots+2))
          var int:any = ind
          // console.log(o[empl_id])
          if(x== 0 || x==-1 ){
            for(let el of o[empl_id]){
              this.availableSpots.push(el)
            }
          }else{
            if(int%2 ==0){
              for(let i =1; i<=this.max_spots ; i++){
                // console.log(o[empl_id][(x*(i+1))-1], (x*(i+1))-1)
                this.availableSpots.push(o[empl_id][(x*(i+1))-1])
              }
            }else{
              for(let i =1; i<=this.max_spots ; i++){
                // console.log( o[empl_id][x*(i+1)], x*(i+1))
                this.availableSpots.push(o[empl_id][x*(i+1)])
              }
            }
          }
          
        }
      }
      // console.log( this.availableSpots, o,2)
      this.availableSpots=[...new Set(this.availableSpots)]
      Notiflix.Block.Remove('.time');
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


  mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

openAppStore(){
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
      // console.log(this.results_empl_serv, 'adfojnvd')
    }
  }
  book(){
    this.disabled_btn=true
    if (this.selected_date!='Seleziona data' &&  this.displ_hour!='Seleziona ora' && this.service !=''){
      if(this.api.isvalidToken()){
        var client_name = this.user.first_name+' '+ this.user.last_name
        var start = this.rows.indexOf(this.times[this.selected_hour.start])
        var end = start + this.total_service.duration
        // console.log(start, end, this.today, this.month, this.year, client_name, this.user.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id,23)
        this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id,34).subscribe(async data=>{
          this.toast_text= "Prenotazione andata a buon fine"
          this.toastx="block"
          this.sendEmailConfirmation(this.user.email,this.user.first_name,this.user.last_name,this.today,this.months_names[this.month],this.year,this.times[this.selected_hour.start],this.total_service.name,"Dopo Lavoro Ferroviario")
          await Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
          var ok_btn = document.getElementById('NXReportButton')
          ok_btn.addEventListener("click",()=>{this.router.navigateByUrl('i_miei_appuntamenti')},false) 
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
          var client_name = this.first_name+' '+this.last_name
          var start = this.rows.indexOf(this.times[this.selected_hour.start])
          var end = start + this.total_service.duration
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id, 34).subscribe(async data=>{
          this.register_form='none'
          this.user.first_name=this.first_name
          this.user.last_name=this.last_name
          this.sendEmailConfirmation(this.email,this.first_name,this.last_name,this.today,this.months_names[this.month],this.year,this.times[this.selected_hour.start],this.total_service.name,"Dopo Lavoro Ferroviario")
          this.toast_text= "Prenotazione andata a buon fine"
          this.toastx="block"
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
        this.api.getUser().subscribe(async data=>{
          this.user = await data
          var client_name = this.user.first_name+' '+this.user.last_name
          var start = this.rows.indexOf(this.times[this.selected_hour.start])
          var end = start + this.total_service.duration 
          this.api.bookAppointmentNoOwner(start, end, this.today, this.month, this.year, client_name, this.user.phone,  this.total_service.name, this.selected_hour.employee, this.total_service.id,34).subscribe(async data=>{
          this.register_form='none'
          this.sendEmailConfirmation(this.user.email,this.user.first_name,this.user.last_name,this.today,this.months_names[this.month],this.year,this.times[this.selected_hour.start],this.total_service.name,"Dopo Lavoro Ferroviario")
          this.toast_text= "Prenotazione andata a buon fine"
          this.user.first_name=this.first_name
          this.user.last_name=this.last_name
          this.toastx="block"
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

  showCalendar(){
    this.serv_displ='none'
    this.cal='block'
    this.spots='none'
    
  }
  showSpots(){
    this.serv_displ='none'
    this.cal='none'
    this.spots='block'
    
  }

  showServices(){
    if(this.mobileCheck()){
      this.openAppStore()
    }else{
      this.serv_displ='block'
      this.cal='none'
      this.spots='none'
    }
  }
  closeBooking(){
    setTimeout(() => {
      this.serv_displ='none'
    this.cal='none'
    this.spots='none'
  
    }, 100);
    
  }
}
