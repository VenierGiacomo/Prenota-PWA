import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import '@vaadin/vaadin-time-picker';
import '@vaadin/vaadin-checkbox';
import Notiflix from "notiflix";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40", "06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  toast= "none";
  catalog="none";
  color_show='none';
  bussiness_type_stripe='none'
  business= this.storage.getbusinneType()
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
  month = new Date().getMonth()
  year = new Date().getFullYear()
  color_top='0px'
  catalog_list=[]
  name=''
  duration=6
  sex=3 
  max=1
  price
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
  sexs=['non spec','Donna', 'Uomo', 'Unisex' ]
  bussiness_selection='none'

  ////// chart
  view:any;
  single:any
  day_by_day
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  labels = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel_services_general = 'Tipo di servizio';
  yAxisLabel_services_general = 'Quantità';
  xAxisLabel_services_per_emplo = 'Dipendenti';
  yAxisLabel_services_per_emplo = 'Ore lavorate';
  xAxisLabel_online_performance = 'Performace online';
  yAxisLabel_online_performance = 'Risultati';
  xAxisLabel_day_by_day= 'Giorni del mese';
  yAxisLabel_day_by_day= 'Prenotazioni';

  colorScheme = {
    domain: ['#0061d5', '#00BBF9','#00479d' , '#00072D']
  };

  services_per_emplo
  services_general
  online_performance

  week_days = ['Dom','Lun','Mar','Mer','Gio','Ven','Sab']
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  constructor(private api: ApiService, private storage: StorageService, private router: Router, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Imposta i settaggi e l'orario del tuo negozio");
   }

  async ngOnInit() {  
  this.catalog = "none"
  var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
  
  var hours = this.storage.getOpenignhours()
  if(hours==0){
  await this.api.getopenHours().subscribe(data=>{
    this.storage.setOpenignhours(data)

      },err=>{
        console.log(err)
      })
    }
  if(hours != []){
    for (let opening of hours){
      if(times[opening.wkday][0]==''){
        times[opening.wkday][0] = this.hours[opening.start]
        times[opening.wkday][1] = this.hours[opening.end]
        }
      else{
          this.double_turn[opening.wkday] = true
          times[opening.wkday][2] = this.hours[opening.start]
          times[opening.wkday][3] = this.hours[opening.end]
       
      }
    }
    for(let day in times){
      if (times[day][0]==''){
        this.closed_days[day] = false
      }
    }
}
  }
  dateChanged(ev,day,spot){
    var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
    times[day][spot] = ev.target.__data.value
  }
  goHome(){
    this.router.navigateByUrl('/home')
  }
  goData(){
    this.router.navigateByUrl('/notifications')
  }
  goEmployees(){
    this.router.navigateByUrl('/settings/employees')
  }
  updateBusinessType(type){
    this.api.updateStore(type).subscribe(data=>{

      this.bussiness_selection ='none'
      Notiflix.Notify.Success('Il tuo tipo di business è stato registrato');
      console.log(data, type)

    },err=>{
      this.bussiness_selection ='none'
      Notiflix.Notify.Failure("C'è stato un errore durante il salvataggio! \nRiprova più tardi");
      console.log(err)
    })
  }
  // print(){
  //   console.log(this.lun[0])
  // }
  async charts_show(){
    var date = new Date()
    var month = date.getMonth()
    var year = date.getFullYear()
    document.getElementById('charts_cont').style.left='20vw'
    var stats:Array<any> = await this.storage.getStats()
    if(!(stats.length>0)){
      this.api.getCharthsData(month, year).subscribe(async (data)=>{
      await this.storage.setStats(data) 
      stats = await this.storage.getStats()
      await this.charts_draw()
      
      })
    }else{
      await this.charts_draw()
    }
  

  }
  charts_hide(){
    document.getElementById('charts_cont').style.left='100vw'
  }
  async charts_draw(){
    var date = new Date()
    var month = date.getMonth()
    var year = date.getFullYear()
    var stats:Array<any> = await this.storage.getStats()
    var services: Array<any> = await this.storage.getCatalog()
    var new_arr =[]
    for(let el of services){
      var quantity = stats.filter((val) =>{return el.id== Number(val.service_n)})
      var data ={
        name: el.name,
        value:quantity.length
      }
      new_arr.push(data)
    }
    this.services_general = new_arr 
    
    var new_arr1 =[]
    var employess = await this.storage.getEmployeehours()
    employess= employess.map(val => [val.id,val.name]) 
    for(let emplo of employess){
      var quantity = stats.filter((val) =>{return (emplo[0]== Number(val.employee)&& Number(val.service_n)>0)})
      var value:any = quantity.reduce((accumulator, val)=>{
        return accumulator + val.end - val.start;
      },0)
      value= value * 5
      value = Math.floor(value/60) + ((value % 60)/100)
 
      var data_empl ={
        name: emplo[1],
        value: value
      }
      new_arr1.push(data_empl)
    }
        this.services_per_emplo = new_arr1  
      var new_arr2=[]
      var quantity = stats.filter((val) =>{return (val.client!= 1 && Number(val.service_n)>0)})
      var data_call = {
        name: "Chiamate rispamiate",
        value: quantity.length
      }
      var  serv_dict = {}
      for(let ser of services ){
        serv_dict[ser.id] = ser.price
      }
      var value:any = quantity.reduce((accumulator, val)=>{
        return accumulator + serv_dict[val.service_n]
      },0)
      var data_money = {
        name: "Incasso da prenotazioni online",
        value: -value/100
      }
      var mins  = Math.floor(quantity.length * 3/60) + ((quantity.length * 3 % 60)/100)
      var data_minutes = {
        name: "Tempo risparmiato",
        value: mins
      }
      new_arr2.push(data_call)  
      new_arr2.push(data_money)       
      new_arr2.push(data_minutes)   
      this.online_performance = new_arr2  
      
      var new_arr3=[]
      var quantity2 = stats.map((val) =>{ if (Number(val.service_n)>0 ){return val.day}})
    var result = this.count_occurencies(quantity2);
    var datas
    for (let ind in result[0]){
        datas={
          name: result[0][ind],
          value: result[1][ind]
        }
        new_arr3.push(datas)
    }
   new_arr3.sort(function(a, b){
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
   })
   if(new_arr3[new_arr3.length-1].name==undefined){
    new_arr3.pop()
   }
   for(let el of new_arr3){
     el.name =el.name+'/'+ (month+1)
   }
 
this.day_by_day = new_arr3
  }
  formatHour(val) {

    val= parseFloat(val).toFixed(2);
    var res = val.split('.')
    return res[0] +' h ' + res[1]+ ' min'
  } 
