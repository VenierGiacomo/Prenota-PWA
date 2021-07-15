import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getapp',
  templateUrl: './getapp.component.html',
  styleUrls: ['./getapp.component.scss']
})
export class GetappComponent implements OnInit {
  first_name
  last_name
  email
  phone
  store
  emoji = String.fromCodePoint(0x1F60A)
  emoji_devil = String.fromCodePoint(0x1F608)
  emoji_love = String.fromCodePoint(0x1F970)
  left_1 ='3vw'
  left_2='100vw'
  left_3='100vw'
  left_4='100vw'
  vis_1='visible'
  vis_2='hidden'
  vis_3='hidden'
  vis_4='hidden'
  ngOnInit(): void {
    this.getApp()

   
    setInterval(()=>{
      if(this.left_1 =='3vw'){
        this.vis_2='visible'
        this.left_1 ='-100vw'
        this.left_2='3vw'
        this.left_3='100vw'
        this.left_4='100vw'
        setTimeout(()=>{
          
          this.vis_1='hidden'
          
        },600)
      }else{
        if(this.left_2 =='3vw'){
          this.vis_3='visible'
          this.left_1 ='100vw'
          this.left_2='-100vw'
          this.left_3='3vw'
          this.left_4='100vw'
          setTimeout(()=>{
            this.vis_2='hidden'
          },600)
        }else{
          if(this.left_3 =='3vw'){
            this.vis_4='visible'
            this.left_1 ='100vw'
            this.left_2='100vw'
            this.left_3='-100vw'
            this.left_4='3vw'
            setTimeout(()=>{
            this.vis_3='hidden'
    
            },600)
          }else{
            if(this.left_4 =='3vw'){
              this.vis_1='visible'
              this.left_1 ='3vw'
              this.left_2='100vw'
              this.left_3='100vw'
              this.left_4='-100vw'
              setTimeout(()=>{
              this.vis_4='hidden'
      
              },600)
            }
          }
        }
      }
      
    },4000)
  }
  getApp(){
    var userAgent = navigator.userAgent || navigator.vendor ;
  if (/android/i.test(userAgent)) {
    window.location.href="http://play.google.com/store/apps/details?id=io.prenota.client"
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    window.location.href="https://apps.apple.com/app/id1523525291"
  }
  }
  autoLogin(){
    window.location.href= "https://mobile.prenota.cc/register/"+this.first_name+'/'+this.last_name+'/'+this.email+'/'+this.phone
  }
}
