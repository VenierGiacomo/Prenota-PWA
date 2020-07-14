import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
spin="block"
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
setTimeout(() => {
  this.spin="none"
}, 1000);
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
}