nameToDate(val){
      var day = val.split('/')
      var week_day=new Date(this.year,this.month, day[0] ).getDay()
      return this.week_days[week_day] + " "+ day[0]+ ' '+ this.months_names[this.month]
  }

count_occurencies(arr) {
    var a = [],
      b = [],
      prev;
  
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[i];
    }
  
    return [a, b];
  }
   format_cardMoney(val){
    if(val.value<0){
      return -val.value +' €'
    }else{
      if(Number.isInteger(val.value)){
        return val.value 
      }else{
        val.value = val.value.toString()
        var res = val.value.split('.')
        return res[0] +' h ' + res[1]+ ' min'
      }
     
    }
  
  }
  storeEverything(){
    var opentimes=[]
    this.storage.setbusinneType(this.business)
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
      if (!this.closed_days[i]){
        a1=0
        a2=0
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
        this.toast='block'
        setTimeout(() => {
          this.toast="none"
        }, 3500);
      },
      err => {
        console.log(err, 'error while storing')
      }
    )
  }
  storeCatalogService(){
  
    this.api.setStoreservice(this.name, this.duration, this.sex, this.max, this.colors_list.indexOf(this.bgcolor), this.price).subscribe(
      async data=>{
        var res:any = data
        await this.storage.setCatalog(res.id, res.name, res.duration, res.duration, res.price, res.max_n, res.color)
        this.catalog_list = await this.storage.getCatalog()
        for (let el of this.catalog_list){
          console.log(el)
          el.price_display = (el.price/100).toFixed(2)
        // setTimeout(() => {
        //  document.getElementById('input-price').addEventListener('keyup',(ev:any)=>{
        //     ev.target.value =  ev.target.value*100
        //     ev.target.value = Number(ev.target.value)/100
        
           
        //   })
        // }, 500);
      }
        this.toast="block"
        setTimeout(() => {
          this.toast="none"
        }, 3500);
      },
      err => {
        console.log(err, 'error while storing')
      }
    )
    this.name=''
    this.duration=5
    this.sex=3 
    this.max = 1
    this.bgcolor = this.colors_list[0]
    setTimeout(async () => {
    this.price=''
      this.catalog_list = await this.storage.getCatalog()
        for (let el of this.catalog_list){
          el.price_display = (el.price/100).toFixed(2)
      }
    }, 300);
  }
  async displayCatalog(){
    this.catalog = 'block'
    this.catalog_list = await this.storage.getCatalog()
    for (let el of this.catalog_list){
      el.price_display = (el.price/100).toFixed(2)
    // setTimeout(() => {
    //  document.getElementById('input-price').addEventListener('keyup',(ev:any)=>{
    //     ev.target.value =  ev.target.value*100
    //     ev.target.value = Number(ev.target.value)/100
    
       
    //   })
    // }, 500);
  }

  }
  changeColor(col_num){
    this.bgcolor=this.colors_list[col_num]
    
    this.color_show="none"
  }
  deleteservice(id){
    this.storage.deleteservice(id)
    this.catalog_list  = this.storage.getCatalog()
    this.api.deleteService(id).subscribe(data=>{console.log(data)},err=>{console.log(err)})
  }
  logout(){
    this.api.deleteAllData()
    this.router.navigateByUrl('login')
  }
  async portalStripe(){
    this.api.stripePortalSession().subscribe(async data=>{
      var session:any = await data
     window.location.href = session.url
  })
  }
  displayColorPicker(){
    var col = document.getElementById('color')
    this.color_top= (col.offsetHeight+ col.offsetTop+  window.innerHeight/5+10)+'px'
    this.color_show='block'
  }
  showBusinessStripeType(){
    // this.bussiness_type_stripe='block'
    Notiflix.Notify.Warning('I pagamenti online sarano disponibili a breve');
  }
  openPaymentAccount(type){
    
    this.api.activatePayments(type).subscribe((res:any)=>{      
      window.open(res.url,'_blank');
    },err=>{
      console.log(err)
    })
   
  }
  trunk5(val){
    return val.substring(0,8)+'...'
  }
}
