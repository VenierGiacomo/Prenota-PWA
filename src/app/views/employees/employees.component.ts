import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import Notiflix from "notiflix";
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  toast="none";
  emplo = "none";
  catalog="none";
  bk_empl=true;
  createEmployee = "none";
  employee= 0
  emplo_name=''
  ////
  first_name = ''
  last_name = '.'
  username = ''
  email = ''
  sex_emp = 'm'
  phone = ''
  password =''
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

 
  catalog_list=[]
  name=''
  duration=5
  sex=3 
  price
  employees =[]
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
  store_type
  constructor(private api: ApiService, private storage: StorageService, private router: Router,private cdRef:ChangeDetectorRef, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Imposta i dati dei tuoi dipendenti e il loro orario di lavoro");
   }

  ngOnInit() {  
    this.catalog = "none";
    this.createEmployee = "none";
    this.getEmployees()
    this.getemployeeServices()
    let store_info = JSON.parse( localStorage.getItem('shop_data'))

    this.store_type =store_info.business_type

    }
    getEmployees(){
      this.api.getEmployees().subscribe(
        data=>{
          this.employees = data
          for(let empl of this.employees){
            empl.first_name = empl.name
          }
        },
        err=>{
          console.log(err)
        }
      )
    }
    getemployeeServices(){
      this.api.getEmployeeservicesNoInput().subscribe(
        data=>{
          var services:any = data
          for(let service of services){
            this.storage.setemployCatalog(service.employee, service.service_id)
          }
        },
        err=>{
          console.log(err)
        }
      )
    }
    async goHome(){
      await this.storeEverything()
      this.router.navigateByUrl('/home')
    }
    async goData(){
      await this.storeEverything()
      this.router.navigateByUrl('/notifications')
    }
    deleteEmployee(employee){
      this.api.deleteEmployee(employee.id).subscribe(
        data=>{
          Notiflix.Notify.Success('Collaboratore eliminato con successo');
          this.storage.deleteEmployeehours(employee.employee)
          this.getEmployees()
        },
        err => {
          console.log(err.error,'err')
        }
      )
      
    }
    async goSettings(){
      await this.storeEverything()
      this.router.navigateByUrl('/settings')
    }
    submit(){ 
      let str:string = this.first_name
      let str1:string = this.last_name
      str = str[0].toUpperCase() + str.slice(1)
      str1 = str1[0].toUpperCase() + str1.slice(1)
      this.api.registeremployee(str, str1, new Date().getTime()+"@libero.it", 'm', 3312233645, "Omocaig"+ new Date().getTime()).subscribe(
            data=>{
              this.first_name=''
              this.createEmployee="none"
              Notiflix.Notify.Success('Collaboratore aggiunto con successo');
              this.getEmployees()
            },
            err => {
              console.log(err.error,'err')
            }
          )
  
    }

    storeEverything(){
      this.catalog="none"
      var opentimes=[]
      var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
      for (let i in times){
        var openday = []
        var openday1 = []
        var h1 = this.hours.indexOf(times[i][0])
        var h2 =this.hours.indexOf(times[i][1])
       
        var a1 = this.times.indexOf(times[i][0])
        var a2 = this.times.indexOf(times[i][1])
        if( this.double_turn[i]){
          var h3 = this.hours.indexOf(times[i][2])
          var h4 =this.hours.indexOf(times[i][3])
          var b1 = this.times.indexOf(times[i][2])
          var b2 = this.times.indexOf(times[i][3])
        }else{
          var b1 = 0
          var b2 = 0
        }
        if(h1<=0){
          h1 = this.hours.indexOf(this.times[Math.ceil(a1/3)*3])
        }
        if(h2<=0){
          h2 = this.hours.indexOf(this.times[Math.ceil(a2/3)*3])
        }
        if(h3<=0){
          h3 = this.hours.indexOf(this.times[Math.ceil(b1/3)*3])
        }
        if(h4<=0){
          h4 = this.hours.indexOf(this.times[Math.ceil(b2/3)*3])
        }
       
        if((a1<a2) && (a1*a2)>0 && this.closed_days[i]){
          openday = [{
            "employee": this.employee,
            "wkday": i,
            "start": h1,
            "end": h2,
            "start_t": a1,
            "end_t": a2,
            }]
        }
        if((b1<b2) && (b1*b2)>0 && this.closed_days[i]){
          openday1 = [{
            "employee": this.employee,
            "wkday": i,
            "start": h3,
            "end": h4,
            "start_t": b1,
            "end_t": b2,
            }]
        }
  
          opentimes = opentimes.concat(openday)
          opentimes = opentimes.concat(openday1)
      }
     
      if( this.employee != 0){
        for (let emp of this.employees){
          if (emp.employee== Number(this.employee)){
            var name= emp.name
            this.storage.setEmployeehours(this.employee,name, opentimes)
          }
        }
      }
  this.api.setemployeeHours(opentimes).subscribe(
    data=>{
      Notiflix.Notify.Success('Modifiche salvate con successo');
    },
    err => {
      console.log(err, 'error while storing')
    }
  )
}
      
    displayCatalog(){
      if(this.employee!=0){
        this.catalog = 'block'
        this.catalog_list = this.storage.getCatalog()
        var empl_catalog = this.storage.getemployCatalog()
        for (let serv of this.catalog_list){
          for(let empl_serv of empl_catalog){
            if( serv.id == empl_serv.service && this.employee == empl_serv.employee){
              serv.active = true
            }
          }
        }
      }else{
        Notiflix.Notify.Warning('Per poter modificare i servizzi, devi prima selzionare un collaboratore');
      }
      
    }
    activate(service){
    if (!service.active){
      this.storage.setemployCatalog(this.employee, service.id)
      this.api.setEmployeeservice(this.employee, service.id).subscribe(data=>{console.log('success',data)},err=>{console.log('error',err)})
      
    }else{
      this.storage.deleteemployCatalog(this.employee, service.id)
      this.api.deleteEmployeeservice(this.employee, service.id).subscribe(data=>{console.log('success',data)},err=>{console.log('error',err)})
    }
    service.active = !service.active
    
    }
    changeTimetable(emplo){
      this.employee = emplo.employee
      this.bk_empl=false
      this.lun= ['','','','']
      this.mar= ['','','','']
      this.mer= ['','','','']
      this.gio= ['','','','']
      this.ven= ['','','','']
      this.sab= ['','','','']
      this.dom= ['','','','']
      var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
      
      var hours = this.storage.getEmployeehours()
      hours = hours.filter((employee)=> {if(employee.id == this.employee){ this.emplo_name = employee.name; return employee}})

        for (let opening of hours[0].timetable){
          if(times[opening.wkday][0]==''){
            this.double_turn[opening.wkday] = false
            if(this.times[opening.start_t]!= undefined && this.times[opening.end_t]!= undefined ){
              times[opening.wkday][0] = this.times[opening.start_t]
              times[opening.wkday][1] = this.times[opening.end_t]
            }
            
            }
          else{
              this.double_turn[opening.wkday] = true
              if(this.times[opening.start_t]!= undefined && this.times[opening.end_t]!= undefined ){
              times[opening.wkday][2] = this.times[opening.start_t]
              times[opening.wkday][3] = this.times[opening.end_t]
              }
          }
        }
        for(let day in times){
          if (times[day][0]==''){
            this.closed_days[day] = false
          }else{
            this.closed_days[day] = true
          }
        }
    }
    dateChanged(ev,day,spot){
      var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
      times[day][spot] = ev.target.__data.value
    }
    async selectEmpl(){
      await this.storeEverything()
      this.emplo = "block"
    }
    async logout(){
      await this.storeEverything()
      this.api.deleteAllData()
      this.router.navigateByUrl('login')
    }
    async changeColab(){
      await this.storeEverything()
      this.bk_empl=true
    }
  }

  