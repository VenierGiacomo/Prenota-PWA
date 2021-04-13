import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import Notiflix from "notiflix";

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.scss']
})
export class CategoryListingComponent implements OnInit {

  constructor(private api: ApiService,private metaService: Meta, private router:Router, private titleService: Title) { 
    var url = this.router.url.split('/')
    this.business_type= url[url.length-1]
    this.titleService.setTitle(`I migliori ${this.categories_name[this.business_type]} a Trieste - Prenota Online`);
    var metaTags=[
      {property: 'og:url', content: this.url},
      {property: 'og:title', content: `I migliori ${this.categories_name[this.business_type]} a Trieste - Prenota Online`},
      {property: 'og:description', content: this.descriptions[this.business_type]},
      {property: 'og:image', content: 'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',},
      {name: 'keywords', content: this.keywords[this.business_type]},
      {name: 'description', content: this.descriptions[this.business_type]},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
  }
shops
url
business_type 
categories_id={'parrucchieri': 2, 'campi': 7, 'medici': 1 }
categories_name={'parrucchieri': 'parrucchieri', 'campi': 'campi da Calcio e Tennis','medici':'medici dentisti e farmacie' }
second_title={'parrucchieri': 'Sei un Parruchiere o Barbiere a Trieste?', 'campi': 'Sei il direttore di un campo da calcetto o un campo da tennis a Trieste?','medici':'Sei un medico un dentista o hai una farmacia a Trieste?' }
descriptions={
  'parrucchieri': 'Parrucchieri e barbieri a Trieste - Trova chi ti fa un taglio, una messa in piega, un colore o qualsiasi cosa tu stia cercando. Tutte i parruccheiri e barbieri sono prenotabili online in qualche secondo.', 
  'campi': 'Campi da calcetto e un campi da tennis a Trieste - Trova un campo da calcietto a cinque(5) o di calcietto a sette(7). Vuoi fare una partita su un campo da tennis? Prenota subito il campo in soli 3 click',
  'medici':'Medico sportivo, Dentista, Oculista e Farmacie a Trieste. Trova un medico sportivo, un oculista, un dentista per bambini o una farmacia? Puoi prenotare una visita medica, un igene dentale,  un oturazione, una visita oculistica, un tampone rapido o visita agonistica' }
keywords={
  'parrucchieri': 'parrucchiere trieste, parrucchiere a trieste, barbiere trieste, barbiere a trieste, parrucchieri trieste, parrucchieri a trieste, barbieri trieste, barbieri a trieste, taglio trieste, talgio di capelli trieste, colore trieste, colore capelli trieste, barba trieste, meches trieste, i migliori parrucchieri a trieste, migliori parrucchieri trieste, migliori parrucchieri a trieste, i migliori barbieri a trieste, migliori barbieri trieste, migliori barbieri a trieste', 
  'campi': 'campo trieste, campo a trieste, campi trieste, campi a trieste, campo calcio trieste, campo da calcio trieste,  campo calcio a trieste, campo da calcio a trieste,  campo calcetto trieste, campo da calcetto trieste, campo da tennis, campo da tennis trieste, campo da tennis a trieste,  campo da tennis a grignano, campo da tennis grignano, campo calcetto a 7 trieste, campo calcetto a 5 trieste, campo dacalcetto a 5 trieste, campo terra rossa trieste, campo erba trieste, campo in erba trieste, campetto in erba',
  'medici':'stupar, manfra, michelone, cermelj, gianfranco stupar, luca michelone, dottor manfra, farmcia trieste, farmacia opicina, farmacia cermelj, tampone, tampone rapido, medico trieste, dottore trieste, dentista trieste, farmacia trieste, dentista per bambini trieste, visita medica, visita agonistica, visita sportiva, igene trieste, otturazione trieste, dentista a trieste, oclilista trieste, visita oculistica trieste, esame vista patente, esame vista rinnovo patente, esame oct, dieta e nutrizione, '
}

ngOnInit(): void {

    this.url = this.router.url.split('/')
    this.business_type= this.url[this.url.length-1]
    this.api.getStoresCategory(this.categories_id[this.business_type]).subscribe(async data=>{
      this.shops= await data
    },err=>{
      console.log(err)
    })
  }
  navigate(shop){
    if(shop.closed){
      Notiflix.Notify.Init({distance:'50px', position:'center-top', timeout:4000,});
      Notiflix.Notify.Failure(shop.closed_message)
    }else{
      
      var url = shop.website 
      url = url.substring(19)
      // console.log(url)
    this.router.navigateByUrl(url)
    }
   
  }
  back(){
    this.router.navigateByUrl('home/ricerca')
  }
}
