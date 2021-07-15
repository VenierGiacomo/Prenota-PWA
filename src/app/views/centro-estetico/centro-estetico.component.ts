import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro-estetico',
  templateUrl: './centro-estetico.component.html',
  styleUrls: ['./centro-estetico.component.scss']
})
export class CentroEsteticoComponent implements OnInit {

  eye_doctors=[
    {name: "Beauty and Shine", address: "Via della Ginnastica, 34, Trieste(TS)", phone: "+39 346 536 3774", verified: false, url: "/estetista/trieste/Beauty%20and%20Shine/0"},
    {name: "Odibì by Officina della Bellezza", address: "Via S. Maurizio 3/B, Trieste (TS)", phone: "+39 040 203 8925", verified: false, url: "/estetista/trieste/Odib%C3%AC%20by%20Officina%20della%20Bellezza/1"},
    {name: "A La Femme Chic", address: "Via Emo Tarabochia 10, Trieste (TS)", phone: "+39 040 636776", verified: false, url: "/estetista/trieste/A%20La%20Femme%20Chic/2"},
    {name: "Centro Estetico Make Up", address: "Via Giosuè Carducci 39, Trieste (TS)", phone: "+39 040 636774", verified: false, url: "/estetista/trieste/Centro%20Estetico%20Make%20Up/3"},
    {name: "Marilyn Beauty Studio", address: "Via Mazzini 49, Trieste(TS)", phone: "+39 040 260 5529", verified: false, url: "/estetista/trieste/Marilyn%20Beauty%20Studio/4"},
    {name: "Diva beauty & nails", address: "Via Ugo Polonio 3, Trieste (TS)", phone: "+39 327 813 1203", verified: false, url: "/estetista/trieste/Diva%20beauty%20%20nails/5"},
    {name: "Pink Luna", address: "Via S. Marco 51, Trieste (TS)", phone: "+39 040 348 0835", verified: false, url: "/estetista/trieste/Pink%20Luna/6"},
    {name: "Look Me Trieste", address: "Via Paduina 6, Trieste (TS)", phone: "+39 392 835 9851", verified: false, url: "/estetista/trieste/Look%20Me%20Trieste/7"},
    {name: "Estetica Cinderella", address: "Viale XX Settembre 53, Trieste (TS)", phone: "+39 040 573322", verified: false, url: "/estetista/trieste/Estetica%20Cinderella/8"},
    {name: "Atlantide Centro Estetico Abbronzatura", address: "Via Fabio Severo 113, Trieste (TS)", phone: "+39 040 567856", verified: false, url: "/estetista/trieste/Atlantide%20Centro%20Estetico%20Abbronzatura/9"},
     {name: "Non Solo Estetica", address: "Foro Ulpiano 6, Trieste (TS)", phone: "+39 040 371452", verified: false, url: "/estetista/trieste/Non%20Solo%20Estetica/10"},
     {name: "Centro Estetico Ludmila Trieste", address: "Via Giuseppe Parini 8, Trieste (TS)", phone: "+39 040 636912", verified: false, url: "/estetista/trieste/Centro%20Estetico%20Ludmila%20Trieste/11"},
     {name: "Estetique B&B", address: "Via S. Nicolò 22/B, Trieste (TS)", phone: "+39 040 233 7229", verified: false, url: "/estetista/trieste/Estetique%20B&B/12"},
     {name: "L'Angolo di Spazio Samsara", address: "Via Francesco Crispi 14, Trieste (TS)", phone: "+39 334 225 4129", verified: false, url: "/estetista/trieste/L'Angolo%20di%20Spazio%20Samsara/13"},
     {name: "Centro Estetico Essentiel", address: "Androna Del Torchio 1, Trieste (TS)", phone: "+39 040 411057", verified: false, url: "/estetista/trieste/Centro%20Estetico%20Essentiel/14"},
     {name: "Centro Estetico Beauty Time", address: "Piazza Giuseppe Garibaldi 3/B, Trieste (TS)", phone: "+39 040 265 1029", verified: false, url: "/estetista/trieste/Centro%20Estetico%20Beauty%20Time/15"},
     {name: "Estetica Vanità", address: "Via della Madonnina 24/A, Trieste (TS)", phone: "+39 040 766980", verified: false, url: "/estetista/trieste/Estetica%20Vanit%C3%A0/16"},
     {name: "Beauty Lodge di Larysa", address: "Via Trenta Ottobre 4, Trieste (TS)", phone: "+39 393 457 7565", verified: false, url: "/estetista/trieste/Beauty%20Lodge%20di%20Larysa/17"},
     {name: "Estetica Integrata – Centro Estetico", address: "Via Genova 8, Trieste (TS)", phone: "+39 334 626 7695", verified: false, url: "/estetista/trieste/Estetica%20Integrata%20%E2%80%93%20Centro%20Estetico/18"},
     {name: "Istituto Di Bellezza Mariagrazia", address: "Via Malcanton 16, Trieste (TS)", phone: "+39 040 631742", verified: false, url: "/estetista/trieste/Istituto%20Di%20Bellezza%20Mariagrazia/19"},
     {name: "Estetica Charme", address: "Via delle Settefontane 4, Trieste(TS)", phone: "+39 329 097 5674", verified: false, url: "/estetista/trieste/Estetica%20Charme/20"},
     {name: "B.Lab", address: "Via dei Giacinti 30/c, Trieste (TS)", phone: "+39 347 897 5320", verified: false, url: "/estetista/trieste/B.Lab/21"},
     {name: "Estetica Aphrodite", address: "Via del Coroneo 1, Trieste(TS)", phone: "+39 040 064 4837", verified: false, url: "/estetista/trieste/Estetica%20Aphrodite/22"},
     {name: "Centro estetico Summerland", address: "Via Massimo D'Azeglio 22/a, Trieste (TS)", phone: "+39 040 349 8296", verified: false, url: "/estetista/trieste/Centro%20estetico%20Summerland/23"},
     {name: "Ashram Il Tempio del Benessere", address: "Via Giosuè Carducci 30, Trieste (TS)", phone: "+39 040 519 9715", verified: false, url: "/estetista/trieste/Ashram%20Il%20Tempio%20del%20Benessere/24"},
     {name: "Estetica Mediterranea Di Tomsic Cristina", address: "Via Galileo Galilei 11, Trieste (TS)", phone: "+39 040 578715", verified: false, url: "/estetista/trieste/Estetica%20Mediterranea%20Di%20Tomsic%20Cristina/25"},
     {name: "Estetica Natali", address: "Via della Ginnastica 41b, Trieste(TS)", phone: "+39 333 308 6769", verified: false, url: "/estetista/trieste/Estetica%20Natali/26"},
     {name: "Coccole & Benessere", address: "Via S. Maurizio 16b, Trieste (TS)", phone: "+39 320 474 8465", verified: false, url: "/estetista/trieste/Coccole%20%20Benessere/27"},
     {name: "La Mia Estetica", address: "Via Guido Zanetti, 1 Trieste (TS)", phone: "+39 328 320 9856", verified: false, url: "/estetista/trieste/La%20Mia%20Estetica/28"},
     {name: "Estetica Dimensione Alfa", address: "Corso Umberto Saba 28, Trieste (TS)", phone: "+39 040 636850", verified: false, url: "/estetista/trieste/Estetica%20Dimensione%20Alfa/29"},
     {name: "Estetica Sagittario", address: "Via Pier Luigi Da Palestrina 3, Trieste (TS)", phone: "+39 040 635812", verified: false, url: "/estetista/trieste/Estetica%20Sagittario/30"},
     {name: "Elite l'essenza del benessere", address: "Via Giacinto Gallina 3, Trieste (TS)", phone: "+39 040 760 0292", verified: false, url: "/estetista/trieste/Elite%20l'essenza%20del%20benessere/31"},
     {name: "Estetica Beauty Flower", address: "Via dei Piccardi 23, Trieste (TS)", phone: "+39 040 949 8136", verified: false, url: "/estetista/trieste/Estetica%20Beauty%20Flower/32"},
     {name: "Estetica Donna", address: "Via del Ponzanino 12/c, Trieste (TS)", phone: "+39 040 366284", verified: false, url: "/estetista/trieste/Estetica%20Donna/33"},
     {name: "Centro Estetico Joy", address: "Corso Italia 7, Trieste (TS)", phone: "+39 392 537 5708", verified: false, url: "/estetista/trieste/Centro%20Estetico%20Joy/34"},
     {name: "L'Angolo del Benessere", address: "Largo Don Francesco Bonifacio 1, Trieste (TS)", phone: "+39 347 003 9257", verified: false, url: "/estetista/trieste/L'Angolo%20del%20Benessere/35"},
     {name: "SunShine Élite", address: "Via Mazzini 16, Trieste (TS)", phone: "+39 040 341 9218", verified: false, url: "/estetista/trieste/SunShine%20%C3%89lite/36"},
     {name: "Centro Estetico e Benessere - IRENE", address: "Via Genova 14, Trieste (TS)", phone: "+39 040 634379", verified: false, url: "/estetista/trieste/Centro%20Estetico%20e%20Benessere%20-%20IRENE/37"},
     {name: "Estetica Sara", address: "Via Milano 17, Trieste (TS)", phone: "+39 040 347 8125", verified: false, url: "/estetista/trieste/Estetica%20Sara/38"},
     {name: "Centro Estetico Dhb", address: "Via Lorenzo Lorenzetti 7, Trieste (TS)", phone: "+39 338 474 8396", verified: false, url: "/estetista/trieste/Centro%20Estetico%20Dhb/39"},
     {name: "Estetica Essere", address: "Via del Rivo 42, Trieste (TS)", phone: "+39 040 760 0694", verified: false, url: "/estetista/trieste/Estetica%20Essere/40"},
     {name: "Beautyque", address: "Via S. Francesco D'Assisi 11, Trieste (TS)", phone: "+39 040 265 2879", verified: false, url: "/estetista/trieste/Beautyque/41"},
     {name: "Estetica The Queen", address: "Via Milano 17, Trieste(TS)", phone: "+39 040 241 5721", verified: false, url: "/estetista/trieste/Estetica%20The%20Queen/42"},
     {name: "Estetica Gabriella", address: "Via Mazzini 33, Trieste (TS)", phone: "+39 040 362783", verified: false, url: "/estetista/trieste/Estetica%20Gabriella/43"},
     {name: "Armonia Centro Benessere", address: "Via Antonio Baiamonti 47/1, Trieste (TS)", phone: "+39 040 816626", verified: false, url: "/estetista/trieste/Armonia%20Centro%20Benessere/44"},
     {name: "ANTEPRIMA BEAUTY AND RELAX", address: "Via Santa Caterina da Siena 9, Trieste (TS)", phone: "+39 040 369866", verified: false, url: "/estetista/trieste/ANTEPRIMA%20BEAUTY%20AND%20RELAX/45"},
     {name: "Il Tamarindo Beauty & Style", address: "Corso Italia 9, Trieste (TS)", phone: "+39 389 184 9332", verified: false, url: "/estetista/trieste/Il%20Tamarindo%20Beauty%20%20Style/46"},
     {name: "Isabellestetica", address: "Via Capodistria 35, Trieste (TS)", phone: "+39 342 139 8638", verified: false, url: "/estetista/trieste/Isabellestetica/47"},
     {name: "Estetica Vogue", address: "Via Malcanton 4, Trieste (TS)", phone: "+39 040 260 6713", verified: false, url: "/estetista/trieste/Estetica%20Vogue/48"},
     {name: "Estella estetica", address: "Via S. Lazzaro 20, Trieste (TS)", phone: "+39 351 568 3508", verified: false, url: "/estetista/trieste/Estella%20estetica/49"},
     {name: "Studio d'estetica Elizabeth", address: "Via dell'Istria 3, Trieste (TS)", phone: "+39 040 639955", verified: false, url: "/estetista/trieste/Studio%20d'estetica%20Elizabeth/50"},
     {name: "Lotus beauty e relax", address: "Via Torino 22, Trieste (TS)", phone: "+39 040 309384", verified: false, url: "/estetista/trieste/Lotus%20beauty%20e%20relax/51"},
     {name: "Ego Studio", address: "Via S. Lazzaro 18/A, Trieste (TS)", phone: "+39 040 246 0154", verified: false, url: "/estetista/trieste/Ego%20Studio/52"},
     {name: "Baan Thai", address: "Riva Nazario Sauro 20, Trieste (TS)", phone: "+39 040 322 9411", verified: false, url: "/estetista/trieste/Baan%20Thai/53"},
     {name: "Centro estetico L'Aura", address: "Str. Vecchia dell'Istria 60/a, Trieste (TS)", phone: "+39 345 583 6536", verified: false, url: "/estetista/trieste/Centro%20estetico%20L'Aura/54"},
     {name: "Centro Benessere Infinito", address: "Via Udine 20/b, Trieste (TS)", phone: "+39 349 410 1588", verified: false, url: "/estetista/trieste/Centro%20Benessere%20Infinito/55"},
     {name: "Dolphin Club", address: "Via Antonio Baiamonti 1, Trieste (TS)", phone: "+39 338 159 9494", verified: false, url: "/estetista/trieste/Dolphin%20Club/56"},
     {name: "L'isola di Sabri", address: "Via Flavia 22, Trieste (TS)", phone: "+39 339 616 0202", verified: false, url: "/estetista/trieste/L'isola%20di%20Sabri/57"},
     {name: "Aqua e Sale", address: "Via Mazzini 13, Trieste (TS)", phone: "+39 040 765609", verified: false, url: "/estetista/trieste/Aqua%20e%20Sale/58"},
     {name: "CENTRO BENESSERE AYURVEDA", address: "Via Ugo Foscolo 18, Trieste (TS)", phone: "+39 351 834 5270", verified: false, url: "/estetista/trieste/CENTRO%20BENESSERE%20AYURVEDA/59"},
     {name: "Centro Rebecca", address: "Via di Campo Marzio 18, Trieste (TS)", phone: "+39 346 952 0381", verified: false, url: "/estetista/trieste/Centro%20Rebecca/60"},
     {name: "Suite A", address: "Via Genova 14, Trieste (TS)", phone: "+39 388 401 0067", verified: false, url: "/estetista/trieste/Suite%20A/61"},
     {name: "epiLate Trieste", address: "Via S. Lazzaro 13, Trieste (TS)", phone: "+39 334 387 0517", verified: false, url: "/estetista/trieste/epiLate%20Trieste/62"},
     {name: "Minin Sara Sara", address: "Via Pier Paolo Vergerio 20, Trieste (TS)", phone: "+39 040 245 7513", verified: false, url: "/estetista/trieste/Minin%20Sara%20Sara/63"},
     {name: "Estetica Eos", address: "Via dei Ginepri 9, Trieste (TS)", phone: "+39 040 214292", verified: false, url: "/estetista/trieste/Estetica%20Eos/64"},
     {name: "Beauty Lab", address: "Località Prosecco 294, Trieste (TS)", phone: "+39 331 907 6970", verified: false, url: "/estetista/trieste/Beauty%20Lab/65"},
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

    var title = this.doc.name + " - 💆🏼 Estetista a Trieste in "+ this.doc.address

    this.titleService.setTitle(title)
    var metaTags=[
      {property: 'og:url', content: url},
      {property: 'og:title', content: title},
      {property: 'og:description', content: this.doc.name+ " - Estetista a Trieste. Leggi le info  i dati ed il numero di telefono. Prenota online"},
      {property: 'og:image', content: "'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: 'keywords', content: this.doc.name+ + ", "+ this.doc.name +" estetista trieste , "+ this.doc.name +" centro estetico trieste , "+" centro estetico in "+ this.doc.address + ", "+" estetista in "+ this.doc.address + ", "+ this.doc.name +" centro estetico, "+ this.doc.name +" trieste, estetista trieste, centro estetico trieste,  ,Centro estetico trieste, Centro benessere trieste, Estetista trieste, Epilazione trieste, Massaggio trieste,Trattamenot cellulite trieste, Manicure trieste, Pedicure trieste, Unghie artificali trieste, Solarium trieste, Spa trieste, Smalto permanente trieste, Depilazione intima trieste, Cura cutanea trieste, Estetica integrata trieste"},
      {name: 'description', content: this.doc.name+ " - Estetista a Trieste. Leggi le info  i dati ed il numero di telefono. Prenota online"},
     
      
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
