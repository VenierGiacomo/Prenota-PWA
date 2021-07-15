import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studio-di-unghie',
  templateUrl: './studio-di-unghie.component.html',
  styleUrls: ['./studio-di-unghie.component.scss']
})
export class StudioDiUnghieComponent implements OnInit {

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

    var title = this.doc.name + " - 💅🏼 Unghie a Trieste in "+ this.doc.address

    this.titleService.setTitle(title)
    var metaTags=[
      {property: 'og:url', content: url},
      {property: 'og:title', content: title},
      {property: 'og:description', content: this.doc.name +" studio specializzato in ricostruzione unghie ed applicazione gel semipermanente. Passa a trovarci in" + this.doc.address },
      {property: 'og:image', content: "'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      
      {name: 'keywords', content: this.doc.name+ ", "+ this.doc.name +" trieste," + this.doc.name +" unghie," + this.doc.name +" unghie trieste," +" unghie trieste"+ this.doc.address  +", "+" unghie "+ this.doc.address+ "trieste" +", unghie trieste, nails trieste, nails artist trieste, gel semipermanente trieste, ricostruzione unghie trieste, manicure trieste , Riscotruzione unghie trieste, unghie gel trieste,nails art trieste, applicazione smalto trieste,smalto semipermanente trieste, manicure trieste, pedicure trieste,  unghie artificali , unghie finte trieste, smalto acrilico trieste, onicotecnica unghie trieste, smalto permanente trieste"},
      {name: 'description', content: this.doc.name +" studio specializzato in ricostruzione unghie ed applicazione gel semipermanente. Passa a trovarci in" + this.doc.address },
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
   }
   eye_doctors=[
    {name:"MS Nails Art",address:"Via Molino a Vento 26/d, Trieste (TS)",phone:"+39 380 864 5039", verified:true, url:'/appuntamento/msnails', img:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/WhatsApp%20Image%202021-05-04%20at%2009.47.00.jpeg?alt=media&token=bcaaf4c6-fd2a-4cdc-b1d6-783f30805665'},
{name: "L' Oasi delle Unghie", address: "Via della Zonta 7/A,  Trieste TS", phone: "+39 340 943 2481", verified: false, url: "/unghie/trieste/L'%20Oasi%20delle%20Unghie/1"},
{name: "Gio Nails", address: "Via della Madonnina 1, Trieste (TS)", phone: "+39 347 362 9969", verified: false, url: "/unghie/trieste/Gio%20Nails/2"},
{name: "MNAILS di Monica Corona", address: "Via della Ginnastica 31/A, Trieste (TS)", phone: "+39 340 338 6818", verified: false, url: "/unghie/trieste/MNAILS%20di%20Monica%20Corona/3"},
{name: "La Vie En Rose", address: "Via Giuseppe Vidali 2/A, Trieste (TS)", phone: "+39 347 850 5086", verified: false, url: "/unghie/trieste/La%20Vie%20En%20Rose/4"},
{name: "Freack & Chic", address: "Via Fabio Severo 8, Trieste (TS)", phone: "+39 040 977 6932", verified: false, url: "/unghie/trieste/Freack%20%20Chic/5"},
{name: "Queen Salon Nails", address: "Via Ruggero Timeus 3,Trieste (TS)", phone: "+39 040 363712", verified: false, url: "/unghie/trieste/Queen%20Salon%20Nails/6"},
{name: "Desiderio nails", address: "Via XXIV Maggio 6, Trieste (TS)", phone: "+39 349 584 4508", verified: false, url: "/unghie/trieste/Desiderionails/7"},
{name: "Beauty and Shine", address: "Via della Ginnastica, 34, Trieste(TS)", phone: "+39 346 536 3774", verified: false, url: "/unghie/trieste/Beauty%20and%20Shine/8"},
{name: "Sara MLBN", address: "Via delle Settefontane 20, Trieste (TS)", phone: "+39 349 102 0651", verified: false, url: "/unghie/trieste/Sara%20MLBN/9"},
 {name: "Odibì by Officina della Bellezza", address: "Via S. Maurizio 3/B, Trieste (TS)", phone: "+39 040 203 8925", verified: false, url: "/unghie/trieste/Odib%C3%AC%20by%20Officina%20della%20Bellezza/10"},
 {name: "A La Femme Chic", address: "Via Emo Tarabochia 10, Trieste (TS)", phone: "+39 040 636776", verified: false, url: "/unghie/trieste/A%20La%20Femme%20Chic/11"},
 {name: "Good Nails", address: "Via Casimiro Donadoni 33c, Trieste (TS)", phone: "+39 351 747 0607", verified: false, url: "/unghie/trieste/Good%20Nails/12"},
 {name: "C & C Nail Style", address: "Via Milano 25/d, Trieste (TS)", phone: "+39 380 347 1143", verified: false, url: "/unghie/trieste/C%20%20C%20Nail%20Style/13"},
 {name: "Nail Art", address: "Via del Marcese, Trieste (TS)", phone: "+39 348 277 8710", verified: false, url: "/unghie/trieste/Nail%20Art/14"},
 {name: "BLU NAILS", address: "Via Carlo e Giani Stuparich 10, Trieste (TS)", phone: "+39 339 448 3597", verified: false, url: "/unghie/trieste/BLU%20NAILS/15"},
 {name: "Blue Nails", address: "Via Valmaura 11, , Trieste (TS)", phone: "+39 329 928 9089", verified: false, url: "/unghie/trieste/Blue%20Nails/16"},
 {name: "Mabel Nail Art", address: "Via Conti 8, Trieste (TS)", phone: "+39 346 320 3565", verified: false, url: "/unghie/trieste/Mabel%20Nail%20Art/17"},
 {name: "Centro Estetico Make Up", address: "Via Giosuè Carducci 39, Trieste (TS)", phone: "+39 040 636774", verified: false, url: "/unghie/trieste/Centro%20Estetico%20Make%20Up/18"},
 {name: "Marilyn Beauty Studio", address: "Via Mazzini 49, Trieste(TS)", phone: "+39 040 260 5529", verified: false, url: "/unghie/trieste/Marilyn%20Beauty%20Studio/19"},
 {name: "Diva beauty & nails", address: "Via Ugo Polonio 3, Trieste (TS)", phone: "+39 327 813 1203", verified: false, url: "/unghie/trieste/Diva%20beauty%20%20nails/20"},
 {name: "Pink Luna", address: "Via S. Marco 51, Trieste (TS)", phone: "+39 040 348 0835", verified: false, url: "/unghie/trieste/Pink%20Luna/21"},
 {name: "Crystal Nails Trieste", address: "Via Gabriele Foschiatti 1f, Trieste (TS)", phone: "+39 040 064 0237", verified: false, url: "/unghie/trieste/Crystal%20Nails%20Trieste/22"},
 {name: "Look Me Trieste", address: "Via Paduina 6, Trieste (TS)", phone: "+39 392 835 9851", verified: false, url: "/unghie/trieste/Look%20Me%20Trieste/23"},
 {name: "Estetica Cinderella", address: "Viale XX Settembre 53, Trieste (TS)", phone: "+39 040 573322", verified: false, url: "/unghie/trieste/Estetica%20Cinderella/24"},
 {name: "Atlantide Centro Estetico Abbronzatura", address: "Via Fabio Severo 113, Trieste (TS)", phone: "+39 040 567856", verified: false, url: "/unghie/trieste/Atlantide%20Centro%20Estetico%20Abbronzatura/25"},
 {name: "Non Solo Estetica", address: "Foro Ulpiano 6, Trieste (TS)", phone: "+39 040 371452", verified: false, url: "/unghie/trieste/Non%20Solo%20Estetica/26"},
 {name: "Alma Hila nail art", address: "Via S. Lazzaro 20, Trieste (TS)", phone: "+39 324 815 4680", verified: false, url: "/unghie/trieste/Alma%20Hila%20nail%20art/27"},
 {name: "Centro Estetico Ludmila Trieste", address: "Via Giuseppe Parini 8, Trieste (TS)", phone: "+39 040 636912", verified: false, url: "/unghie/trieste/Centro%20Estetico%20Ludmila%20Trieste/28"},
 {name: "Paola Cat Nail Design", address: "Via dei Giuliani 17, Trieste (TS)", phone: "+39 340 075 1115", verified: false, url: "/unghie/trieste/Paola%20Cat%20Nail%20Design/29"},
 {name: "DB Nails", address: "Via Valdirivo 34, Trieste(TS)", phone: "+39 347 066 9541", verified: false, url: "/unghie/trieste/DB%20Nails/30"},
 {name: "Victory Nail Art", address: "Via della Raffineria 5, Trieste (TS)", phone: "+39 345 335 4777", verified: false, url: "/unghie/trieste/Victory%20Nail%20Art/31"},
 {name: "Estetique B&B", address: "Via S. Nicolò 22/B, Trieste (TS)", phone: "+39 040 233 7229", verified: false, url: "/unghie/trieste/Estetique%20B&B/32"},
 {name: "L'Angolo di Spazio Samsara", address: "Via Francesco Crispi 14, Trieste (TS)", phone: "+39 334 225 4129", verified: false, url: "/unghie/trieste/L'Angolo%20di%20Spazio%20Samsara/33"},
 {name: "Centro Estetico Essentiel", address: "Androna Del Torchio 1, Trieste (TS)", phone: "+39 040 411057", verified: false, url: "/unghie/trieste/Centro%20Estetico%20Essentiel/34"},
 {name: "Centro Estetico Beauty Time", address: "Piazza Giuseppe Garibaldi 3/B, Trieste (TS)", phone: "+39 040 265 1029", verified: false, url: "/unghie/trieste/Centro%20Estetico%20Beauty%20Time/35"},
 {name: "Estetica Vanità", address: "Via della Madonnina 24/A, Trieste (TS)", phone: "+39 040 766980", verified: false, url: "/unghie/trieste/Estetica%20Vanit%C3%A0/36"},
 {name: "Beauty Lodge di Larysa", address: "Via Trenta Ottobre 4, Trieste (TS)", phone: "+39 393 457 7565", verified: false, url: "/unghie/trieste/Beauty%20Lodge%20di%20Larysa/37"},
 {name: "Plan B - Nail Art", address: "Via Androna Chiusa 2, Trieste (TS)", phone: "+39 380 582 9653", verified: false, url: "/unghie/trieste/Plan%20B%20-%20Nail%20Art/38"},
 {name: "Estetica Integrata – Centro Estetico", address: "Via Genova 8, Trieste (TS)", phone: "+39 334 626 7695", verified: false, url: "/unghie/trieste/Estetica%20Integrata%20%E2%80%93%20Centro%20Estetico/39"},
 {name: "Istituto Di Bellezza Mariagrazia", address: "Via Malcanton 16, Trieste (TS)", phone: "+39 040 631742", verified: false, url: "/unghie/trieste/Istituto%20Di%20Bellezza%20Mariagrazia/40"},
 {name: "Estetica Charme", address: "Via delle Settefontane 4, Trieste(TS)", phone: "+39 329 097 5674", verified: false, url: "/unghie/trieste/Estetica%20Charme/41"},
 {name: "B.Lab", address: "Via dei Giacinti 30/c, Trieste (TS)", phone: "+39 347 897 5320", verified: false, url: "/unghie/trieste/B.Lab/42"},
 {name: "Amazing Nails", address: "Via san Francesco 28/a, Trieste (TS)", phone: "+39 340 399 6100", verified: false, url: "/unghie/trieste/Amazing%20Nails/43"},

    {name:"Valentina Vision",address:"Strada Vecchia dell'Istria 84, Trieste (TS)",phone:"+39 334 352 9624", verified:false, url: "/unghie/trieste/Valentina%20Vision/44"},
    {name:"Magic Nails",address:"Corso Italia 26, Trieste (TS)",phone:'+39 366 291 1184', verified:false, url: "/unghie/trieste/Magic%20Nails/45"},
  ]
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
