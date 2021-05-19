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
  constructor(){
    var root = document.documentElement;
    var height = window.outerHeight
    console.log(height)
    root.style.setProperty('--full-heigth', height +'px' );
    root.style.setProperty('--40-full-heigth', (height*0.2) +'px' );
    root.style.setProperty('--full-80-heigth', (height*0.8) +'px' );
    root.style.setProperty('--120-full-heigth', (height*1.2) +'px' );
    root.style.setProperty('--full-heigth-90',  (height-90)+'px');
  }
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