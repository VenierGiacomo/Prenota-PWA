import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email=''
  password=''
  constructor(private router: Router, private api: ApiService, private storage: StorageService) { }

  ngOnInit() {
    console.log(new Date(1589528118*1000))
  }

  goRegister(){
    this.router.navigateByUrl('/register')
  }

  login(){

  this.api.login(this.email,this.password).subscribe(
    data=>{
      this.api.storeToken(data.token)
      // console.log(JSON.parse(atob(data.token.split('.')[1])))
      this.router.navigateByUrl('')    
    },
    err => {
      console.log(err.error,'err')
    }
  )
}
}
