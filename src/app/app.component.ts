import { Component } from '@angular/core';
// import { ConnectionService } from 'ng-connection-service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'calendarapp';
  // isConnected = true
  // private connectionService:ConnectionService
  constructor(){}
  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
//     this.connectionService.monitor().subscribe(isConnected => {
//       console.log(isConnected)
//     this.isConnected = isConnected;
//     });
//     }
// }
}