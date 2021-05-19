import { Component, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-campi-da-tennis",
  templateUrl: "./campi-da-tennis.component.html",
  styleUrls: ["./campi-da-tennis.component.scss"]
})
export class CampiDaTennisComponent implements OnInit {



  eye_doctors=[
   {name:"Circolo Tennis Grignano",address:"Via Junker 8, Trieste (TS)",phone:"+39 040 224361", verified:true, url:'/appuntamento/Tennis_Grignano',img:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/nuovo%20copy.jpg?alt=media&token=5c103439-263b-4825-ae28-dfbc0ae5332f'},
   {name: "Circolo Marina Mercantile", address: "V.le Miramare 40,  rieste (TS)", phone: "+39 040 412327", verified: false, url: "/campi_da_tennis/trieste/Circolo%20Marina%20Mercantile/1"},
   {name: "Tennis Club Campi Rossi", address: "Borgo Grotta Gigante 42/B, Sgonico (TS)", phone: "+39 040 327309", verified: false, url: "/campi_da_tennis/trieste/Tennis%20Club%20Campi%20Rossi/2"},
   {name: "Campo Cologna UISP", address: "Via Cesare Beccaria 6, Trieste (TS)", phone: "+39 040 639382", verified: false, url: "/campi_da_tennis/trieste/Campo%20Cologna%20UISP/3"},
   {name: "Circolo Tennis Ferriera di Servola", address: "Via S. Lorenzo in Selva 162, Trieste (TS)", phone: "+39 040 821436", verified: false, url: "/campi_da_tennis/trieste/Circolo%20Tennis%20Ferriera%20di%20Servola/4"},
   {name: "Tennis Club Triestino", address: "Località Padriciano, 175,  Trieste (TS)", phone: "+39 040 226179", verified: false, url: "/campi_da_tennis/trieste/Tennis%20Club%20Triestino/5"},
    ]
  constructor(private metaService: Meta, private titleService: Title) {

    this.titleService.setTitle("Campo da tennis a Trieste 🎾 - Lista completa con numeri di telefono")
    var metaTags=[
      {property: "og:url", content: "/campi_da_tennis/trieste"},
      {property: "og:title", content: "Campo da tennis a Trieste 🎾 - Lista completa con numeri di telefono"},
      {property: "og:description", content: "Prenota tutti i campi da tennis a Trieste - Campi in terra rossa, campi in erba e campi in cemento."},
      {property: "og:image", content: "https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581"},
      {name: "keywords", content: "campi da tennis a trieste, campi da tennis a grignano, campi da tennis marina mercantile, campi da tennis campo cologna, campi da tennis ferriera di servola, campi club triestino ", },
      {name: "description", content: "Prenota il campo da tennis che fa per te. Trova il campo da tennis a Trieste che fa per te."},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
   }

  ngOnInit(): void {
  
  }

}
