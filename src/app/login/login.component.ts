import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email=''
  password=''
  error= ''
  constructor(private router: Router, private api: ApiService, private storage: StorageService, private titleService: Title) {
    this.titleService.setTitle( "Prenota: Fai il login e utilizza la tua agenda");
   }
  ngOnInit() {
  }

  goRegister(){
    this.router.navigateByUrl('/register')
  }

  async login(){
  this.error=''
  await this.api.deleteAllData()
  this.api.login(this.email,this.password).subscribe(
    data=>{
      this.api.storeToken(data.token) 
      this.router.navigateByUrl('loading')    
    },
    err => {
      this.error = 'La password o la email che hai inserito non sono valide'
      console.log(err.error,'err')
    }
  )
}
goHome(){
  this.router.navigateByUrl('')
}
}
