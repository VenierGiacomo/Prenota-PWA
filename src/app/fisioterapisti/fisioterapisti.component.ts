import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-fisioterapisti",
  templateUrl: "./fisioterapisti.component.html",
  styleUrls: ["./fisioterapisti.component.scss"]
},)
export class FisioterapistiComponent implements OnInit {
  eye_doctors=[
{name: "Stefano Braico", address: "Via Alfredo Oriani, 4, Trieste(TS)", phone: "+39 351 991 3720", verified: false, url: "/fisioterapista/trieste/Stefano%20Braico/0"},
{name: "Studio Libra", address: "Largo Don Francesco Bonifacio, 1, Trieste (TS)", phone: "+39 347 167 4241", verified: false, url: "/fisioterapista/trieste/Studio%20Libra/1"},
{name: "Fisiocenter", address: "Corso Umberto Saba, 27, Trieste (TS)", phone: "+39 040 765050", verified: false, url: "/fisioterapista/trieste/Fisiocenter/2"},
{name: "Physiotherapy institute", address: "Via Giulia, 1, Trieste (TS)", phone: "+39 040 362548", verified: false, url: "/fisioterapista/trieste/Physiotherapy%20institute/3"},
{name: "Fisioterapia Gardelli", address: "Via Marco Tullio Cicerone, 6/A, Trieste(TS)", phone: "+39 040 371155", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Gardelli/4"},
{name: "Dallagiacoma Stefano", address: "Via Ruggero Timeus, 3, Trieste (TS)", phone: "+39 339 846 1281", verified: false, url: "/fisioterapista/trieste/Dallagiacoma%20Stefano/5"},
{name: "Bajc Alenka", address: "Via Giulia, 57, Trieste (TS)", phone: "+39 328 003 1539", verified: false, url: "/fisioterapista/trieste/Bajc%20Alenka/6"},
{name: "Fisiomed", address: "Via Giosuè Carducci, 22, Trieste (TS)", phone: "+39 040 660779", verified: false, url: "/fisioterapista/trieste/Fisiomed/7"},
{name: "Tarricone Giuseppe", address: "Via S. Francesco D'Assisi, 4, Trieste (TS)", phone: "+39 040 372 8705", verified: false, url: "/fisioterapista/trieste/Tarricone%20Giuseppe/8"},
{name: "Manzutto Daniele", address: "Via Cesare Beccaria, 6, Trieste (TS)", phone: "+39 040 368955", verified: false, url: "/fisioterapista/trieste/Manzutto%20Daniele/9"},
 {name: "Annamaria Flego", address: "Via Catullo, 8, Trieste (TS)", phone: "+39 348 650 6942", verified: false, url: "/fisioterapista/trieste/Annamaria%20Flego/10"},
 {name: "Fisioterapia Rezantonio", address: "Via Pierluigi da Palestrina, 6, Trieste (TS)", phone: "+39 040 370202", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Rezantonio/11"},
 {name: "Fisiosan", address: "Via Genova, 21, Trieste (TS)", phone: "+39 040 347 8678", verified: false, url: "/fisioterapista/trieste/Fisiosan/12"},
 {name: "Poliambulatorio Poligardelli", address: "Via Marco Tullio Cicerone, 6, Trieste (TS)", phone: "+39 040 371155", verified: false, url: "/fisioterapista/trieste/Poliambulatorio%20Poligardelli/13"},
 {name: "Spehar Dr. Fabio", address: "Via del Coroneo, 5, Trieste (TS)", phone: "+39 040 366414", verified: false, url: "/fisioterapista/trieste/Spehar%20Dr.%20Fabio/14"},
 {name: "Fisioterapia Fisicamente", address: "Via Cesare Beccaria, 6, Trieste (TS)", phone: "+39 040 372 0950", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Fisicamente/15"},
 {name: "Firera dott. Carmelo", address: "Via Francesco Rismondo, 12, Trieste (TS)", phone: "+39 040 774460", verified: false, url: "/fisioterapista/trieste/Firera%20dott.%20Carmelo/16"},
 {name: "Dott. Francesco Cerisola ", address: "Via Udine, 31, Trieste (TS)", phone: "+39 339 127 8698", verified: false, url: "/fisioterapista/trieste/Dott.%20Francesco%20Cerisola%C2%A0/17"},
 {name: "Massotrax", address: "Via Niccolò Machiavelli, 9, Trieste (TS)", phone: "+39 040 347 8972", verified: false, url: "/fisioterapista/trieste/Massotrax/18"},
 {name: "Paolo Tamaro", address: "Corso Umberto Saba, 27, Trieste (TS)", phone: "+39 040 765050", verified: false, url: "/fisioterapista/trieste/Paolo%20Tamaro/19"},
 {name: "Fisioterapia Rinaldi", address: "Via S. Lazzaro, 1, Trieste(TS)", phone: "+39 040 632108", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Rinaldi/20"},
 {name: "Vincenzo Guido", address: "Foro Ulpiano, 6, Trieste (TS)", phone: "+39 347 122 7419", verified: false, url: "/fisioterapista/trieste/Vincenzo%20Guido/21"},
 {name: "Istituto Fisioterapico Magri", address: "Via Silvio Pellico, 8, Trieste(TS)", phone: "+39 040 370530", verified: false, url: "/fisioterapista/trieste/Istituto%20Fisioterapico%20Magri/22"},
 {name: "Eutonia", address: "Via Udine, 11, Trieste (TS)", phone: "+39 040 360430", verified: false, url: "/fisioterapista/trieste/Eutonia/23"},
 {name: "Pagliaro Dott. Roberto", address: "Via Valdirivo, 42, Trieste (TS)", phone: "+39 040 372 1457", verified: false, url: "/fisioterapista/trieste/Pagliaro%20Dott.%20Roberto/24"},
 {name: "Fisioterapia Tarussio", address: "Via Cesare Battisti, 1, Trieste (TS)", phone: "+39 347 247 8129", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Tarussio/25"},
 {name: "Studio di Riabilitazione Motoria e Recupero Sportivo", address: "Via Silvio Pellico, 1, Trieste(TS)", phone: "+39 346 729 1170", verified: false, url: "/fisioterapista/trieste/Studio%20di%20Riabilitazione%20Motoria%20e%20Recupero%20Sportivo/26"},
 {name: "Bonomo 5 Studio di Medicina Integrata", address: "Via Dei Bonomo, 5, Trieste (TS)", phone: "+39 040 575336", verified: false, url: "/fisioterapista/trieste/Bonomo%205%20Studio%20di%20Medicina%20Integrata/27"},
 {name: "Fisioterapista dott. Riccardo Oggioni", address: "Via S. Francesco D'Assisi, 4/1, Trieste (TS)", phone: "+39 347 733 0771", verified: false, url: "/fisioterapista/trieste/Fisioterapista%20dott.%20Riccardo%20Oggioni/28"},
 {name: "Anna Hrvatic", address: "Via Niccolò Machiavelli, 17, Trieste (TS)", phone: "+39 320 063 5921", verified: false, url: "/fisioterapista/trieste/Anna%20Hrvatic/29"},
 {name: "Elena Paver", address: "Via Silvio Pellico, 10, Trieste (TS)", phone: "+39 333 487 9097", verified: false, url: "/fisioterapista/trieste/Elena%20Paver/30"},
 {name: "Fisioterapia Mlinaric", address: "Via Roma, 18, Trieste (TS)", phone: "+39 339 354 5804", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Mlinaric/31"},
 {name: "FISIOTERAPIA FORNASARO", address: "Via Marco Tullio Cicerone, 8, Trieste (TS)", phone: "+39 040 631511", verified: false, url: "/fisioterapista/trieste/FISIOTERAPIA%20FORNASARO/32"},
 {name: "Fisioterapia Michele Truglio", address: "Via Giosuè Carducci, 24, Trieste (TS)", phone: "+39 346 106 6672", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Michele%20Truglio/33"},
 {name: "Galante dott.ssa Tiziana", address: "Via Giosuè Carducci, 22, Trieste (TS)", phone: "+39 040 260 1310", verified: false, url: "/fisioterapista/trieste/Galante%20dott.ssa%20Tiziana/34"},
 {name: "Dott.ssa Alessandra Tavolato", address: "Via S. Francesco D'Assisi, 11, Trieste (TS)", phone: "+39 351 500 3004", verified: false, url: "/fisioterapista/trieste/Dott.ssa%20Alessandra%20Tavolato/35"},
 {name: "Nicolò Fumolo Fisioterapista", address: "Via Marco Tullio Cicerone, 6/A, Trieste(TS)", phone: "+39 040 371155", verified: false, url: "/fisioterapista/trieste/Nicol%C3%B2%20Fumolo%20Fisioterapista/36"},
 {name: "Matteo Bevilacqua", address: "Via S. Cilino, 91, Trieste (TS)", phone: "+39 333 192 6652", verified: false, url: "/fisioterapista/trieste/Matteo%20Bevilacqua/37"},
 {name: "studio di Fisioterapia Salvini", address: "Via Carducci, 5, Trieste (TS)", phone: "+39 328 841 0166", verified: false, url: "/fisioterapista/trieste/studio%20di%20Fisioterapia%20Salvini/38"},
 {name: "Studio Tommasini", address: "Via S. Lazzaro, 8, Trieste (TS)", phone: "+39 340 644 3005", verified: false, url: "/fisioterapista/trieste/Studio%20Tommasini/39"},
 {name: "Dott.ssa Fisioterapista Carolina Squeglia", address: "Piazza Carlo Goldoni, 10, Trieste (TS)", phone: "+39 348 486 7727", verified: false, url: "/fisioterapista/trieste/Dott.ssa%20Fisioterapista%20Carolina%20Squeglia/40"},
 {name: "Studio Divella", address: "Via S. Lazzaro, 7, Trieste (TS)", phone: "+39 331 256 1430", verified: false, url: "/fisioterapista/trieste/Studio%20Divella/41"},
 {name: "Dott. Marco Pagliaro", address: "Via Mazzini, 30, Trieste (TS)", phone: "+39 348 566 9047", verified: false, url: "/fisioterapista/trieste/Dott.%20Marco%20Pagliaro/42"},
 {name: "Piccinino Dr. Roberto", address: "Piazza della Libertà, 6, Trieste (TS)", phone: "+39 040 416055", verified: false, url: "/fisioterapista/trieste/Piccinino%20Dr.%20Roberto/43"},
 {name: "Dott. Alberto Marson", address: "V.le Miramare, 3, Trieste (TS)", phone: "+39 347 278 3219", verified: false, url: "/fisioterapista/trieste/Dott.%20Alberto%20Marson/44"},
 {name: "Pier Alberto Bressan", address: "Via dei Gelsomini, 1, Trieste (TS)", phone: "+39 320 307 8389", verified: false, url: "/fisioterapista/trieste/Pier%20Alberto%20Bressan/45"},
 {name: "Fisioterapia Chiro", address: "Via Silvio Pellico, 10, Trieste(TS)", phone: "+39 040 760 6086", verified: false, url: "/fisioterapista/trieste/Fisioterapia%20Chiro/46"},
 {name: "Duilio Cobol", address: "Via Trento, 5, Trieste (TS)", phone: "+39 040 368317", verified: false, url: "/fisioterapista/trieste/Duilio%20Cobol/47"},
 {name: "Sanitas Studio Fisioterapico", address: "Via Pietro Mascagni, 3, Trieste (TS)", phone: "+39 040 826336", verified: false, url: "/fisioterapista/trieste/Sanitas%20Studio%20Fisioterapico/48"},
 {name: "Tommaso Riosa", address: "Via di Tor Bandena, 1, Trieste (TS)", phone: "+39 333 104 7048", verified: false, url: "/fisioterapista/trieste/Tommaso%20Riosa/49"},
 {name: "Bressan - Marin Fisioterapia", address: "L.go A. Roiano, 1, Trieste (TS)", phone: "+39 334 245 8581", verified: false, url: "/fisioterapista/trieste/Bressan%20-%20Marin%20Fisioterapia/50"},
 {name: "Studio Gammeri", address: "Via della Madonna del Mare, 10/a, Trieste (TS)", phone: "+39 349 414 8387", verified: false, url: "/fisioterapista/trieste/Studio%20Gammeri/51"},
 {name: "Valentina Tauceri", address: "Via del Monte Canin, 8, Trieste (TS)", phone: "+39 348 566 9047", verified: false, url: "/fisioterapista/trieste/Valentina%20Tauceri/52"},
 {name: "Puleo Giuseppina", address: "Via di Donota, 1, Trieste (TS)", phone: "+39 349 242 5500", verified: false, url: "/fisioterapista/trieste/Puleo%20Giuseppina/53"},
 {name: "Zuin Thomas", address: "Piazza Carlo Goldoni, 5, Trieste (TS)", phone: "+39 392 148 6324", verified: false, url: "/fisioterapista/trieste/Zuin%20Thomas/54"},
 {name: "Pier Alberto Bressan", address: "Via dei Gelsomini, 1, Trieste (TS)", phone: "+39 320 307 8389", verified: false, url: "/fisioterapista/trieste/Pier%20Alberto%20Bressan/55"},

  ]
  constructor(private metaService: Meta, private titleService: Title) {

    this.titleService.setTitle("Fisioterapista a Trieste - 👨🏼‍⚕️ Lista completa con numeri di telefono ed indirizzo")
    var metaTags=[
      {property: "og:url", content: "https://prenota.cc/fisioterapista/trieste"},
      {property: "og:title", content: "Fisioterapista a Trieste - 👨🏼‍⚕️ Lista completa con numeri di telefono ed indirizzo"},
      {property: "og:description", content: "Lista di tutti i fisioterapisti e centri terapici a Trieste con numeri di telefono ed indirizzo!"},
      {property: "og:image", content: "https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: "keywords", content:  "fisioterapista trieste, fisioterapia trieste, centro fisioterapici trieste, fisioterapisti trieste, centri di fisioterapia trieste, riabilitazione motoria trieste, tecarterapia trieste"},
      {name: "description", content: "Lista di tutti i fisioterapisti e centri terapici a Trieste con numeri di telefono ed indirizzo!"},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
   }

  ngOnInit(): void {

  }
}
