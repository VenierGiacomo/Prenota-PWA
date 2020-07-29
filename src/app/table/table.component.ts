import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
spin="block"
client_name
hair_color
hair_lenght
phone
avarage_expense
 last_service
 clients:any=[]
  constructor(private router: Router, private api: ApiService) { }

 ngOnInit(){
   this.getClient()
  }
  getClient(){
    this.api.getStoreClients().subscribe(data=>{
this.clients=data
this.spin="none"
    },err=>{
      this.spin="none"
      console.log(err)
    })
  }
  update(client){
    this.api.updateClientStore(client.id, client.client_name, client.hair_color, client.hair_lenght, client.phone, client.avarage_expense, client.last_service).subscribe(data=>{
      Notiflix.Notify.Success('I dati sono stati aggiornati con successo');
    },err=>{
      console.log(err)
    })
  }
  goNotifications(){
    this.router.navigateByUrl('/notifications')
  }
  goSettings(){
    this.router.navigateByUrl('/settings')
  }
  goHome(){
    this.router.navigateByUrl('/home')
  }
  logout(){
    this.api.deleteAllData()
    this.router.navigateByUrl('login')
  }
  newClient(){
    this.api.addClientStore(this.client_name, this.hair_color, this.hair_lenght, this.phone, this.avarage_expense, this.last_service).subscribe(data=>{
      this.client_name=''
this.hair_color='', this.hair_lenght='', this.phone='', this.avarage_expense='', this.last_service=''
Notiflix.Notify.Success('Il cliente è stato registrato con successo');
this.getClient()
    },err=>{
      console.log(err)
    })
  }
}
