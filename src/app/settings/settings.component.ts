import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import QRCode from 'qrcode';
import '@vaadin/vaadin-time-picker';
import '@vaadin/vaadin-checkbox';
import Notiflix from "notiflix";
import { convertToObject } from 'typescript';
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
  stat_month = new Date().getMonth()
  stat_year = new Date().getFullYear()
  color_top='0px'
  catalog_list=[]
  name=''
  duration=6
  sex=3 
  max=1
  price
  spin
  clients:any[]
  left_clients='100vw'
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
  chart_visibility='hidden'
  payments_recieved:Array<any> =[]
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
  yAxisLabel_services_general = 'Ore cumulative';
  xAxisLabel_services_per_emplo = 'Dipendenti';
  yAxisLabel_services_per_emplo = 'Ore lavorate';
  xAxisLabel_online_performance = 'Performace online';
  yAxisLabel_online_performance = 'Risultati';
  xAxisLabel_day_by_day= 'Giorni del mese';
  yAxisLabel_day_by_day= 'Appuntamenti';

  colorScheme = {
    domain: ['#0061d5', '#00BBF9','#00479d' , '#00072D']
  };

  services_per_emplo
  services_general
  online_performance
  lookUp
  show_clients
  displ_client=false
  storeUseCredits=false
  store_type= 0
  register_form='none'
  invite_first_name
  invite_last_name
  invite_phone
  invite_email
  store_name
  code
  generated
  loading=false
  backdrop_active=false
  chart_data:any=[]
  payable
  // services
  delete_modal_top ='-200px'
  delete_customer:any ={client_name:''}
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
    let store_info = JSON.parse( await localStorage.getItem('shop_data'))
    this.storeUseCredits =store_info.credits
    this.store_type =store_info.business_type
    this.store_name=store_info.store_name
    this.payable = store_info.payable
    console.log(store_info,this.store_name)
    // this.services = this.storage.getCatalog()
    if( this.store_type==7){
      this.xAxisLabel_services_per_emplo = 'Campi';
      this.yAxisLabel_services_per_emplo = 'Ore occupate';
    }
}

  this.listBusinessTransactions()
  this.price= new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(20)


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

    },err=>{
      this.bussiness_selection ='none'
      Notiflix.Notify.Failure("C'è stato un errore durante il salvataggio! \nRiprova più tardi");
      console.log(err)
    })
  }
  // print(){
  //   console.log(this.lun[0])
  // }
  pastmonthChart(){
    this.chart_visibility='hidden'
    if(this.stat_month==0){
      this.stat_month=11
      this.stat_year-=1
    }else{
      this.stat_month-=1
    }
    this.charts_show()
  }
 nextmonthChart(){
   this.chart_visibility='hidden'
    if(this.stat_month==11){
      this.stat_month=0
      this.stat_year+=1
    }else{
      this.stat_month+=1
    }
    this.charts_show()
  }
  async charts_show(){
    document.getElementById('charts_cont').style.left='20vw'
      this.api.getCharthsData(this.stat_month, this.stat_year).subscribe(async data=>{
      await this.storage.setStats(data) 
      this.chart_data =data
     
      if( this.chart_data.length>0){
       
        await this.charts_draw()
        setTimeout(() => {
          this.chart_visibility='visible'
        }, 300);
      
    
      }
    
     
      },err=>{
        console.log(err)
        Notiflix.Notify.Failure("C'è stato un problema nell'aggiornarre i dati \nRiprova più tardi")
      })
      // .catch(err=>Notiflix.Notify.Failure("C'è stato un problema nell'aggiornarre i dati \nRiprova più tardi"))
    // }else{
    //   await this.charts_draw()
    // }
  

  }
  charts_hide(ev){
    if(ev.target.id=='charts_cont'){
      document.getElementById('charts_cont').style.left='100vw'
    }
   
  }
  async charts_draw(){
  
 
    var stats:Array<any> = await this.storage.getStats()
    var services: Array<any> = await this.storage.getCatalog()
    var new_arr =[]
    for(let el of services){
      var quantity = stats.filter((val) =>{return el.id== Number(val.service_n)})
      var hours = quantity.reduce((accumulator, val)=>{
        return accumulator + val.end - val.start;
      },0)
      hours= hours * 5
      hours = Math.floor(hours/60) + ((hours % 60)/100)
     
      var data ={
        name: el.name,
        value:hours
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
        value: value/100
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
      var quantity2 = stats.map((val) =>{if(Number(val.service_n)>0 ){
         return val.day}
        })
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
     el.name =el.name+'/'+ (this.stat_month+1)
   }
 
this.day_by_day = new_arr3
  }
  
  formatHour(val) {

    val= parseFloat(val).toFixed(2);
    var res = val.split('.')
    if(res[1]=='00'){
      return res[0] +' h ' 
    }else{
      return res[0] +' h ' + res[1]+ ' min'
    }
  
  } 
nameToDate(val){
      var day = val.split('/')
      var week_day=new Date(this.year,this.stat_month, day[0] ).getDay()
      return this.week_days[week_day] + " "+ day[0]+ ' '+ this.months_names[this.stat_month]
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
    if(val.label=='Incasso da prenotazioni online'){
      return val.value +' €'
    }else{      
      if(val.label=='Chiamate rispamiate'){
        return val.value 
      }else{

        val.value = val.value.toString()
        var res = val.value.split('.')

        if(res[1]!=undefined){
     
            return res[0] +' h e ' + res[1]+ ' min'
          
         
        }else{
          return res[0] +' h'
        }
       
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
    
    var price =  this.reverseFormatNumber(this.price.slice(0,-2),'it')*100
    this.api.setStoreservice(this.name, this.duration, this.sex, this.max, this.colors_list.indexOf(this.bgcolor), price).subscribe(
      async data=>{
        var res:any = data
        await this.storage.setCatalog(res.id, res.name, res.duration, res.duration, res.price, res.max_n, res.color)
        this.catalog_list = await this.storage.getCatalog()
        for (let el of this.catalog_list){
          
          el.price_display = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(el.price/100)
        // setTimeout(() => {
        //  document.getElementById('input-price').addEventListener('keyup',(ev:any)=>{
        //     ev.target.value =  ev.target.value*100
        //     ev.target.value = Number(ev.target.value)/100
        
           
        //   })
        // }, 500);
      }
 
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
     this.price =new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(2000/100)
      this.catalog_list = await this.storage.getCatalog()
        for (let el of this.catalog_list){
          el.price_display = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(el.price/100)
      }
    }, 300);
  }
  async displayCatalog(){
    this.catalog = 'block'
    this.catalog_list = await this.storage.getCatalog()
    for (let el of this.catalog_list){
      el.price_display = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(el.price/100)
  }

  }
  changeColor(col_num){
    this.bgcolor=this.colors_list[col_num]
    
    this.color_show="none"
  }
  deleteservice(id){
    this.storage.deleteservice(id)
    this.catalog_list  = this.catalog_list.filter(val=>{return val.id!=id})
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
    this.bussiness_type_stripe='block'
    // Notiflix.Notify.Warning('I pagamenti online sarano disponibili a breve');
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

  goSettings(){
    this.left_clients='100vw'
    document.getElementById('charts_cont').style.left='100vw'
  }
  getClient(){
    this.displ_client =true
    setTimeout(() => {
      this.left_clients='20vw'
    }, 200);
   
    this.api.getStoreClients().then(data=>{
    this.clients=data
    this.show_clients =  this.clients.slice(0, 9) 
    for(let client of this.clients){
      client.client_name =client.client_name.toLowerCase()
      client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
    }
    this.spin="none"
    }).catch(err=>{
      this.spin="none"
      console.log(err)
      Notiflix.Notify.Failure("C'è stato un problema nel caricate i tuoi clienti");
    })
  }
  download_latestCLient(){
    this.api.getStoreClients(true).then(data=>{
      this.clients=data
      this.show_clients =  this.clients.slice(0, 9) 
      for(let client of this.clients){
        client.client_name =client.client_name.toLowerCase()
        client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
      }
      this.spin="none"
      }).catch(err=>{
        this.spin="none"
        console.log(err)
        Notiflix.Notify.Failure("C'è stato un problema nel caricate i tuoi clienti");
      })
  }
  type(){  
    var x = this.lookUp.toLowerCase()
    this.show_clients = this.clients.filter((val)=>{
      if(val.client_name.includes(x)){
        return val
      }    
    })
    this.show_clients = this.show_clients.slice(0, 9) 
  }
  reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}
close_clients(ev){
  if(ev.target.id =='clients_id'){
    this.left_clients='100vw'
  }
}
  update(client){
    var credit = this.reverseFormatNumber(client.credit.slice(0,-2),'it')*100
   
    this.api.updateClientStore(client.id, client.client_name, client.phone, credit, client.note, client.isMember).subscribe(async data=>{
      await this.storage.updateClient(data)
      Notiflix.Notify.Success('I dati sono stati aggiornati con successo');
    },err=>{
      console.log(err)
    })
  }

  async deleteClient(){
    this.closeDeletePrompt()
    // if(this.delete_customer.client!=1){
      this.api.deleteClientStore(this.delete_customer.id).subscribe(async data=>{
        await this.storage.deleteClient(this.delete_customer)

        setTimeout(async () => {
          var client_list = await JSON.parse( localStorage.getItem('client_list'))
          this.clients = client_list.list 
          this.show_clients =  this.clients.slice(0, 9) 
          for(let el of this.show_clients ){
            el.client_name = el.client_name.toLowerCase()
          }
          Notiflix.Notify.Success('Cliente cancellato');
        }, 100);
      
      },err=>{
        console.log(err)
      })
    // }else{
    //   await this.storage.deleteClient(this.delete_customer)
    //   setTimeout(() => {
    //     Notiflix.Notify.Success('Cliente cancellato');
    //   }, 800);
    // }
    
    
  }
  
  async listBusinessTransactions(){
    this.api.listBusinessTransactions().subscribe((res:any)=>{
      this.payments_recieved = res.data.filter((val)=>{return val.description != null })
      for (let payment of this.payments_recieved){
          payment.desc = payment.description.split('-')[0]
          payment.payer_name = payment.description.split('-')[1]
          payment.payed_in_date = payment.description.split('-')[2]     
      }
    })
   
    // var all_bookings =  await this.storage.getStats()
    // console.log(all_bookings)
    // this.payments_recieved  = all_bookings.filter((val) =>{return val.payed})
    // console.log(this.payments_recieved)

  }
  displ_credit(credit){
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(credit/100)
  }
  closeAddClient(ev){
    if(ev.target.id=='back_add_client'){
      this.register_form='none'
    }

  }
  saveClientwithEmail(){
    this.register_form='none'
    if(this.invite_first_name != '' && this.invite_last_name != '' && this.invite_phone != ''){
      if(this.invite_email!=''){
        this.api.registerClientWithEmail(this.invite_first_name,this.invite_last_name,this.invite_phone,this.invite_email).subscribe(async res=>{
          this.register_form='none'
      
          await this.storage.addClient(res)

          var client_list = await JSON.parse( localStorage.getItem('client_list'))
          this.clients = client_list.list 
          this.show_clients =  this.clients.slice(0, 9) 
          for(let el of this.show_clients ){
            el.client_name = el.client_name.toLowerCase()
          }
          Notiflix.Notify.Success('Cliente registrato');
          this.invite_email=''
          this.invite_first_name =''
          this.invite_last_name =''
          this.invite_phone=''
        },err=>{
          Notiflix.Notify.Failure("C'è stato un errore durante il salvataggio! \nRiprova più tardi");
          
          console.log(err)
        })
      }else{
        this.api.registerClientWithEmail(this.invite_first_name,this.invite_last_name,this.invite_phone).subscribe(async res=>{
          
          
          await this.storage.addClient(res)
          var client_list = await JSON.parse( localStorage.getItem('client_list'))
          this.clients = client_list.list 
          this.show_clients =  this.clients.slice(0, 9) 
          for(let el of this.show_clients ){
            el.client_name = el.client_name.toLowerCase()
          }
          Notiflix.Notify.Success('Cliente registrato');
          this.invite_email =''
          this.invite_first_name =''
          this.invite_last_name =''
          this.invite_phone=''
        },err=>{
          
          Notiflix.Notify.Failure("C'è stato un errore durante il salvataggio! \nRiprova più tardi");
          console.log(err)
        })
      }
      
    }
  
  }
  processQR(client) {
    const qrcode = QRCode;
    var store_name_url = this.store_name.replaceAll(' ', '%20')
    var name = client.client_name.split(' ')

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    name[0]= capitalizeFirstLetter(name[0])
    name[1]= capitalizeFirstLetter(name[1])
    this.invite_email='test.cc@email.com'
    this.code = `https://prenota.cc/register/${name[0]}/${name[1]}//${client.phone}/${store_name_url}/${client.id}`
    qrcode.toString(this.code, { errorCorrectionLevel: 'H' },  (err, url)=> {
      this.generated = url;
    })
    this.backdrop_active =true
    setTimeout(() => {
      
      var qr:any =document.getElementById('qr-card')
      var parser = new DOMParser();
      var doc = parser.parseFromString(this.generated, "image/svg+xml");
      document.getElementById('qr-card').appendChild(doc.documentElement)
      qr.style.top = 'calc(30vh)'
      
   
  },100);
}
closeQR(){
  var qr:any =document.getElementById('qr-card')

    qr.style.top = '110vh'
    setTimeout(() => {
    this.backdrop_active =false
  }, 500);
}

promptDelete(client){
  this.delete_customer =client
  this.delete_modal_top='50px'
}

closeDeletePrompt(){
  this.delete_modal_top='-200px'
}
inviteEmail(client){
  this.api.inviteCLient(client).subscribe(res=>{
    Notiflix.Notify.Success('Invito sepdito');
  },err=>{
    Notiflix.Notify.Failure("C'è stato un problema nell'invio, riporva più tardi");
  })

}
}
