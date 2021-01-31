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
  async navListing(){
    if(await this.mobileCheck()){
      window.location.href = 'https://mobile.prenota.cc'
    }else{
      this.router.navigateByUrl('home/ricerca')
    }
    
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
  goResetPassword(){
    window.open('https://giacomovenier.pythonanywhere.com/api/auth/reset_password','_blank')
  }

  
mobileCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
  return check;
};

}
