import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";
import { StorageService } from '../services/storage.service';
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
  constructor(private storage: StorageService,private router: Router, private api: ApiService) { }

 ngOnInit(){
   this.getClient()
   console.log( new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(1000))
  }
  getClient(){
    this.api.getStoreClients().then(data=>{
    this.clients=data
    for(let client of this.clients){
      client.credit = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(client.credit/100)
    }
    this.spin="none"
    }).catch(err=>{
      this.spin="none"
      console.log(err)
      Notiflix.Notify.Failure("C'è stato un problema nel caricate i tuoi clienti");
    })
  }
  reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
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
