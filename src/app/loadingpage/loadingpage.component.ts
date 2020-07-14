import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.scss']
})
export class LoadingpageComponent implements OnInit {
  employees_list: any=[]
  openlist: any=[]
  constructor(private api: ApiService, private storage: StorageService,private router: Router) { }

  async ngOnInit() {

  var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 800,
    delay: (el, i) => 70*i
  })
  this.api.getEmployees().subscribe(data=>{
    for(let user of data){
      this.api.getSpecificUser(user.employee).subscribe(data=>{
        this.employees_list.push(data)
      },err=>{
        console.log(err)
      })
    }

      this.api.getemployeeHours().subscribe(data=>{
        for (let employee of this.employees_list){
          let timetable =[]
          for(let timeslot of data){
            if(employee.id == timeslot.employee){
              timetable.push(timeslot)
            }
          }
        
         this.storage.setEmployeehours(employee.id, employee.first_name,timetable)
        }
      },err=>{
        console.log(err)
      })

  },err=>{
    console.log(err)
  })


  this.api.getStoreservice().subscribe(data=>{
    var services:any = data
    for(let service of services){
      this.storage.setCatalog(service.id, service.name, service.duration, service.sex, service.max_n, service.color)
    }
  },err=>{
    console.log(err)
  })



 this.api.getopenHours().subscribe(data=>{
    this.storage.setOpenignhours(data)
    setTimeout(() => {
      this.router.navigateByUrl('home')
    }, 4000);
    
      },err=>{
        console.log(err)
      })
    }
  }

