import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-campi-da-calcio",
  templateUrl: "./campi-da-calcio.component.html",
  styleUrls: ["./campi-da-calcio.component.scss"]
},)
export class CampiDaCalcioComponent implements OnInit {



  eye_doctors=[
    {name:"Campo Oratorio Montuzza",address:"Via Tommaso Grossi, 4, 34131 Trieste (TS)",phone:"+39 040 308814", verified:true, url:"/appuntamento/montuzza",img:"https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/WhatsApp%20Image%202021-01-26%20at%2016.45.56.jpeg?alt=media&token=3a2001e9-6a5e-4d4c-9805-9d5fc36326b3"},
    {name:"Campo Fani Olimpia",address:"Via Pascoli 31 /A, Trieste (TS)",phone:"+39 040 360407", verified:true, url:"/appuntamento/faniolimpia",img:"https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/fani.jpg?alt=media&token=238ce5c2-6a44-49a7-bdab-5a629e26ea71"},
    {name:"Campo Trifoglio",address:"Via delle Campanelle 266, Trieste (TS)",phone:"+39 040 568474", verified:true, url:"/appuntamento/trifoglio",img:"https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/green-leaf-clover-logo.jpg?alt=media&token=5fe3a337-ce10-4b44-9a1a-94b698fb1d24"},
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
  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle("Campi da calcio a 7 e a 5 a Trieste ⚽ - Lista completa con numeri di telefono")
    var metaTags=[
      {property: "og:url", content: "/campi_da_calcetto/trieste"},
      {property: "og:title", content: "Campi da calcio a Trieste ⚽ - Lista completa di campi da calcetto a 5 e 7"},
      {property: "og:description", content: "Prenota tutti i campi da calcetto a cinque (5) e campi da calcetto a sette (7) a Trieste"},
      {property: "og:image", content: "https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: "keywords", content: "campi da calcio a trieste, campi da calcietto a trieste, campi da calcietto a ciqnue trieste, campi da calcietto a 5 trieste, campi da calcietto a sette trieste, campi da calcietto a 7 trieste, campo borgo alta, campo calcetto borgo alta, campo calcetto costalunga, campo oratorio salesiano, campo dopolavoro ferroviario trieste, campo soncini, campo costalunga, campo trieste calcio, campo di villa ara, campo san luigi, campo di altura, campo di trebiciano, campo polisportiva opicina, campo chiarbola, campo di giarizzole, campo montebello don bosco trieste, campo roianese, campo trifoglio, campo fani olimpia, campo oratorio montuzza", },
      {name: "description", content: "Prenota il campo da calcio che fa per te. Trova il miglior campo da calcetto a sette e a cinque di Trieste. Tutti i campi da calcietto aperti a Trieste."},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
   }

  ngOnInit(): void {
   
  }

}
