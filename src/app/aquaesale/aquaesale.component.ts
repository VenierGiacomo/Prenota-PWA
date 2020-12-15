import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-aquaesale',
  templateUrl: './aquaesale.component.html',
  styleUrls: ['./aquaesale.component.scss']
})
export class AquaesaleComponent implements OnInit {
    constructor() {}
    websocket
    wsUri
    output
    message='custom message'
ngOnInit(){
    var storedtoken = JSON.parse(localStorage.getItem('token'));
    this.wsUri = 'ws://127.0.0.1:8000/cazzo/'+storedtoken.token+'/'
    this.output = document.getElementById("output");
    this.testwebsocket();
}

testwebsocket()
{
  this.websocket = new WebSocket(this.wsUri);
  var self =this
  this.websocket.onopen = function(evt) { self.onOpen(evt) };
  this.websocket.onclose = function(evt) { self.onClose(evt) };
  this.websocket.onmessage = function(evt) { self.onMessage(evt) };
  this.websocket.onerror = function(evt) { self.onError(evt) };
}
async sendMessage(){
  var storedtoken = JSON.parse(localStorage.getItem('token'));
  await this.doSend(storedtoken.token)
}
onOpen(evt)
{
  console.log('open',evt)
}

onClose(evt)
{
  console.log('close',evt)
}

onMessage(evt)
{
  console.log('message',evt)
}

onError(evt)
{
  console.log('err',evt)
}

doSend(message)
{
  this.websocket.send(message);
}


}