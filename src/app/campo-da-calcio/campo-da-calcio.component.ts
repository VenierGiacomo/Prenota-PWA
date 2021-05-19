import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campo-da-calcio',
  templateUrl: './campo-da-calcio.component.html',
  styleUrls: ['./campo-da-calcio.component.scss']
})
export class CampoDaCalcioComponent implements OnInit {


  eye_doctors=[
    {name:"Campo Oratorio Montuzza",address:"Via Tommaso Grossi, 4, 34131 Trieste (TS)",phone:"+39 040 308814", verified:true, url:"https://prenota.cc/appuntamento/montuzza",img:"https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/WhatsApp%20Image%202021-01-26%20at%2016.45.56.jpeg?alt=media&token=3a2001e9-6a5e-4d4c-9805-9d5fc36326b3"},
    {name:"Campo Fani Olimpia",address:"Via Pascoli 31 /A, Trieste (TS)",phone:"+39 040 360407", verified:true, url:"https://prenota.cc/appuntamento/faniolimpia",img:"https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/fani.jpg?alt=media&token=238ce5c2-6a44-49a7-bdab-5a629e26ea71"},
    {name:"Campo Trifoglio",address:"Via delle Campanelle 266, Trieste (TS)",phone:"+39 040 568474", verified:true, url:"https://prenota.cc/appuntamento/trifoglio",img:"https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/green-leaf-clover-logo.jpg?alt=media&token=5fe3a337-ce10-4b44-9a1a-94b698fb1d24"},
{name: "Campo Roianese", address: "Viale Miramare 79, Trieste TS", phone: "+39 040 43048", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Roianese/3"},
{name: "Campo Montebello Don Bosco", address: "Largo della Barriera Vecchia 13, Trieste (TS)", phone: "+39 040 947322", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Montebello%20Don%20Bosco%20Trieste/4"},
{name: "Campo di Giarizzole", address: "Via San Pantaleone, 5, Trieste (TS)", phone: "+39 040 812217", verified: false, url: "/campi_da_calcetto/trieste/Campo%20di%20Giarizzole/5"},
 {name: "Campo Chiarbola", address: "Via Umago 5, Trieste (TS)", phone: "+39 040 827377", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Chiarbola/6"},
 {name: "Campo Polisportiva Opicina", address: "Via degli Alpini 128, Trieste (TS)", phone: "+39 040 212105", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Polisportiva%20Opicina/7"},
 {name: "Campo di Trebiciano", address: "SP1, Trebiciano CAMPO SPORTIVO PRIMOREC (TS)", phone: "+39 347 5815978", verified: false, url: "/campi_da_calcetto/trieste/Campo%20di%20Trebiciano/8"},
 {name: "Campo di Altura", address: "Via Suppan 23, Trieste (TS)", phone: "+39 340 3195304", verified: false, url: "/campi_da_calcetto/trieste/Campo%20di%20Altura/9"},
{name: "Campo San Luigi", address: "Via Felluga Umberto 58, Trieste (TS)", phone: "+39 040946694", verified: false, url: "/campi_da_calcetto/trieste/Campo%20San%20Luigi/10"},
 {name: "Campo di Villa Ara", address: "Via Monte Cengio, 22, 34127 Trieste (TS)", phone: "+39 040 568474", verified: false, url: "/campi_da_calcetto/trieste/Campo%20di%20Villa%20Ara/11"},
 {name: "Campo Trieste Calcio", address: "Via Laura Silvano Petracco 8, Trieste (TS)", phone: "+39 040 824666", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Trieste%20Calcio/12"},
 {name: "Campo Costalunga", address: "Via Santa Maria Maddalena 6, Trieste (TS)", phone: "+39 040 2411404", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Costalunga/13"},
{name: "Campo Soncini", address: "Via dei Soncini 30, Trieste (TS)", phone: "+39 348 799 4992", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Soncini/14"},
 {name: "Campo di Borgo San Sergio Alta", address: "via Bruno Buozzi 6, Trieste (TS)", phone: "+39 392 3808216", verified: false, url: "/campi_da_calcetto/trieste/Campo%20di%20Borgo%20San%20Sergio%20Alta/15"},
 {name: "Campo Dopolavoro Ferroviario Trieste", address: "Scala al Belvedere 1, Trieste (TS)", phone: "+39 040660329", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Dopolavoro%20Ferroviario%20Trieste/16"},
{name: "Campo Oratorio Salesiano", address: "Via dell'Istria 53, Trieste (TS)", phone: "+39 040638526", url: "/campi_da_calcetto/trieste/Campo%20Oratorio%20Salesiano/17", verified: false},
]
doc
phone="Mostra il numero di telefono"
gmaps_url =''
  constructor(private router: Router, private metaService: Meta, private titleService: Title) {
    var url
    if(this.router.url.includes('?')){
      url = this.router.url.split('?')[0].split('/')
    }else{
      url= this.router.url.split('/')
    }
    var indx = url[url.length-1]
    this.doc=this.eye_doctors[indx]
    var street_url = encodeURI(this.doc.address)
    
    this.gmaps_url=`https://maps.google.com/maps?q=${street_url}%20trieste&t=&z=15&ie=UTF8&iwloc=&output=embed`

    var title = this.doc.name + " - ⚽ Campo da calcio a Trieste in "+ this.doc.address

    this.titleService.setTitle(title)
    var metaTags=[
      {property: 'og:url', content: url},
      {property: 'og:title', content: title},
      {property: 'og:description', content: this.doc.name+ " - ⚽ Campo da calcetto a Trieste. Leggi le info  i dati ed il numero di telefono. Prenota online"},
      {property: 'og:image', content: "'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: 'keywords', content: this.doc.name+ ", "+ this.doc.name +" trieste, campo calcetto trieste, campi da calcio a trieste, campi da calcietto a trieste, campi da calcietto a ciqnue trieste, campi da calcietto a 5 trieste, campi da calcietto a sette trieste, campi da calcietto a 7 trieste",},
      {name: 'description', content: this.doc.name+ " - Campo da calcetto a Trieste. Leggi le info  i dati ed il numero di telefono. Prenota online"},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
   }

  ngOnInit(): void {
    var map_html =`
    <div class="gmap_canvas">
    <iframe width="400" height="250" id="gmap_canvas" src="${this.gmaps_url}" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div>`
    document.getElementById('map_cont').innerHTML=map_html
  }
  displayPhone(){
   if(this.phone=="Mostra il numero di telefono"){
     this.phone=this.doc.phone
   }else{
    this.phone="Mostra il numero di telefono"
   }
  }

}
