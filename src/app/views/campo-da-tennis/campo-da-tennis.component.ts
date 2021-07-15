import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campo-da-tennis',
  templateUrl: './campo-da-tennis.component.html',
  styleUrls: ['./campo-da-tennis.component.scss']
})
export class CampoDaTennisComponent implements OnInit {

  eye_doctors=[
    {name:"Circolo Tennis Grignano",address:"Via Junker 8, Trieste (TS)",phone:"+39 040 224361", verified:true, url:'/appuntamento/Tennis_Grignano',img:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/nuovo%20copy.jpg?alt=media&token=5c103439-263b-4825-ae28-dfbc0ae5332f'},
    {name: "Circolo Marina Mercantile", address: "V.le Miramare 40,  rieste (TS)", phone: "+39 040 412327", verified: false, url: "/campi_da_calcetto/trieste/Circolo%20Marina%20Mercantile/1"},
    {name: "Tennis Club Campi Rossi", address: "Borgo Grotta Gigante 42/B, Sgonico (TS)", phone: "+39 040 327309", verified: false, url: "/campi_da_calcetto/trieste/Tennis%20Club%20Campi%20Rossi/2"},
    {name: "Campo Cologna UISP", address: "Via Cesare Beccaria 6, Trieste (TS)", phone: "+39 040 639382", verified: false, url: "/campi_da_calcetto/trieste/Campo%20Cologna%20UISP/3"},
    {name: "Circolo Tennis Ferriera di Servola", address: "Via S. Lorenzo in Selva 162, Trieste (TS)", phone: "+39 040 821436", verified: false, url: "/campi_da_calcetto/trieste/Circolo%20Tennis%20Ferriera%20di%20Servola/4"},
    {name: "Tennis Club Triestino", address: "Località Padriciano, 175,  Trieste (TS)", phone: "+39 040 226179", verified: false, url: "/campi_da_calcetto/trieste/Tennis%20Club%20Triestino/5"},
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

    var title = this.doc.name + " - 🎾 Campo da tennis a Trieste in "+ this.doc.address

    this.titleService.setTitle(title)
    var metaTags=[
      {property: 'og:url', content: url},
      {property: 'og:title', content: title},
      {property: 'og:description', content: this.doc.name+ " - Campo da tennis a Trieste. Leggi le info  i dati ed il numero di telefono. Prenota online"},
      {property: 'og:image', content: "'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: 'keywords', content: this.doc.name+ ", "+ this.doc.name +" trieste, campo tennis trieste, campo tennis, campo da tennis, campo da tennis trieste, campo da tennis "+ this.doc.address + " ,campo da tennis in "+ this.doc.address +" , campi da tennis, campi da tennis trieste, campi da tennis in terra, campi da tennis in terra trieste, campi in erba, campi in erba trieste, campi in erba tennis trieste"},
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
