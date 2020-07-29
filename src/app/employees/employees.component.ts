import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
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

  hours = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  toast="none";
  emplo = "none";
  catalog="none";
  bk_empl='none';
  createEmployee = "none";
  employee= 0
  emplo_name=''
  ////
  first_name = ''
  last_name = ''
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
  constructor(private api: ApiService, private storage: StorageService, private router: Router,private cdRef:ChangeDetectorRef, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Imposta i dati dei tuoi dipendenti e il loro orario di lavoro");
   }

  ngOnInit() {  
    this.catalog = "none";
    this.createEmployee = "none";
    this.getEmployees()
    }
    getEmployees(){
      this.api.getEmployees().subscribe(
        data=>{
          this.employees = data
        },
        err=>{
          console.log(err)
        }
      )
    }
    goHome(){
      this.router.navigateByUrl('/home')
    }
    goData(){
      this.router.navigateByUrl('/notifications')
    }
    deleteEmployee(employee){
      this.api.deleteEmployee(employee.id).subscribe(
        data=>{
          console.log('success')
          this.storage.deleteEmployeehours(employee.employee)
          this.getEmployees()
        },
        err => {
          console.log(err.error,'err')
        }
      )
      
    }
    goSettings(){
      this.router.navigateByUrl('/settings')
    }
    submit(){
      let str:string = this.first_name
      str = str[0].toUpperCase() + str.slice(1)
      this.api.registeremployee(str, this.last_name, this.email, this.sex_emp, this.phone, this.password).subscribe(
            data=>{
              console.log(data)
              this.createEmployee="none"
               this.getEmployees()
            },
            err => {
              console.log(err.error,'err')
            }
          )
  
    }

    storeEverything(){
      var opentimes=[]
      var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
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
            "employee": this.employee,
            "wkday": i,
            "start": a1,
            "end": a2
            }]
        }
        if((b1<b2) && (b1*b2)>0){
          openday1 = [{
            "employee": this.employee,
            "wkday": i,
            "start": b1,
            "end": b2
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
    changeTimetable(){
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
          }else{
            this.closed_days[day] = true
          }
        }
        this.bk_empl="none"
    }
    dateChanged(ev,day,spot){
      var times=[this.lun, this.mar,this.mer,this.gio,this.ven,this.sab,this.dom]
      times[day][spot] = ev.target.__data.value
    }
    selectEmpl(){
      this.emplo = "block"
    }
    logout(){
      this.api.deleteAllData()
      this.router.navigateByUrl('login')
    }
  }

  