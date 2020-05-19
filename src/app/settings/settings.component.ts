import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  toast='none'
  business= this.storage.getbusinneType()
  
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

  catalog='none'
  catalog_list=[]
  name=''
  duration=5
  sex=3 
  price
  durations=['0 min','15 min', '30 min', '45 min', '1 ora ', '1 ora 15 min','1 ora 30 min','1 ora 45 min','2 ore']
  sexs=['non spec','Uomo', 'Donna', 'Unisex' ]
  constructor(private api: ApiService, private storage: StorageService, private router: Router) { }

  ngOnInit() {  
  var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
  
  var hours = this.storage.getOpenignhours()
  console.log(hours)
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
  goHome(){
    this.router.navigateByUrl('/home')
  }
  goEmployees(){
    this.router.navigateByUrl('/settings/employees')
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
      var b1 = this.hours.indexOf(times[i][2])
      var b2 = this.hours.indexOf(times[i][3])
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
        console.log(data, 'stored ')
        this.toast="block"
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
    this.storage.setCatalog(this.name, this.duration, this.sex, this.price)
    this.name=''
    this.duration=5
    this.sex=3 
    this.price = ''
    setTimeout(() => {
      this.catalog_list = this.storage.getCatalog()
    }, 300);
  }
  displayCatalog(){
    this.catalog = 'block'
    this.catalog_list = this.storage.getCatalog()
  }
}
