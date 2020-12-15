import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { ApiService } from '../services/api.service';
import Notiflix from "notiflix";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
logged = false
error=''
email=''
password=''
note=''
appo:any
register_form='none'
appointments_list:any = []
months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  constructor(private router:Router,private api: ApiService ) { }

  ngOnInit() {
    const token = this.api.getToken()
    if (token) {
        var l = this.parseJwt(token) 
        var exp = 1000*l.exp
        var now = +new Date()
        if (now < exp){ 
            this.logged = true
            this.getAppointmets()
        }
        else{
         
          this.logged = false
        }
    } else {
       
      this.logged = false
    }
  }

  parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
    };
  navListing(){
    this.router.navigateByUrl('home/ricerca')
  }
  deletestorage(appo){
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()
    const date1:any = new Date(year,month,day,0,0,0,0);
    const date2:any = new Date(appo.year, appo.month, appo.day,0,0,0,0);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    var self = this
    if(diffDays>=3){
      Notiflix.Confirm.Init({ titleColor:"#ac1a00",okButtonBackground:"#ac1a00",cancelButtonBackground:"#d6d2d2", messageMaxLength:200, plainText:false }); 
      Notiflix.Confirm.Show( "Vuoi cancellare l'appuntamento?", `Sei sicuro di voler cancellare l'appuntamento fissato per il ${appo.day} ${this.months_names[appo.month]} ${appo.year} alle ore ${this.rows[appo.start]} presso ${appo.store_name}`, 'Cancella', 'Indietro',
      function(){ // Yes button callback 
        self.api.deleteAppointment(appo.id).subscribe(data=>{
            self.getAppointmets()
            Notiflix.Report.Success("Appuntamento cancellato", "L'appuntamento è stato cancellato con successo!", 'Continua')
          },err=>{
            Notiflix.Report.Failure("Errore durante la cancellazione", "L'appuntamento non è stato cancellato. Controlla la tua connessione e riprova.", 'Annulla');
          })}, 
       function(){ // No button callback 
         } ); 
    }else{
    this.handelNotdelete(appo)
    }
   
    
  }
  AddNote(appo){
   this.appo=appo 
    this.register_form='block'
  }
  updateAppo(){

    console.log(this.appo,this.note)
    this.api.updateAppointment(this.appo.id, this.appo.start, this.appo.end, this.appo.day, this.appo.month, this.appo.year, this.appo.client_name, this.appo.phone, this.appo.details, this.appo.employee, this.appo.service_n, this.note).subscribe(data =>{
      Notiflix.Notify.Success('Modifiche salvate con successo');
      this.register_form='none'
    },err=>{
      Notiflix.Notify.Failure("C'è stato un problema durante il salvataggio");
      console.log(err)
    })
  }
  async  handelNotdelete(appo) {
    Notiflix.Confirm.Init({ titleColor:"#00479D",okButtonBackground:"#00479D",cancelButtonBackground:"#d0d0d0", cancelButtonColor:"#00479D", messageMaxLength:200,plainText:false}); 
    Notiflix.Confirm.Show( "Impossibile cancellare", `Mancano meno di 48h all' appuntamento. <br><br> Non è più possibile cancellarlo dal sito. <br><br> Puoi sempre chiamare lo studio. +39${appo.store_phone}`, 'Chiama', 'Indietro',
     function(){ // Yes button callback 
      window.open(`tel:+39${appo.store_phone}`)}, 
     function(){ // No button callback 
     }); 
  }
  async login(){
    this.error=''
    await this.api.deleteAllData()
    this.api.login(this.email,this.password).subscribe(
      data=>{
        this.api.storeToken(data.token) 
        // this.router.navigateByUrl('i_miei_appuntamenti')    
        this.logged = true
        this.getAppointmets()
      },
      err => {
        this.error = 'La password o la email che hai inserito non sono valide'
        console.log(err.error,'err')
      }
    )
  }
  getAppointmets(){
    this.api.getClientAppointments().subscribe(async data=>{
      this.appointments_list = await data
    },err=>{
      console.log(err)
    })
  }
  logout(){
    this.api.deleteAllData()
    this.logged = false
  }
}
