import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-oculista',
  templateUrl: './oculista.component.html',
  styleUrls: ['./oculista.component.scss']
},)
export class OculistaComponent implements OnInit {


  eye_doctors=[
    {name:"Dottor Michelone Luca ",address:'Largo Barriera Vecchia 13',phone:'+39 3807385994', verified:true, url:'/appuntamento/dott_Michelone', img:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/michelone.jpeg?alt=media&token=5796027d-f76b-41f4-a8bf-ae6c2ba68aa6'},
 {name: "Dottor Lovisato Andrea", address: "Via del Coroneo 32", phone: "+39 0402604058", verified: false, url: "/oculista/trieste/Dottor%20Lovisato%20Andrea/1"},
 {name: "Dottoressa Croce' Maristella", address: "Largo Don Bonifacio 1", phone: "+39 0400641049", verified: false, url: "/oculista/trieste/Dottoressa%20Croce'%20Maristella/2"},
 {name: "Dottor Pastori Giulio", address: "Via San Francesco 6", phone: "+39 040369885", verified: false, url: "/oculista/trieste/Dottor%20Pastori%20Giulio/3"},
 {name: "Dottor Saviano Sandro", address: "Via Scipio Slataper 12", phone: "+39 040370577", verified: false, url: "/oculista/trieste/Dottor%20Saviano%20Sandro/4"},
 {name: "Dottor Agolini Giorgio", address: "Via San Francesco  35", phone: "+39 040368910", verified: false, url: "/oculista/trieste/Dottor%20Agolini%20Giorgio/5"},
 {name: "Dottor Mahnic Francesco", address: "Via Marco Tullio Cicerone 4", phone: "+39 040367733", verified: false, url: "/oculista/trieste/Dottor%20Mahnic%20Francesco/6"},
 {name: "Centro Oculistico Eye Care", address: "Capo di Piazza G. Bartoli 1", phone: "+39 0402601337", verified: false, url: "/oculista/trieste/Centro%20Oculistico%20Eye%20Care/7"},
 {name: "Dottor Tognetto Daniele", address: "Via delle Zudecche 1", phone: "+39 0403478783", verified: false, url: "/oculista/trieste/Dottor%20Tognetto%20Daniele/8"},
 {name: "Dottor Baccara Fabio", address: "Via San Nicolò 16", phone: "+39 040766333", verified: false, url: "/oculista/trieste/Dottor%20Baccara%20Fabio/9"},
 {name: "Dottor Ravalico Giuseppe", address: "Via del Teatro 2", phone: "+39 040366840", verified: false, url: "/oculista/trieste/Dottor%20Ravalico%20Giuseppe/10"},
 {name: "Dottor Pastore Marco Rocco", address: "Via del Teatro 2", phone: "+39 3206693148", verified: false, url: "/oculista/trieste/Dottor%20Pastore%20Marco%20Rocco/11"},
 {name: "Dottor Botteri Giordano", address: "Via Luigi Einaudi", phone: "+39  040366377", verified: false, url: "/oculista/trieste/Dottor%20Botteri%20Giordano/12"},
 {name: "Dottor Cecchini Paolo", address: "Via Guglielmo Marconi 4", phone: "+39  3389394638", verified: false, url: "/oculista/trieste/Dottor%20Cecchini%20Paolo/13"},
 {name: "Dottor Ravalico Giuseppe", address: "Via del Teatro 2", phone: "+39 040366840", verified: false, url: "/oculista/trieste/Dottor%20Ravalico%20Giuseppe/14"},
 {name: "Dottor Scuderi Bruno", address: "Via San Lazzaro 7", phone: "+39 3478703586", verified: false, url: "/oculista/trieste/Dottor%20Scuderi%20Bruno/15"},
{name: "Dottor Marini Marino", address: "Via Ugo Polonio 5", phone: "+39 0403498581", verified: false, url: "/oculista/trieste/Dottor%20Marini%20Marino/16"},
 {name: "Dottor Perissutti Paolo", address: "Via Giacinto Gallina 4", phone: "+39 040371280", verified: false, url: "/oculista/trieste/Dottor%20Perissutti%20Paolo/17"},
 {name: "Dottor Bampi Michele", address: "Via Ireneo della Croce 9", phone: "+39 040636422", verified: false, url: "/oculista/trieste/Dottor%20Bampi%20Michele/18"},
 {name: "Dottor Parentin Fulvio", address: "Via Pierluigi da Palestrina 3", phone: "+39 0402601268", verified: false, url: "/oculista/trieste/Dottor%20Parentin%20Fulvio/19"},
 {name: "Dottor Bergamini Luca ", address: "Via S. Spiridione 12", phone: "+39 040630391", verified: false, url: "/oculista/trieste/Dottor%20Bergamini%20Luca%20/20"},
{name: "Dottor Iustulin Daniele", address: "Via Ugo Polonio 3", phone: "+39 040636467", verified: false, url: "/oculista/trieste/Dottor%20Iustulin%20Daniele/21"},
 {name: "Dottor Solimano Nicolò", address: "Via Nordio Aurelio e Fabio 6", phone: "+39 040370419", verified: false, url: "/oculista/trieste/Dottor%20Solimano%20Nicol%C3%B2/22"},
{name: "Dottoressa Sparavier Anna", address: "Via Scipio Slataper 12", phone: "+39 040370577", verified: false, url: "/oculista/trieste/Dottor%20Sparavier%20Anna/23"},
{name: "Dottor Pesce Paolo", address: "Via Alfredo Oriani 4", phone: "+39 0403498003", verified: false, url: "/oculista/trieste/Dottor%20Pesce%20Paolo/24"},
 {name: "Dottor Degrassi Marco", address: "Piazza Venezia 3", phone: "+39 040361871", verified: false, url: "/oculista/trieste/Dottor%20Degrassi%20Marco/25"},
{name: "Dottor Fiorini Roberto", address: "Via San Francesco 18", phone: "+39 040369326", verified: false, url: "/oculista/trieste/Dottor%20Fiorini%20Roberto/26"},
{name: "Dottor Papagno Maurizio", address: "Piazza dell'Ospitale 2", phone: "+39 0407606019", verified: false, url: "/oculista/trieste/Dottor%20Papagno%20Maurizio/27"},
{name: "Dottor Antonini Elio", address: "Via Pasquale Revoltella 14", phone: "+39 3396991303", verified: false, url: "/oculista/trieste/Dottor%20Antonini%20Elio/28"},
 {name: "Dottor Rinaldi Giorgio", address: "Via Scipio Slataper 12", phone: "+39 040365656", verified: false, url: "/oculista/trieste/Dottor%20Rinaldi%20Giorgio/29"},
 {name: "Dottor Divo Ferruccio", address: "Via S. Spiridione, 12", phone: "+39 040638282", verified: false, url: "/oculista/trieste/Dottor%20Divo%20Ferruccio/30"},
 {name: "Dottor Turchetto Fabio", address: "Via Michelangelo Buonarroti 11", phone: "+39 040633009", verified: false, url: "/oculista/trieste/Dottor%20Turchetto%20Fabio/31"},
{name: "Dottor Capozzi Pasquale", address: "Viale Miramare 33", phone: "+39 3485797643", verified: false, url: "/oculista/trieste/Dottor%20Capozzi%20Pasquale/32"},
{name: "Dottoressa Ramovecchi Paola", address: "Via Giuseppe Giusti 16", phone: "+39 040416740", verified: false, url: "/oculista/trieste/Dottor%20Ramovecchi%20Paola/33"},
 {name: "Dottor Giovannini Enzo", address: "Via Paduina 11", phone: "+39 040370880", verified: false, url: "/oculista/trieste/Dottor%20Giovannini%20Enzo/34"},
{name: "Dottoressa Trovarelli Sara ", address: "Via Domenico Rossetti 62", phone: "+39 0409409556", verified: false, url: "/oculista/trieste/Dottor%20Sara%20Trovarelli/35"},
 {name: "Dottor Madonia Maurizio", address: "Via San Francesco 4/1", phone: "+39 3478375525", verified: false, url: "/oculista/trieste/Dottor%20Madonia%20Maurizio/36"},
 {name: "Dottor Zanei Andrea", address: "Viale Miramare 3", phone: "+39 3280892500", verified: false, url: "/oculista/trieste/Dottor%20Zanei%20Andrea/37"},
 {name: "Dottoressa Trovarelli Sara", address: "Capo di Piazza G. Bartoli 1", phone: "+39 3928333445", verified: false, url: "/oculista/trieste/Dottoressa%20Trovarelli%20Sara/38"},
 {name: "Dottoressa Busatto Patrizia", address: "Via San Francesco 4", phone: "+39 040370456", url: "/oculista/trieste/Dottoressa%20Busatto%20Patrizia/39", verified: false}
  ]
  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle("Oculisti a Trieste - 👨🏼‍⚕️ Lista completa con numeri di telefono")
    var metaTags=[
      {property: 'og:url', content: "https://prenota.cc/oculista/trieste"},
      {property: 'og:title', content: "Oculisti a Trieste - 👨🏼‍⚕️ Lista completa con numeri di telefono"},
      {property: 'og:description', content: "Prenota la visitia oculistica che fa per te. Trova il miglior oculista di Trieste. Da visite oculistiche di controllo e visite per il rinnovo patente e molto altro."},
      {property: 'og:image', content: "'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: 'keywords', content: "oculista trieste, oculista a trieste,lista oculisti trieste, oculisti a trieste, i migliori oculisti trieste, lista completa oculistia trieste, oculisti trieste, visita oculistica trieste, visita oculistica rinnovo patente trieste, rinnovo patente trieste, visita patente trieste , visita oculistica, visita di controllo oculistico, visita rinnovo patente , fluorangiografia, tomografia ottica, OCT, yag laser caspulotomia e iridotomia, biomicroscopia corneale, ecografia oculare, esame del fundus oculi, argon laser retina, topografia corneale, aberrometria, pachimetria, chirurgia Laser"},
      {name: 'description', content: "Prenota la visitia oculistica che fa per te. Trova il miglior oculista di Trieste. Da visite oculistiche di controllo e visite per il rinnovo patente e molto altro."},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
   }

  ngOnInit(): void {
  }

}
