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
  ngOnInit() {
  }
  goLogin(){
    this.router.navigateByUrl('/login')
  }
  submit(){
    this.api.register(this.first_name, this.last_name, this.username, this.email, this.sex, this.phone, this.password).subscribe(
          data=>{
            this.api.storeToken(data.token)
            this.router.navigateByUrl('store/setup')
          },
          err => {
            console.log(err.error,'err')
          }
        )

  }
  
}
