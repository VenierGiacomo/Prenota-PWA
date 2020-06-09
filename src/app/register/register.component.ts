import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private api: ApiService, private storage: StorageService, private router: Router) { }
  first_name = ''
  last_name = ''
  username = ''
  email = ''
  sex = 'm'
  phone = ''
  password =''

  first_name_err=''
  last_name_err=''
  username_err= ''
  email_err= ''
  phone_err= ''
  password_err=''
  ngOnInit() {
  }
  goLogin(){
    this.router.navigateByUrl('/login')
  }
  submit(){
    this.first_name_err = ''
    this.last_name_err = ''
    this.username_err = ''
    this.email_err = ''
    this.phone_err = ''
    this.password_err = ''

    if(this.first_name== ''){
      this.first_name_err = 'Inserisci il tuo nome'
    }
    if(this.last_name== ''){
      this.last_name_err = 'Inserisci il tuo cognome'
    }
    if(this.username== ''){
      this.username_err = 'Inserisci il tuo username'
    }
    if(this.email== ''){
      this.email_err = 'Inserisci la tua email'
    }
    if(this.phone== ''){
      this.phone_err = 'Inserisci il tuo numero di telefono'
    }
    if(this.password== ''){
      this.password_err = 'Inserisci una password'
    }
    if(this.first_name_err == '' && this.last_name_err == '' && this.username_err == '' && this.email_err == '' && this.phone_err == '' && this.password_err == ''){
      this.api.register(this.first_name, this.last_name, this.username, this.email, this.sex, this.phone, this.password).subscribe(
        data=>{
          this.api.storeToken(data.token)
          this.router.navigateByUrl('store/setup')
        },
        err => {
          if (err.error.email != undefined){
            this.email_err = 'Questa email è già stata utilizzata'
          }
          if (err.error.username != undefined){
            this.username_err = 'Questo username è già stato utilizzato'
          }
          if (err.error.password != undefined){
            this.password_err = 'Questa password è troppo semplice. Prova ad aggiungere dei numeri'
          }
          console.log(err.error.password)
          console.log(err.error,'err')
        }
      )
    }
    

  }
  
}
