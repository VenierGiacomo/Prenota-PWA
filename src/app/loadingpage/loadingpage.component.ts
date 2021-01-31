import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import Notiflix from "notiflix";
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
  this.api.getEmployees().subscribe(async data=>{
    this.employees_list = await data
      this.api.getemployeeHours().subscribe(async data=>{
        var time= await data
        for (let employee of this.employees_list){
          let timetable =[]
          for(let timeslot of time){
            if(employee.employee == timeslot.employee){
              timetable.push(timeslot)
            }
          }
         await this.storage.setEmployeehours(employee.employee, employee.name,timetable)
        }
      },err=>{
        Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
         Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
         function(){ 
           this.api.deleteAllData()
          window.location.reload(true);
          }, 
        function(){ this.api.deleteAllData()
          // this.router.navigateByUrl('login')
      } ); 
        console.log(err)
      })

  },err=>{
    console.log(err)
  })
  // this.api.getEmployees().subscribe(async data=>{
  //   for(let user of data){
  //     await this.api.getSpecificUser(user.employee).subscribe(async data=>{
  //       await this.employees_list.push(data)
  //     },err=>{
  //       Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
  //        Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
  //        function(){ 
  //         this.api.deleteAllData()
  //          window.location.reload(true);
  //         }, 
  //       function(){ this.api.deleteAllData()
  //         this.router.navigateByUrl('login')
  //     } ); 
  //       console.log(err)
  //     })
  //   }
  //     this.api.getemployeeHours().subscribe(async data=>{
  //       var time= await data
  //       for (let employee of this.employees_list){
  //         let timetable =[]
  //         for(let timeslot of time){
  //           if(employee.id == timeslot.employee){
  //             timetable.push(timeslot)
  //           }
  //         }
  //         setTimeout(async () => {
  //           await this.storage.setEmployeehours(employee.id, employee.first_name,timetable)
  //         }, 1000);
        
  //       }
  //     },err=>{
  //       Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
  //        Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
  //        function(){ 
  //          this.api.deleteAllData()
  //         window.location.reload(true);
  //         }, 
  //       function(){ this.api.deleteAllData()
  //         this.router.navigateByUrl('login')
  //     } ); 
  //       console.log(err)
  //     })

  // },err=>{
  //   Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
  //    Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
  //    function(){ 
  //      this.api.deleteAllData()
  //     window.location.reload(true);
  //     }, 
  //   function(){ this.api.deleteAllData()
  //     this.router.navigateByUrl('login')
  // } ); 
  //   console.log(err)
  // })
  await this.api.getStoreservice().subscribe(data=>{
    var services:any = data
    for(let service of services){
      this.storage.setCatalog(service.id, service.name, service.duration, service.duration_book, service.price, service.max_n, service.color)
    }
  },err=>{
    Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
     Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
     function(){ 
       this.api.deleteAllData()
      window.location.reload(true);
      }, 
    function(){ this.api.deleteAllData()
      this.router.navigateByUrl('login')
  } ); 
    console.log(err)
  })

 await this.api.getopenHours().subscribe(data=>{
    this.storage.setOpenignhours(data)
    setTimeout(() => {
      this.router.navigateByUrl('home')
    }, 6000);
    
      },err=>{
        Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
         Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
         function(){ 
           this.api.deleteAllData()
          window.location.reload(true);
          }, 
        function(){ this.api.deleteAllData()
          this.router.navigateByUrl('login')
      } ); 
        console.log(err)
      })
    }
  }



  // this.api.deleteAllData()
//   this.api.getEmployees().subscribe(async data=>{
//     for(let user of data){
//       await this.api.getSpecificUser(user.employee).subscribe(async data=>{
//         await this.employees_list.push(data)
//       },err=>{
//         Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
//          Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
//          function(){ window.location.reload(true);
//           }, 
//         function(){ this.api.deleteAllData()
//           this.router.navigateByUrl('login')
//       } ); 
//         console.log(err)
//       })
//     }
//       this.api.getemployeeHours().subscribe(async data=>{
//         for (let employee of this.employees_list){
//           let timetable =[]
//           for(let timeslot of data){
//             console.log(employee, timeslot)
//             if(employee.id == timeslot.employee){
//               timetable.push(timeslot)
//             }
//           }
//          await this.storage.setEmployeehours(employee.id, employee.first_name,timetable)
//         }
//       },err=>{
//         Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
//          Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
//          function(){ window.location.reload(true);
//           }, 
//         function(){ this.api.deleteAllData()
//           this.router.navigateByUrl('login')
//       } ); 
//         console.log(err)
//       })

//   },err=>{
//     Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
//      Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
//      function(){ window.location.reload(true);
//       }, 
//     function(){ this.api.deleteAllData()
//       this.router.navigateByUrl('login')
//   } ); 
//     console.log(err)
//   })
//   await this.api.getStoreservice().subscribe(data=>{
//     var services:any = data
//     for(let service of services){
//       this.storage.setCatalog(service.id, service.name, service.duration, service.sex, service.max_n, service.color)
//     }
//   },err=>{
//     Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
//      Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
//      function(){ window.location.reload(true);
//       }, 
//     function(){ this.api.deleteAllData()
//       this.router.navigateByUrl('login')
//   } ); 
//     console.log(err)
//   })

//  await this.api.getopenHours().subscribe(data=>{
//     this.storage.setOpenignhours(data)
//     setTimeout(() => {
//       this.router.navigateByUrl('home')
//     }, 4000);
    
//       },err=>{
//         Notiflix.Confirm.Init({ titleColor:"#eebf31",okButtonBackground:"#0061d5",cancelButtonBackground:"#676767",backgroundColor:"#ffffff", }); 
//          Notiflix.Confirm.Show( 'Attenzione, si è presentato un problema durante il login','Vuoi riprovare a fare il login', 'Si', 'No', 
//          function(){ window.location.reload(true);
//           }, 
//         function(){ this.api.deleteAllData()
//           this.router.navigateByUrl('login')
//       } ); 
//         console.log(err)
//       })
//     }
//   }

