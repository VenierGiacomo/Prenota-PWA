import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Notiflix from "notiflix";
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-reg-employee',
  templateUrl: './reg-employee.component.html',
  styleUrls: ['./reg-employee.component.scss']
})
export class RegEmployeeComponent implements OnInit {
  first_name = ''
  last_name = ''
  email = ''
  sex = 'm'
  phone = ''
  password =''

  first_name_err=''
  last_name_err=''
  email_err= ''
  phone_err= ''
  password_err=''
  constructor(private router:Router, private api:ApiService) { }

  ngOnInit(): void {
  }
  submit(){
    Notiflix.Block.Standard('.wrapper', 'Salvando dati...');     
      this.first_name_err = ''
      this.last_name_err = ''
      this.email_err = ''
      this.phone_err = ''
      this.password_err = ''
  
      if(this.first_name== ''){
        this.first_name_err = 'Inserisci il tuo nome'
      }
      if(this.last_name== ''){
        this.last_name_err = 'Inserisci il tuo cognome'
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
      if(this.first_name_err == '' && this.last_name_err == '' && this.email_err == '' && this.phone_err == '' && this.password_err == ''){
          this.api.registeremployee(this.first_name, this.last_name, this.email, this.sex, this.phone, this.password).subscribe(
                data=>{
                  this.api.storeToken(data.token)
                  this.router.navigateByUrl('home')
                },
                err => {
                  Notiflix.Block.Remove('.wrapper');
                  if (err.error.email != undefined){
                    this.email_err = 'Questa email è già stata utilizzata'
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
  goHome(){
    this.router.navigateByUrl('')
  }
}
