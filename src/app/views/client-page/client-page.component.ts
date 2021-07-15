import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import Notiflix from "notiflix";
@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  catalog_list
  client_id
  custome_services 
  email
  phone
  services_name
  selected_service =101010
  duration =101010
  client_name
  price =new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(20)
  time_duration: string[] = ["0 min","5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore","2 ore e 5 min", "2 ore e 10 min", "2 ore e 15 min","2 ore e 20 min", "2 ore e 25 min","2 ore e 30 min","2 ore e 35 min","2 ore e 40 min","2 ore e 45 min","2 ore e 50 min","2 ore e 55 min","3 ore","3 ore e 5 min", "3 ore e 10 min", "3 ore e 15 min","3 ore e 20 min", "3 ore e 25 min","3 ore e 30 min","3 ore e 35 min","3 ore e 40 min","3 ore e 45 min","3 ore e 50 min","3 ore e 55 min"];
  constructor(private storage: StorageService,private api: ApiService ,private router: Router) {
    var url
    if(this.router.url.includes('?')){
      url = this.router.url.split('?')[0].split('/')
    }else{
      url= this.router.url.split('/')
    }
   
    this.client_id = url[url.length-4]
    this.phone= url[url.length-3]
    this.client_name = url[url.length-2].replaceAll('%20',' ')
    this.email=url[url.length-1]
    
    
    this.api.getCustomServices(this.client_id).subscribe((res)=>{
      console.log(res)
      this.custome_services = res
      for (let el of this.custome_services){
        el.price_displ = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(el.price/100)
      }
      
    },err=> console.log(err))
   }

  ngOnInit(): void {
    this.catalog_list = this.storage.getCatalog()
    this.services_name = new Object
   this.catalog_list.map(val=>{this.services_name[val.id]=val.name} )
  }
  addCustomService(){
    if(this.selected_service!=101010){
      if(this.duration!=101010){
        var price =  this.reverseFormatNumber(this.price.slice(0,-2),'it')*100
        if(Number.isInteger(price)){
          this.api.addCustomService(this.selected_service,this.client_id,this.duration,price).subscribe((res)=>{
            Notiflix.Notify.Success("Servizio salvato");
            res.price_displ = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(res.price/100)
            this.custome_services.unshift(res)
            this.selected_service=101010
            this.duration=101010
          },err=>{
            if(err.error.exist){
              Notiflix.Notify.Warning('Hai già modificato questo servizio. Cotrolla nella lista sotto');
            }else{
              Notiflix.Notify.Failure("C'è stato un errore. Se continua a ripetersi chiama il 3312233645");
            }

            
          })
        }else{
          Notiflix.Notify.Warning('Prezzo invalido');
        }
    }else{
      Notiflix.Notify.Warning('Seleziona una durata');
    }
    }else{
      Notiflix.Notify.Warning('Seleziona un servizio');
    }
    

  }
  reverseFormatNumber(val,locale){
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    return Number.isNaN(reversedVal)?0:reversedVal;
}
  goSettings(){
    this.router.navigateByUrl('/settings')
  }
  goHome(){
    this.router.navigateByUrl('/home')
  }
  deleteCustomService(service){
    this.api.deleteCustomService(service.id).subscribe(()=>{
      this.custome_services=this.custome_services.filter((val)=>{return val.id!=service.id})
    }
    ,()=>{Notiflix.Notify.Failure("C'è stato un errore. Se continua a ripetersi chiama il 3312233645");})
  }
  updateCustomService(service){
    var price =  this.reverseFormatNumber(service.price_displ.slice(0,-2),'it')*100

    if(Number.isInteger(price)){
    this.api.updateCustomService(service.id,price,service.duration ).subscribe(
      (res:any)=>{
        Notiflix.Notify.Success("Modifiche salvate");
        res.price_displ = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(res.price/100)
        this.custome_services=this.custome_services.filter((val)=>{return val.id!=service.id})
        this.custome_services.unshift(res)
      }
      ,()=>{Notiflix.Notify.Failure("C'è stato un errore. Se continua a ripetersi chiama il 3312233645");})
    }else{
      Notiflix.Notify.Warning('Prezzo invalido');
    }
  }
  logout(){
    this.api.deleteAllData()
    this.router.navigateByUrl('login')
  }
}
