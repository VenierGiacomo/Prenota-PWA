import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Notiflix from "notiflix";
import { Router } from '@angular/router';
import { Title, Meta }     from '@angular/platform-browser';

@Component({
  selector: 'app-booking-templ',
  templateUrl: './booking-templ.component.html',
  styleUrls: ['./booking-templ.component.scss']
})
export class BookingTemplComponent implements OnInit {

  year=new Date().getFullYear()
  month
  day
  by_emial
  croatia
  just_entered= 0
  cal='none'
  formType='Register'
  toastx='none'
  register_form='none'
  logout_displ='none'
  spin='block'
  spin_spots = "none"
  // spin_spots1= "none"
  spin_spots_neg = "visible"
  // spin_spots1_neg= "visible"
  spots='none'
  serv_displ='none'
  service:any =[]
  selected_date='Seleziona data'
  selected_hour
  displ_hour='Seleziona ora'
  selected_service='Seleziona servizio'
  cont_scroll =false
  today
  unique :any
  uniques:Array<any> =[]
  user:any= {first_name:'', last_name:'',phone:''}
  confirm='none'
  first_name = ''
  last_name = ''
  username = ''
  email = ''
  sex = 'm'
  button_text='Prenota un appuntamento'
  phone = ''
  password =''
  ser_height = '0px'
  first_name_err=''
  last_name_err=''
  username_err= ''
  email_err= ''
  phone_err= ''
  password_err=''
  error= ''
  o:any ={}
  list_appointments
  services:any=[]
  week = []
  emplo_show:any=[]
  availableSpots
  openhours
  timeslot 
  final_spots
  final_spots_displ=[]
  employees_serivces
  empl_hours
  results_empl_serv:any=[]
  disabled_btn= false
  active_date:any = []
  employees_list:any = []
  cont = 0 
  active_services= []
  app_to_book:any
 list_work = []
 availableSpots1:any =[]
  all_app_week1:any=[]
  show_something= false
  text_c ='#0061d5'
  time_duration: string[] = ["0 min","5 min","10 min","15 min","20 min","25 min", "30 min","35 min", "40 min", "45 min", "50 min", "55 min", "1 ora","1 ora e 5 min", "1 ora e 10 min", "1 ora e 15 min","1 ora e 20 min", "1 ora e 25 min","1 ora e 30 min","1 ora e 35 min","1 ora e 40 min","1 ora e 45 min","1 ora e 50 min","1 ora e 55 min","2 ore","2 ore e 5 min", "2 ore e 10 min", "2 ore e 15 min","2 ore e 20 min", "2 ore e 25 min","2 ore e 30 min","2 ore e 35 min","2 ore e 40 min","2 ore e 45 min","2 ore e 50 min","2 ore e 55 min","3 ore","3 ore e 5 min", "3 ore e 10 min", "3 ore e 15 min","3 ore e 20 min", "3 ore e 25 min","3 ore e 30 min","3 ore e 35 min","3 ore e 40 min","3 ore e 45 min","3 ore e 50 min","3 ore e 55 min"];
  week_name = ["Lun","Mar","Mer","Gio","Ven","Sab","Dom"]
  months_days=[31, ((this.year%4==0 && this.year%100!=0)|| this.year%400==0)? 29 :28, 31 , 30, 31, 30, 31, 31, 30, 31, 30, 31]
  months_names=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  total_service={name:'',duration:0,id:-1}
  selected_services:any=[]
  // rand = [ 6, 12, 21, 32 ,47 ,49 ]
  times =["06:00", "06:05", "06:10", "06:15", "06:20", "06:25", "06:30", "06:35", "06:40","06:45", "06:50", "06:55", "07:00", "07:05", "07:10", "07:15", "07:20", "07:25", "07:30", "07:35", "07:40", "07:45", "07:50", "07:55", "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55", "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55", "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55", "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55", "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55","14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55", "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55", "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55", "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55", "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55", "19:00", "19:05", "19:10", "19:15", "19:20", "19:25", "19:30", "19:35", "19:40", "19:45", "19:50", "19:55", "20:00", "20:05", "20:10", "20:15", "20:20", "20:25", "20:30", "20:35", "20:40", "20:45", "20:50", "20:55", "21:00", "21:05", "21:10", "21:15", "21:20", "21:25", "21:30", "21:35", "21:40", "21:45", "21:50", "21:55", "22:00", "22:05", "22:10", "22:15","22:20", "22:25", "22:30", "22:35", "22:40", "22:45", "22:50", "22:55", "23:00", "23:05", "23:10", "23:15", "23:20", "23:25", "23:30", "23:35", "23:40", "23:45", "23:50", "23:55" ]
  rows = ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45", "24:00"]
  full_hours = [ "07:00",  "08:00", "09:00",  "10:00", "11:00",  "12:00", "13:00",  "14:00", "15:00", "16:00", "17:00","18:00", "19:00", "20:00", "21:00",  "22:00",  "23:00","24:00"]
  days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']
  months_short=['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic']
  years=[2020,2021]
  email1
  password1
  filtr =  []
  empl_for_service=[]
  //automante
  max_spots=-1
  id 
  name 
  last_selected_week
  appointments
  book_site= false
  account_credits = 0
  is_member = false
  is_client= false
  place_holder
  has_spot = true
  date_vis='hidden'
  available_days = []
  interval_insurance
  called =false
  booking_left='100vw'
  limit=10
  services_list=[]
  show_scroll=false
  position_book='absolute'
  loading=false
  bookable_pc
  campo
  available_on
  hourfilter
  advance_day=2
  booked_same_top ='120vh'
  adons_list
  adons =false
  born_city ='Trieste'
  live_city ='Trieste'
  live_street
  cap
  fiscal_code
  extra_data='none'
  res_book:any
  fiscal_code_err=''
  born_city_err=''
  live_city_err=''
  live_street_err=''
  cap_err=''
  businesses={
    'Wellness_Clinic':{
                      name:'Wellness Clinic',
                      html_title:'Wellness Clinic: Medico sportivo Gianfranco Stupar a Trieste',
                      id:18,
                      campo:false,
                      keywords:'Gianfranco Stupar, Stupar, Gianfranco Stupar Trieste, Wellness Clinic, Wellness Clinic Trieste, Stupar, Stupar Trieste, Stupar medico sportivo, medico sportivo Trieste, visita medica Trieste, visita medica sportiva, visita medica sportiva Trieste, visita agonistica Trieste,  medico dello sport, medico dello sport Trieste ',
                      og_url:'https://prenota.cc/appuntamento/Wellness_Clinic',
                      og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
                      og_description:'Prenota una visita medico sportiva con il Dott. Gianfranco Stupar. Idoneità agonistica, visita non agonistica e prova da sforzo a Trieste.',
                      phone: '+39 3516113525',
                      address: 'Via Torrebianca 28/a', 
                      zip_code:'34122',
                      bg_opacity:'#00000088',
                      img_bg:'../assets/ddd.jpg',
                      bookable_pc:true,
                      rich_cont:`
                      {
                        "@context": "https://schema.org",
                        "@type": "MedicalBusiness",
                        "image": [
                          "https://example.com/photos/1x1/photo.jpg",
                          "https://example.com/photos/4x3/photo.jpg",
                          "https://example.com/photos/16x9/photo.jpg"
                         ],
                        "@id": "https://prenota.cc/appuntamento/Wellness_Clinic",
                        "name": "Wellness Clinic",
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": "Via Giulia 56",
                          "addressLocality": "Trieste",
                          "addressRegion": "IT",
                          "postalCode": "34126",
                          "addressCountry": "IT"
                        },
                        "review": {
                          "@type": "Review",
                          "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5",
                            "bestRating": "5"
                          },
                          "author": {
                            "@type": "Person",
                            "name": "Federico Mattesi"
                          }
                        },
                        "geo": {
                          "@type": "GeoCoordinates",
                          "latitude": 45.6525543,
                          "longitude": 13.7731577
                        },
                        "url": "https://prenota.cc/appuntamento/Wellness_Clinic",
                        "telephone": "+39 3391139977",
                        "openingHoursSpecification": [
                          {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday"
                            ],
                            "opens": "8:30",
                            "closes": "20:00"
                          },
                          {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": "Saturday",
                            "opens": "9:30",
                            "closes": "14:00"
                          }
                        ],
                      
                        "acceptsReservations": "True"
                      }
                   `,
                      category:'Medico sportivo a Trieste',
                      hours:`Lun, Mar, Mer, Gio, Ven:
                      8:30 - 12:30 e 14:30 - 20:00<br> Sab:  <span style="text-align: right;">8:30 - 12:30 e 14:30 - 20:00</span></p>`,
                      description:`WELLNESS CLINIC è un laboratorio della salute dove l'esercizio fisico viene prescritto alla pari di un farmaco e somministrato in uno spazio wellness-medico attrezzato e protetto.
                      Con la sua equipe di professionisti, la WELLNESS CLINIC opera nell'attuare un protocollo di prevenzione, attraverso uno specifico programma di esercizi, sviluppati al fine di ridurre gli infortuni durante la pratica sportiva specifica.`}
  ,'dott_Michelone':{
                      name:'Dott. Luca Michelone',
                      html_title:'Dott. Luca Michelone: Oculista moderno a Trieste',
                      id:43,
                      campo:false,
                      keywords:'Luca Michelone, Luca Michelone trieste, oculista Luca Michelone, luca michelone dottore, oculsita Trieste, visita oculistica Trieste, visita agli occhi, visita oculistica rinnovo patente, OCT, campo visito computerizzato, campo visivo a Trieste, esame oct trieste, studio oculistico',
                      og_url:'https://prenota.cc/appuntamento/dott_Michelone',
                      og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
                      og_description:'Prenota una visita oculistica a Trieste con il Dott. Luca Michelone. Visita oculistica, esame OCT e campo visivo computerizzato a Trieste.',
                      phone: '+39 3807385994',
                      address: 'Largo della Barriera Vecchia 13', 
                      zip_code:'34129',
                      bg_opacity:'#000000aa',
                      img_bg:'../assets/Eye_Doctor_Tool_Free_Vector.svg',
                      bookable_pc:true,
                      category:'Oculista a Trieste',
                      hours:`Lun: 09:00 - 11:00 e 15:00 - 17:00`,
                      description:`Il dott. Luca Michelone si è laureato in Medicina e Chirurgia all'Università degli Studi di Trieste nel 2003 e si è specializzato in Oculistica presso la medesima Università con il massimo dei voti nel 2007<br><br>Dal 2009 al 2016 lavora come Oculista c/o “Poliambulatorio San Marco”, Ca Savio Venezia
                      Dal 2013 ad oggi lavora come Medico Oculista c/o il Centro Medico Università Castrense, San Giorgio di Nogaro UD<br><br>
                      Dal 2020 è il Direttore Sanitario del centro di Riabilitazone visiva Rittmeyer, Trieste<br><br>
                      Effettua interventi di chirurgia refrattiva c/o il Centro Medico San Biagio di Fossalta di Portogruaro`}
  ,'TK_Business':{
                        name:'TK Business',
                        html_title:'TK Business: Marketing e consulenza Digitale a Trieste',
                        id:28,
                        campo:false,
                        keywords:'TK Business, TK Business Trieste, marketing a Trieste, consulenza Digitale a Trieste, consulenza marketing gratuita, consulenza digitale gratuita, consulenza marketing gratuita a Trieste, consulenza digitale gratuita a Trieste, ',
                        og_url:'https://prenota.cc/appuntamento/TK_Business',
                        og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
                        og_description:'Prenota una consulenza campagna marketing su Facebook a Trieste o una consulenza campagna marketing su Google a Trieste.',
                        phone: '+39 3471864232',
                        address: 'Piazza Tommaseo 4/C', 
                        zip_code:'34121',
                        bg_opacity:'#00000000',
                        img_bg:'../assets/e-commerce-marketing-02.jpg',
                        category:'Consulenza digitale e marketing a Trieste',
                        bookable_pc:true,
                        hours:`Lun - Sab: 09:00 - 18:00`,
                        description:`Consulente di Marketing Digitale.<br><br>
                        Assisto le PMI nel sviluppare al massimo le potenzialità dell'attività sui Motori di Ricerca e sui Social.<br><br>
                       
Ho avuto l'occasione di lavorare in diversi settori ed ognuno di essi mi ha lasciato qualcosa d'importante, delle skills che ancora adesso sto portando a presso.<br><br>
<br>
Lavorando da anni nel Digital Marketing ho potuto metter in pratica la teoria appresa e sono riuscito ad ottenere notevoli risultati.
`

}
  ,'Cmassaggi':{
      name:'Cmassaggi',
      html_title:'Cmassaggi Trieste : Massaggi professionali da Claudia Mileto',
      id:27,
      campo:false,
      keywords:'Cmassaggi, Claudia Mileto, Cmassaggi Trieste, Claudia Mileto Trieste, Massaggi professionali a Trieste, Massaggi sportivo a Trieste, centro massaggi a Trieste, messaggio decontratturante a Trieste,messaggio decontratturante,messaggio sportivo Trieste ',
      og_url:'https://prenota.cc/appuntamento/Cmassaggi',
      og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
      og_description:'Prenota un massaggio rigenerante, un massaggio decontratturante o un massaggio sportivo a Trieste.',
      phone: '+39 3314665503',
      address: 'Salita Zugnano 1', 
      zip_code:'34148',
      bg_opacity:'#00000088',
      img_bg:'../assets/massage2.jpg',
      category:'Massaggi decontratturanti e rigeneranti a Trieste',
      bookable_pc:true,
      hours:`Lun, Mar, Gio, Ven, 9:00 - 19:00 <br> Mer 11:00 - 19:00`,
      description:`Vieni a trovarmi e decidiamo assieme il percorso più adatto alle tue esigenze. Da un massaggio Sportivo ad uno Svedese    <br><br>
      Nello studio troverai i confort di cui hai bisogno: ciabattine e slip monouso, teli monouso per doccia, lettino riscaldato in inverno, musica adeguata al trattamento o alla sessione che sceglierai, vari olii e prodotti naturali ed edibili per i trattamenti.
  
      
  `}
  ,'Aparrucchieri':{
    name:'Aparrucchieri',
    html_title:'Aparrucchieri: Salone parrucchieri moderno a Trieste',
    id:23,
    campo:false,
    keywords:'Aparrucchieri, Aparrucchieri Trieste, Parrucchiere a Trieste, Barbiere a Trieste, Taglio di capelli a Trieste, Taglio di capelli in centro città a Trieste,',
    og_url:'https://prenota.cc/appuntamento/Aparrucchieri',
    og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
    og_description:'Aparrucchieri, prenota un taglio capelli vicino allo stadio: salone moderno di parrucchieri e barbieri a Trieste. Piega, taglio e taglio capelli uomo nel quartiere di Chiarbola a Trieste.',
    phone: '+39 0402652079',
    address: 'Via Pirano 12/A', 
    zip_code:'34145',
    bg_opacity:'#00000088',
    img_bg:'../assets/aparucchieri_backgroud.jpg',
    bookable_pc:true,
    category:'Studio di parrucchieri a Trieste',
    hours:`Mar - Sab 9:00 - 19:00`,
    description:`Aparrucchieri è un esclusivo salone nella zona sud di Trieste, in via Pirano 12, dall'arredamento elegante e minimal chic che gioca sul contrasto creato dal classico black and white.<br><br>  Alan, il titolare, ha scoperto giovanissimo la passione per il mestiere. Prendendo come punto di riferimento sua mamma, che lo ha poi supportato in tutto il suo percorso formativo tecnico/artistico.<br> <br>  La qualità dei prodotti Davines e Philip Martin's contribuiscono a dare ulteriore prestigio al salone, che mira sempre alla soddisfazione del cliente su cui viene pensato un percorso di bellezza e consulenza minuziosa e personalizzata. 
`}
,'salone_rocco':{
  name:'Salone Rocco',
  html_title:'Salone Rocco: Parrucchire storico in centro Trieste.',
  id:29,
  campo:false,
  keywords:'Salone Rocco, Salone Rocco Trieste, Parrucchiere a Trieste, Parrucchiere a Trieste centro, Taglio di capelli a Trieste, Taglio di capelli in centro città a Trieste',
  og_url:'https://prenota.cc/appuntamento/salone_rocco',
  og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
  og_description:"Salone Rocco, parrucchiere storico in centro a Trieste. Vieni a trovarci in via San Francesco 18/A. Piega, taglio e taglio capelli uomo vicino all'universita.",
  phone: '+39 0402652079',
  address: 'Via San Francesco 18/A', 
  zip_code:'34133',
  bg_opacity:'#00000088',
  img_bg:'../assets/Salone_rocco_bottom.jpg',
  bookable_pc:true,
  category:'Studio di parrucchieri a Trieste',
  hours:`<p>Mar e Gio 8:30 - 12:30 &amp; 15:30 - 19:00<br>Mer e Sab 8:30 - 16:30<br>Ven 8:30 - 17:30 </p>`,
  description:`Salone Rocco, parrucchiere storico in centro a Trieste. Vieni a trovarci in via San Francesco 18/A. Dopo venticinque anni di lavoro da dipendente, Rocco decide di iniziare la sua attività come lavoratore autonomo. Nasce così il Salone Rocco il 1 febbraio 1966. <br><br>Dopo quarat'anni d'attività fiorente, Rocco insegna il suo mestiere ad una quarantina di giovani finchè lascia nelle mani della figlia Maura, attuale titolare, l'attività rinnovata da un anno. <br><br>Il Salone Rocco, a detta della clientela, è sempre accogliente come un buon salotto cittadino. L'atmosfera del negozio risulta essere sempre familiare e, al tempo stesso, accogliente e professionale 
`}
,'Tennis_Grignano':{
  name:'Circolo Tennis Grignano',
  html_title:'Circolo Tennis Grignano: Campi da tennis in terra ed erba a Trieste ',
  id:36,
  campo:true,
  keywords:'tennis grignano, Circolo Tennis Grignano, Circolo Tennis Grignano Trieste, tennis trieste, tennis campo in terra trieste, circolo tennis trieste',
    og_url:'https://prenota.cc/appuntamento/Tennis_Grignano',
    og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
    og_description:'Prenota un taglio capelli a Trieste: i migliori parrucchieri e barbieri a Trieste. Piega, taglio e taglio capelli uomo nel quartiere di Chiarbola a Trieste.',
  phone: '+39 040224361',
  address: 'Via Junker 8', 
  zip_code:'34151',
  bg_opacity:'#000000aa',
  img_bg:'../assets/tenniss_club_grignano.jpeg',
  bookable_pc:false,
  category:'Campi da tennis a Trieste',
  hours:`Lun - Dom 8:30 - 23:00`,
  description:`Il circolo dispone di 2 campi in terra rossa e un campo in erba sintetica. Tutti tre i campi sono coperti e riscaldati nel periodo invernale mentre in estate offrono una location baciata dal sole e accarezzata dalla brezza marina. Nella struttura sono inoltre presenti ampi spogliatoi maschili e femminili, una club house dotata di tv e snack bar, una piccola palestra ad esclusivo uso dei soci, una terrazza panoramica per eventi, ping pong, macchina incordatrice, ampio parcheggio privato adiacente alla struttura e una segreteria efficiente e attenta a rispondere alle richieste dei suoi soci e dei ragazzi della Scuola Tennis. 
`}
,'dott_manfra':{
  name:'Dottor Manfra',
  html_title:'Dottor Manfra: Studio Dentistico moderno a Trieste ',
  id:42,
  campo:false,
  keywords:'Dottor Manfra, Dottor Manfra Trieste, dentista trieste, Manfra dentista, manfra trieste, studio dentistico trieste, dentisti a trieste',
  og_url:'https://prenota.cc/appuntamento/dott_manfra',
  og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
  og_description:'Antonio Manfra dentista professionale, giovane ed accessibile economicamente. Vienici a trovare',
  phone: '+39 3534110525',
  address: 'Via delle sette fontane 67',
  zip_code:'34139',
  bg_opacity:'#00000099',
  img_bg:'../assets/Dentista_Template_Free_Vector.svg',
  bookable_pc:true,
  category:'Studio Dentistico a Trieste',
  hours:`Lun - Gio 9:00 - 19:00, Ven 9:00 - 15:00, Sab 9:00 - 13:00`,
  description:`Mi chiamo Antonio Manfra e sono un dentista specializzato nella cura dei bambini e dei ragazzi.  
<br>
  Ho conseguito la specializzazione in odontoiatria pediatrica presso l'Università degli studi di Trieste, con il massimo dei voti, lavorando attivamente presso l'Ospedale infantile Burlo Garofalo.<br><br> La mia passione per la cura dei bambini e dei ragazzi nasce dal desiderio di vederli sempre felici e in salute, quindi voglio dedicare particolare attenzione alla PREVENZIONE e alla CURA della bocca dei più piccini.
  è importante far vivere il dentista con serenità, un'esperienza positiva, così da poter seguire i piccoli pazienti nella loro crescita, senza ansie e traumi.. <br> <br> 

  Opero nello studio dentistico dr. Altin e dr. Harei, presente da più di 20 anni a Trieste.<br><br> 

                            Lo studio multidisciplinare esegue servizi di ogni tipo.
`}
,'farmacia_cermelj':{
  name:'Farmacia Cermelj Sas',
  html_title:'Farmacia Cermelj Sas: Tamponi rapidi a Opicina, Trieste',
  id:44,
  campo:false,
  keywords:'Farmacia Cermelj Sas, Farmacia Cermelj Sas Opicina, Farmacia Opicina, Farmacia Trieste, tampone rapido trieste, tampone rapido opicina,tampone rapido online trieste, tampone rapido online opicina, tampone rapido',
  og_url:'https://prenota.cc/appuntamento/farmacia_cermelj',
  og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
  og_description:'Prenota un tampone rapido online nella farmacia Cermelj. Ci metti qualche secondo',
  phone: '+39 3516060650',
  address: 'Via di Prosecco 3,',
  zip_code:'34151',
  bg_opacity:'#00000099',
  img_bg:'../assets/farmacia_cermelj.png',
  bookable_pc:true,
  category:'Farmacia a Trieste',
  hours:`Da Lun a Sab 08:00 - 19:30`,
  description:`Prenota un tampone rapido online nella farmacia Cermelj. Ci metti qualche secondo.<br>La nostra farmacia offre anche numerosi altri servizi:
  Prenotazioni Cup : da lunedì a venerdì 8.30-12.30,
  Autoanalisi del sangue,
  Misurazione pressione arteriosa,
  Forazione lobi,
  Preparazioni galeniche e magistrali,
  Tisane,
  Fiori di Bach,
  Fitoterapia,
  Farmacista Nutrizionista,
  Omeopatia,
  Cosmesi,
  Neonati e bambini,
  Veterinar,
  Per evitare le code ordina quello

che ti serve telefonicamente e passa a ritirarlo

in Farmacia quando vuoi.
`}
,'studio_gasbarro':{
      name:'Studio Gasbarro',
      html_title:'Studio Gasbarro: Dottore Commercialista Centro CAF Patronato a Castel di Sangro (AQ)',
      id: 45,
      campo:false,
      keywords:"Studio Gasbarro, Silvia Gasbarro, Centro CAF Patronato, Dottore Commercialista Gasbarro, Dottore Commercialista a Castel di Sangro, Centro CAF Patronato L'Aquila, Commercialista Castel di Sangro, Commercialista L'Aquila, Gasbarro Castel di Sangro, Studio Tributario e Fiscale Gasbarro, Studio Tributario e Fiscale Castel di Sangro, 730 Castel di Sangro, domanda disoccupazione Castel di Sangro, ISEE Castel di Sangro, Visure Camerali Castel di Sangro, Redditi di Cittadinanza Castel di Sangro",
      og_url:'https://prenota.cc/appuntamento/studio_gasbarro',
      og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
      og_description:'Studio Gasbarro, prenota un servizio tributario e fiscale a Castel di Sangro: la Dott.ssa Gasbarro aiuta i clienti con Domanda Disoccupazione, Contabilità Forfettarie, 730, Domanda Maternità e molto altro.',
      phone: '+39 0864847002',
      address: 'Via XX Settembre 131, Castel di Sangro (AQ)', 
      zip_code:'67031',
      bg_opacity:'#000000aa',
      img_bg:'../assets/Gasbarro.jpg',
      bookable_pc:true,
      category:'Centro CAF Commercialista',
      hours:`Lun - Ven dalle 9:30 alle 13 senza appuntamento - Lun - Ven dalle 16 alle 19 con appuntamento preso online`,
      description:`Dott. ssa Silvia Gasbarro <br><br>
  Dottore Commercialista e Revisore Contabile<br><br>
  Iscritta all'Albo dei Dottori Commercialisti ed Esperti Contabili della Provincia di L'Aquila sez. “A” al n. 322, Revisore Contabile, mediatore commerciale e creditizio.<br><br>
  Svolge la propria attività di commercialista, centro CAF e Patronato.<br><br>
  Si occupa principalmente di consulenza fiscale, societaria, contabile, tributaria, contrattuale, pratiche patronato fornita sia ai clienti dello studio sia ad aziende esterne. <br><br>
  Esperta in fondi perduti per aziende. 
  `}
  ,'faniolimpia':{
        name:'Fani Olimpia GSD',
        html_title:'Fani Olimpia : Campo da calcetto a Trieste. Partite di calcetto a sette (7) in centro a Trieste ',
        id: 35,
        campo:true,
        keywords:"Fani Olimpia, Fani Olimpia Trieste, Fani Olimpia calcetto, Fani Olimpia calcetto a 7, Fani Olimpia calcetto a sette, Fani Olimpia calcetto a sette Trieste, calcetto Trieste, campo calcetto Trieste, campo da calcetto Trieste,  campo da calcio Trieste, campo calcio Trieste, calcio a sette Trieste",
        og_url:'https://prenota.cc/appuntamento/faniolimpia',
        og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
        og_description:'Fani Olimpia Trieste, vedi le disponibilità e prenota il campo a sette online in qualche secondo. Campo in centro a Trieste, via Pascoli.',
        phone: '+39 040360407',
        address: 'Via Pascoli 31/a, Trieste', 
        zip_code:'34129',
        bg_opacity:'#00000088',
        img_bg:'../assets/fani.jpeg',
        bookable_pc:true,
        category:'Campo da calcetto a sette Trieste',
        hours:`Lun - Dom dalle 18:00 alle 22:00`,
        description:`
    Il campo di calcio a 7 giocatori di via Pascoli è nuovo e pronto ad essere utilizzato. <br><br>
    Gestito dal GSD Fani Olimpia:  Gruppo sportivo dilettantistico ad indirizzo calcistico situato nel centro di Trieste.<br>
   È stato rinnovato nel Gennaio 2021 ed è diventato il miglior campo da calcetto a Trieste.

   <br><br>
   Siamo entusiasti di potervi ospitare nel nostro nuovo campo.
    `}
    ,
      'montuzza':{
            name:'Montuzza',
            html_title:'Montuzza: Campo da calcetto a Trieste. Partite di calcetto a sette (7) a Trieste ',
            id: 52,
            campo:true,
            keywords:"Montuzza, Montuzza campo, Montuzza calcetto, Montuzza calcetto a 7, Montuzza calcetto a sette, Montuzza calcetto a sette campo, calcetto Trieste, campo calcetto Montuzza, campo da calcetto Montuzza,  campo da calcio Trieste Montuzza, campo Montuzza calcio Trieste, calcio a sette Montuzza",
            og_url:'https://prenota.cc/appuntamento/borgoalta',
            og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
            og_description:'Montuzza campo da calcetto Trieste, vedi le disponibilità e prenota il campo a sette online in qualche secondo. Campo Montuzza a Trieste, via Tonino amatori.',
            phone: '+39 040308814',
            address: 'Via Tommaso Grossi 4', 
            zip_code:'34131',
            bg_opacity:'#00000088',
            img_bg:'../assets/icons/DSC_1021-2048x1536.jpeg',
            bookable_pc:true,
            category:'Campo da calcetto a sette Trieste',
            hours:`Lun - Dom dalle 18:00 alle 22:00`,
            description:`

       
        L'Oratorio dispone di un campo da calcetto a sette (Montuzza)  in erba sintetica con spogliatoi e illuminazione, il campo è disponibile per gli amatori nei giorni feriali dalle 19:00 in poi.
        Campo all' interno di un oratorio, posto tranquillo ed amichevole <br>
       <br><br>
       Siamo entusiasti di potervi ospitare nel nostro campo.
        `}
      ,
      'villaara':{
            name:'Villa Ara',
            html_title:'Villa Ara: Campo da calcetto a Trieste. Partite di calcetto a sette (7) a Trieste ',
            id: 52,
            campo:true,
            keywords:"Villa Ara, Villa Ara campo, Villa Ara calcetto, Villa Ara calcetto a 7, Villa Ara calcetto a sette, Villa Ara calcetto a sette campo, calcetto Trieste, campo calcetto Villa Ara, campo da calcetto Villa Ara,  campo da calcio Trieste Villa Ara, campo Villa Ara calcio Trieste, calcio a sette Villa Ara",
            og_url:'https://prenota.cc/appuntamento/villaara',
            og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
            og_description:'Villa Ara campo da calcetto Trieste, vedi le disponibilità e prenota il campo a sette online in qualche secondo. Campo Villa Ara a Trieste, via Monte Cengio 2.',
            phone: '+39 040 568474',
            address: 'Via Monte Cengio 2', 
            zip_code:'34127',
            bg_opacity:'#00000088',
            img_bg:'../assets/icons/calcio-Caritas.jpeg',
            bookable_pc:true,
            category:'Campo da calcetto a sette Trieste',
            hours:`Lun - Dom dalle 18:00 alle 22:00`,
            description:`

       
        L'Oratorio dispone di un campo da calcetto a sette (Villa Ara)  in erba sintetica con spogliatoi e illuminazione, il campo è disponibile per gli amatori nei giorni feriali dalle 19:00 in poi.
        Campo all' interno di un oratorio, posto tranquillo ed amichevole <br>
       <br><br>
       Siamo entusiasti di potervi ospitare nel nostro campo.
        `}
      ,
      'tattooatelier13':{
            name:"L'Atelier 13 tattoo",
            html_title:"L'Atelier 13 tattoo: Tatuaggi e Pierging a Trieste. Preventivi per tatuaggi",
            id: 56,
            campo:false,
            keywords:"L'Atelier 13 Tatttoo, L'Atelier 13 Tatttoo Trieste, tatuaggio trieste, tatuatori trieste, tatoo trieste, tatuaggi viale d'annunzio, tatuaggi via delle sette fontane, tatuatori trieste,  tatuatore trieste",
            og_url:'https://prenota.cc/appuntamento/tattooatelier13',
            og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
            og_description:"L'atelier 13, tuaturi professionisti a Trieste. Passa in studio e vediamo insieme il tatuaggio più adatto a te. ",
            phone: '+39 338 8166284',
            address: "Viale D'annunzio 18/a", 
            zip_code:'34138',
            bg_opacity:'#00000088',
            img_bg:'../assets/61538846_453343652147516_8645654937897795584_n.jpeg',
            bookable_pc:true,
            category:'Tatuaggi e Piercing a Trieste',
            hours:`Lun - Sab  09:30 -14:00 e 16:00 - 19:00`,
            description:`

       
        Studio Tatuaggi, un unico riferimento in viale D'annuzio 18/a Trieste!
        <br>      <br>
        L'atelier 13, tuaturi professionisti a Trieste. Siamo giovani e pronti a customizzare un tatuaggio su misura per te.
       
        Passa in studio e troviamo insieme il tatuaggio più adatto alle tue esigenze. Ivan e Marko ti assisteranno in tutto, dai disegni all'esecuzione.
        `}
      ,'msnails':{
            name:'MS Nails',
            html_title:'MS Nails Art: Unghie ed Estetista a Trieste',
            id:54,
            campo:false,
            keywords:'MS nails, nail art,unghie a trieste, permanente unghie trieste, MS, nails, estetista donna, via molino a vento, cura, trucco, make up trieste, estetista trieste, nail art trieste, san giacomo',
            og_url:'https://prenota.cc/appuntamento/msnails',
            og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
            og_description:'MS Nails: Trattamenti di manicure, ricostruzione unghie, smalti e pedicure. Vieni a farti coccolare',
            phone: '380 864 5039',
            address: 'Via Molino a Vento 26/d', 
            zip_code:'34137',
            bg_opacity:'#00000088',
            img_bg:'../assets/ms_bg.jpeg',
            bookable_pc:true,
            category:'Unghie ed Estetista a Trieste',
            hours:`Mar - Sab 9:00 - 18:00`,
            description:`MS Nails'
        
        Salone dedicato alla cura della persona.
        Ci occupiamo di trattamenti mani e piedi, dalla semplice manicure a ricostruzioni gel e smalti semipermanenti, laminazione ciglia, extension ciglia e trattamenti viso.
        Ti aspetta professionalità e qualità.”
        
        `},
        'deselyhairstyle':{
              name:'Desely HairStyle and MakeUp',
              html_title:'Desely HairStyle and MakeUp: Studio parrucchiere a Trieste ',
              id:53,
              campo:false,
              keywords:'Desely, Desely Trieste, Desely HairStyle and MakeUp, Desely HairStyle and MakeUp Trieste, parrucchiere, desely, hairstyle, capelli donna, via molino a vento, makeup, trucco, taglio donna, parrucchiere trieste, salone trieste, san giacomo',
              og_url:'https://prenota.cc/appuntamento/deselyhairstyle',
              og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
              og_description:'Desely HairStyle and Makeup. Salone parrucchieri a Trieste contrato improntato sul benessere ed il naturale',
              phone: '380 864 5039',
              address: 'Via Molino a Vento 26/d', 
              zip_code:'34137',
              bg_opacity:'#00000088',
              img_bg:'../assets/hairdressers-accessories-vector-20213721.jpeg',
              bookable_pc:true,
              category:'Parrucchiere a Trieste',
              hours:`Mar, Mer, Ven e Sab dalle 9:00 alle 14:00, Gio dalle 11:30 alle 15:30`,
              description:`Desely HairStyle and MakeUp'
          
          Il Salone è improntato sul benessere ed il naturale, grazie alle sue linee di prodotti Nevitaly e Milkshake. 
          La filosofia che abbiamo adottato deriva dalla nostra principale linea: “Vivere la natura, capirne i segreti, miscelare i principi attivi trasformandoli in prodotti di bellezza e benessere nel pieno rispetto dell'ambiente.”
          
          `},
       'trifoglio':{
            name:'ASD Trifoglio',
            html_title:'ASD Trifoglio: Campo da calcetto a Trieste. Partite di calcetto a sette (7) a Trieste ',
            id: 41,
            campo:true,
            keywords:"ASD Trifoglio, ASD Trifoglio campo, ASD Trifoglio calcetto, ASD Trifoglio calcetto a 7, ASD Trifoglio calcetto a sette, ASD Trifoglio calcetto a sette campo, calcetto Trieste, campo calcetto ASD Trifoglio, campo da calcetto ASD Trifoglio,  campo da calcio Trieste ASD Trifoglio, campo ASD Trifoglio calcio Trieste, calcio a sette ASD Trifoglio",
            og_url:'https://prenota.cc/appuntamento/villaara',
            og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
            og_description:'ASD Trifoglio campo da calcetto Trieste, vedi le disponibilità e prenota il campo a sette online in qualche secondo. Campo ASD Trifoglio a Trieste, via Monte Cengio 2.',
            phone: '+39 338 6992009',
            address: 'Via delle campanelle 266', 
            zip_code:'34149',
            bg_opacity:'#00000088',
            img_bg:'../assets/IMG_1644.png',
            bookable_pc:true,
            category:'Campi da calcetto a sette e a cinque Trieste',
            hours:`Lun - Dom dalle 18:00 alle 22:00`,
            description:`

       
        È disponibile il campo da calcetto a sette (ASD Trifoglio)  in erba sintetica con spogliatoi (al momento non agibili causa COVID) e illuminazione, il campo è disponibile per gli amatori nei giorni feriali dalle 18:00 in poi.
        È disponibile anche il campo da calcetto a cinque, ottimo per gruppi più piccoli <br>
       <br><br>
       Siamo entusiasti di potervi ospitare nel nostro campo.
        `},'circolo_marina_mecantile':{
          name:'Tennis Circolo  Marina Mercantile',
          html_title:'Circolo Tennis Grignano: Campi da tennis in terra ed erba a Trieste ',
          id:60,
          campo:true,
          keywords:'tennis marina mercantile, Circolo Tennis marina mercantile, Circolo Tennis Marina mercantile Trieste, cmm, cmm trieste,cmm tennis trieste, tennis campo in terra trieste, circolo tennis trieste',
            og_url:'https://prenota.cc/appuntamento/Tennis_marina_mecantile',
            og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
            og_description:'Prenota un taglio capelli a Trieste: i migliori parrucchieri e barbieri a Trieste. Piega, taglio e taglio capelli uomo nel quartiere di Chiarbola a Trieste.',
          phone: '+39 040412327',
          address: 'V.le Miramare 40', 
          zip_code:'34136',
          bg_opacity:'#000000aa',
          img_bg:'../assets/action-athlete-ball-cmm.jpeg',
          bookable_pc:true,
          category:'Campi da tennis a Trieste',
          hours:`Lun - Dom 8:30 - 23:00`,
          description:`Il circolo dispone di 2 campi in terra rossa e un campo in erba sintetica. Tutti tre i campi sono coperti e riscaldati nel periodo invernale mentre in estate offrono una location baciata dal sole e accarezzata dalla brezza marina. Nella struttura sono inoltre presenti ampi spogliatoi maschili e femminili, una club house dotata di tv e snack bar, una piccola palestra ad esclusivo uso dei soci, una terrazza panoramica per eventi, ping pong, macchina incordatrice, ampio parcheggio privato adiacente alla struttura e una segreteria efficiente e attenta a rispondere alle richieste dei suoi soci e dei ragazzi della Scuola Tennis. 
        `}


// 
      // 'dopolavoro':{

      // }
  // ,'MaiFidarsiDelBarbiere':{
  //       name:'Mai Fidarsi Del Barbiere',
  //       html_title:'Mai Fidarsi Del Barbiere | Il miglior barbiere a Trieste',
  //       id:49,
  //       campo:false,
  //       keywords:'barbiere, mai fidarsi del barbiere, taglio capelli, capelli uomo, androna, barbiere trieste, mai fidarsi del barbiere trieste, taglio capelli trieste, capelli uomo trieste, androna trieste, tommaso, hussein, daniele, barbiere trieste, barba a trieste, barba, barba trieste, barbiere a trieste, mai fidarsi del barbiere a trieste, taglio capelli a trieste, capelli uomo a trieste',
  //       og_url:'https://prenota.cc/appuntamento/MaiFidarsiDelBarbiere',
  //       og_image:'https://firebasestorage.googleapis.com/v0/b/prenota-d8fae.appspot.com/o/2.png?alt=media&token=b06ef072-51a7-432c-8f02-d38aebd47581',
  //       og_description:'Mai Fidarsi del Barbiere. Unusual Barber a Trieste',
  //       phone: '+39 3924204122',
  //       address: 'Androna del Torchio 3, Trieste (TS)', 
  //       zip_code:'34120',
  //       bg_opacity:'#00000088',
  //       img_bg:'../assets/Screenshotmfdl.png',
  //       bookable_pc:true,
  //       category:'Barbiere a Trieste',
  //       hours:`Mar - Ven dalle 9:00 alle 19:30<br> Sab dalle 11:00 alle 17:00`,
  //       description:`
  //   Mai Fidarsi del Barbiere è molto più di un posto dove farsi un taglio per aumentare il proprio livello di fascino; o trasformarsi in un hipster dalla barba perfetta e gli occhiali in plastica nera (non inclusi). Passa a scoprirci anche solo per berti un caffè.
  //   Abbiamo un Master di secondo livello in cazzeggio.
    
  //   `}
}
  slug
  constructor(private api: ApiService, private router: Router, private titleService: Title, private metaService: Meta) {
    var url
    if(this.router.url.includes('?')){
      url = this.router.url.split('?')[0].split('/')
    }else{
      url= this.router.url.split('/')
    }
   
    this.slug = url[url.length-1]
    if(this.businesses[this.slug] == undefined ){
      this.router.navigateByUrl('/home/ricerca')
    }
    this.id = this.businesses[this.slug].id
    this.name = this.businesses[this.slug].name
    this.bookable_pc = this.businesses[this.slug].bookable_pc
    this.campo =  this.businesses[this.slug].campo
    var html_title = this.businesses[this.slug].html_title
    var html_description = this.businesses[this.slug].og_description
    var html_image = this.businesses[this.slug].og_image
    var html_url = this.businesses[this.slug].og_url
    var html_keywords = this.businesses[this.slug].keywords
    this.titleService.setTitle(html_title)
    var metaTags=[
      {property: 'og:url', content: html_url},
      {property: 'og:title', content: html_title},
      {property: 'og:description', content: html_description},
      {property: 'og:image', content: html_image},
      {name: 'keywords', content: html_keywords},
      {name: 'description', content: html_description},
     
      
    ];
    metaTags.forEach(m=> this.metaService.updateTag(m))
    this.api.getStoresDetails(this.id).subscribe(async (data:any)=>{
      this.adons =data.adons
    },err=>{

    })
    // var head =document.head
  
    // var script = document.createElement('script');
    // script.setAttribute('type', 'application/ld+json');
    // script.innerHTML=this.businesses[this.slug].rich_cont
    // document.head.append(script)
  }
   async ngOnInit() {
   
    // Notiflix.Block.Standard('.service', 'Caricamento serivzi...');
    // this.api.storeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwiZXhwIjoxNTk2MTkwMTU1LCJlbWFpbCI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwib3JpZ19pYXQiOjE1OTM1MjUyMzJ9.JuKYHCyGe9BNt-WNitG3cH0Dm36_gF290C3vTKAtDV8")
    // this.apiNative.storeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwiZXhwIjoxNTk2MTkwMTU1LCJlbWFpbCI6ImdpYWNvbW92ZW5pZXJAZ21haWwuY29tIiwib3JpZ19pYXQiOjE1OTM1MjUyMzJ9.JuKYHCyGe9BNt-WNitG3cH0Dm36_gF290C3vTKAtDV8")
    var now = new Date()
    var today = now.getDay()
    this.day = now.getDate()
    this.month = now.getMonth()
    this.year = now.getFullYear()
    var now = new  Date()
    var month = now.getMonth()
    var day_number = now.getDate()
    
    for(let i=0; i< this.limit; i++){

      this.services_list.push({name:'service ' +i, duration:'1 ora'})
    }
    if(this.services_list.length>=7){
      this.show_scroll=true
    }
  //  window.addEventListener('scroll', function(ev) {

   
// },false
for (let i=0;i<31;i++){
  if((day_number + i)<= this.months_days[month]){
    var day = {"number" :day_number + i, "week_day" : ((today+i-1)%7), "month":+this.month, "year": this.year}
    this.active_date.push(false)
    this.active_date.push(false)
    this.week.push(day)
  }else{
    if(((this.month+1)%12)==0){
      var day = {"number" :day_number + i - this.months_days[month], "week_day" : ((today+i-1)%7), "month":((this.month+1)%12), "year": this.year+1 }
      this.active_date.push(false)
      this.active_date.push(false)
      this.week.push(day)
    }
    else{
      var day = {"number" :day_number + i - this.months_days[month], "week_day" : ((today+i-1)%7), "month":((this.month+1)%12), "year": this.year}
      this.active_date.push(false)
      this.active_date.push(false)
      this.week.push(day)
    }
  }
}
this.api.getStore(this.id).subscribe((res:any)=>{
  this.available_on=res.available_on
  if(this.available_on=='f'){
    this.hourfilter=this.full_hours
  }else{
    if(this.available_on=='a'){
      this.hourfilter=this.times
    }else{
      this.hourfilter=this.rows
    }
  }
  this.advance_day =res.book_advance
  
})

await this.getEmployees()
    // this.getAppointments(this.day)
    await this.tokenValidation()
    if(this.api.isvalidToken()){
      this.api.isStoreClient(this.id).subscribe(res=>{
        if(res[0]!=undefined){
          this.is_client = true
          this.is_member = res[0].isMember
          this.account_credits = res[0].credit
        }else{
          this.is_client = false
        }
        this.getDatesAndServices()
      })
    }else{
      this.is_client = false  
      this.getDatesAndServices()
    }
    // await this.calculateWorkdates()
  
    this.active_date[0]=true
 
   
        if(this.mobileCheck()){
          this.button_text="Prenota ora"
          if(this.router.url!='/appuntamento/studio_gasbarro'){
            this.book_site= true
          }else{
            this.book_site= false
          }
        
        }else{
          if(this.campo){
            this.button_text="Prenota un campo"
          }else{
            this.button_text="Prenota un appuntamento"
          }
          
          this.book_site= false
          }
          Notiflix.Report.Init(
            {
              success: 
              
              { 
              svgColor:'#0061d5',
              titleColor:'#1e1e1e',
              messageColor:'#242424',
              buttonBackground:'#0061d5',
              buttonColor:'#fff',
              backOverlayColor:'rgba(#00479d,0.2)',
              },            
            info: 
              {svgColor:'#0061d5',
              titleColor:'#1e1e1e',
              messageColor:'#242424',
              buttonBackground:'#0061d5',
              buttonColor:'#fff',
              backOverlayColor:'rgba(#00479d,0.2)',}
            },
          )
          if(this.api.isvalidToken()){
          this.api.paymentMethods().subscribe(res=>{
            console.log(res)
          })
        }
  }
  getDatesAndServices(){
    this.calculateWorkdates().then(()=>{
      
     
      this.api.getEmploservicebyStore(this.id).subscribe(async data=>{
        this.employees_serivces = await data
        await this.getservices()
          },err=>{
            console.log(err)
          })
    })
  }
  mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };
  scrollInfo(){
    var viewportHeight = window.innerHeight;
    document.getElementById('cont-scroll').scrollTop = viewportHeight;
  }
  scroll(forward,id){
    if(forward){
     document.getElementById(id).scrollLeft += 420;
    }else{
     document.getElementById(id).scrollLeft -= 420;
    }
  }
  closeBook(){
    this.position_book='absolute'
    this.booking_left='100vw'
  }
  getEmployees(){
   
      this.api.getEmployeesfromshop(this.id).subscribe( async data=>{
        this.employees_list = await data  
           
      },err=>{
        console.log(err)
      })
    
  
  }
  showCalendar(){
    this.serv_displ='none'
    this.cal='block'
    this.spots='none'

  }

  getservices(){
  
    this.active_services=[]
      this.api.getStoreservicebyStore(this.id).subscribe(
        async data=>{
          this.services = await data
          this.services = this.services.filter(val =>{
            return val.hasToBeMember == this.is_member })
          if(!this.is_client){
            this.services = this.services.filter(val =>{
              return !val.hasToBeCLient  })
          }
          for(let i=0;i< this.services.length;i++){
            this.active_services.push(["#ffffff", '#263b56',false])
          }          
        err=>{
          console.log(err)
        }
      })
    
  }
  closeBooking(){
    setTimeout(() => {
    this.serv_displ='none'
    this.cal='none'
    this.spots='none'
  
    }, 300);
    
  }
  showServices(){
    if(this.mobileCheck()){
      if(this.bookable_pc){
      window.location.href = 'https://mobile.prenota.cc/business/'+this.id
      }else{
        Notiflix.Report.Info("Scarica l'app", "Al momento siamo prenotabili solo da app! Clicca sul tasto in alto per scaricarla.", 'OK');
      }
    }else{
      if(this.bookable_pc){
        this.position_book ='fixed'
        this.booking_left= '0px'
      }else{
        Notiflix.Report.Info("Scarica l'app", "Per prenotare in qualche secondo, cerca 'Prenota' su Google Play o Appstore e scarica l'app", 'OK');
      }
      
    
    }
  }
  async getAdons(service){
    this.api.getServiceAdons(service.id).subscribe(res=>{
      this.adons_list = res
    })
   }
  async tokenValidation(){
   
      if(this.api.isvalidToken()){
        this.api.getUser().subscribe( async data=>{
          this.user = await data
        },err=>{
          console.log(err)
        })
      }
    
    
  }
  async getAppointments(day,bool){
   
    var date = new Date(this.year, this.month, day)
   
    var week = await this.getWeekNumber(date)
    this.list_appointments=[]
    if(this.last_selected_week==week-4 || this.last_selected_week==week-3 || this.last_selected_week==week-2 || this.last_selected_week==week-1 || this.last_selected_week==week){
      // this.last_selected_week=week
      for (let appointment of this.appointments){
        if (day == appointment.day){
         this.list_appointments.push(appointment)
        }
      }
      var all_serv = this.service
      for(let ind in this.service){
        this.service = await all_serv.slice(0,+ind+1)

         await this.calculateAvailability(date, bool)
  
      }
    }else{
      
      this.list_appointments=[]
      this.api.getAppointmentsByshop5(week,this.id).subscribe(
        async data=>{
          this.last_selected_week=week
          this.called=true
         this.appointments =  await data
         for (let appointment of this.appointments){
           if (day == appointment.day){
            this.list_appointments.push(appointment)
           }
         }
         var all_serv = this.service
        for(let ind in this.service){
          this.service =await all_serv.slice(0,+ind+1)   
           await this.calculateAvailability(date,bool)
     
        }
         
        err=>{
          console.log(err)
        }
      })
    
  }

  }
  groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  checkServActive(id){
    var is_present = this.service.filter(val=>{return val.id ==id})
    return   is_present.length>0
  }
  selectService(service,i){
    this.uniques=[]
    // Notiflix.Block.Standard('.all_spots', 'Calcolando disponibilità...');
    this.spin_spots = "block"
    this.spin_spots_neg = "hidden"
    let index
    this.cont=0  
    if(this.adons){
      for(let i=0;i< this.services.length;i++){
        this.active_services.push(["#ffffff", '#263b56',false])
      }
      this.service=[]
      this.service.push(service)

      index = this.service.indexOf(service);
      var list =[ ]
        for(let ser of this.employees_serivces){
          if(service.id == ser.service_id){
            var name = this.employees_list.filter( function( el ) {
              return el.employee == ser.employee})
            list.push({id:ser.employee, name: name[0].name})
          }
        }
        this.empl_for_service.push(list)
        this.getAdons(service)
       
        this.active_services[i]=["#0061d5","#ffffff",true,"#ffffff"]

    }else{
     index = this.service.indexOf(service);
    if (index > -1) {
      this.service.splice(index, 1);
      this.empl_for_service.splice(index, 1)
    }else{
      this.service.push(service)
      var list =[ ]
      for(let ser of this.employees_serivces){
        if(service.id == ser.service_id){
          var name = this.employees_list.filter( function( el ) {
            return el.employee == ser.employee})
          list.push({id:ser.employee, name: name[0].name})
        }
      }
      this.empl_for_service.push(list)
    }}
    if(this.active_services[i][2]){
      this.active_services[i]=["#ffffff","#263b56",false,"#939999"]
    }else{
      this.active_services[i]=["#0061d5","#ffffff",true,"#ffffff"]
    }
    if(this.service.length==1){
      this.selected_service  =this.service[0].name
      this.cont=1
    }else{
      if(this.service.length==0){
        // if(this.selected_service=='Seleziona servizio'){
          this.selected_service  =' Seleziona servizio' 
      this.cont=0
        }else{
          for(let service of  this.active_services){
            if(service[0]==["#0061d5"]){
              this.cont=this.cont+1
            }
            }
          this.selected_service= `${this.cont} elementi selezionati`
        }
     
    }
    if( this.service.length!=0){
      this.selected_services = ' selec'
      this.getAppointments(this.day,this.called)
    }
    this.firstweek_availability()
    // this.calculateAvailability(date)
  
  }

  async DatePicker(date_avi, ind, bool) {
    // this.spin_spots_neg='hidden'
    // // this.spin_spots='block'
    // this.final_spots =[]
    //   for (let indd in this.active_date){
    //     this.active_date[indd]=false
    //   }
    //   this.today= `${date_avi.number} ${this.months[date_avi.month]} ${date_avi.year}`
    //   this.day = date_avi.number
    //   this.month = date_avi.month
    //   this.year = date_avi.year
    //   this.active_date[ind] = true
    //   var x = await this.getAppointments(this.day,bool)
    //   // var date = new Date(this.year, this.month, this.day)
    //   // await this.calculateAvailability(date)
      
      // for (let indd in this.active_date){
      //   this.active_date[indd]=false
      // }
      this.today= `${date_avi.number} ${this.months[date_avi.month]} ${this.year}`
      this.day = date_avi.number
      this.month = date_avi.month
      // this.active_date[ind] = true
      await this.getAppointments(this.day,bool)
      this.selected_date = this.today
      if(bool){
        setTimeout(() => {
          this.showSpots()
        }, 100);
      }
  }
  getOptionsArrray(array){
    let options = [];
    array.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }
  selectTime(spot){
    document.getElementById('modal').style.top='0px'
    this.selected_hour  = spot[0]
    this.timeslot = this.times[spot[0].start]
    this.confirm='block'
    this.app_to_book = spot
    this.displ_hour =  this.timeslot
    setTimeout(() => {
      this.serv_displ='none'
      this.cal='none'
      this.spots='none'
    }, 500);
   
    // console.log( this.app_to_book)
  }

  showSpots(){
    setTimeout(() => {
      this.serv_displ='none'
      this.cal='none'
      this.spots='block'
    }, 200);
    
    
  }
  async calculateWorkdates(){
 
       await this.api.getemployeeHoursByShop(this.id).subscribe(async data=>{
        this.empl_hours = await data
      var empl = await data
      var x:any =[]
      for(let work of empl){
        for(let day of this.week){
          if(day.week_day == work.wkday){
            if((day.number<this.day+this.advance_day && day.month==this.month)||(day.number<this.day+this.advance_day-this.months_days[this.month] && day.month==this.month+1)){
            }else{
              x.push(day)
            }
          }
        }
      }
    
      this.unique= [...new Set(x)];
      this.unique.sort(function(a, b){
        if (a.year < b.year) return -1;
        if (a.year > b.year) return 1;
        if (a.month < b.month) return -1;
        if (a.month > b.month) return 1;
        if (a.number > b.number) return 1;
        if (a.number < b.number) return -1;
      })
      this.day=this.unique[0].number
      this.month =this.unique[0].month      
      this.today= `${this.day} ${this.months[this.month]} ${this.year}`
      this.spin = 'none'
      this.getAppointments(this.day,true)
      
    },err =>{
      console.log(err) 
  }) 
  }

  emploShow(){
    this.emplo_show=[]
  for (let empl of this.employees_list){
    var x = 0
    for (let el of this.final_spots){
       if(empl.employee==el[0].employee){
          x= 1
       }
     }
     if(x==1){
      this.emplo_show.push(true)
     }else{
      this.emplo_show.push(false)
     }
    }
    this.show_something =false
    for(let el of this.emplo_show){
      if(el){
        this.show_something =true
      }
    }
  }
  async itsemploJob(){
    this.results_empl_serv =[]
    var items = this.employees_serivces,
    grouped = [];
items = await items.filter(function(value, index, arr){ ;return value.service_id != null })
items.forEach(function (a) {
    this[a.employee] || grouped.push(this[a.employee] = []);
    this[a.employee].push(a);
}, Object.create(null));
    for(let service of this.service){
      for(let ind in grouped){
                if(this.results_empl_serv.length<grouped.length){
          this.results_empl_serv.push([grouped[ind].filter(function(value, index, arr){ return value.service_id == service.id})])
        }else{ 
          var x = grouped[ind].filter(function(value, index, arr){ return value.service_id == service.id})
          if(x.length != 0 ){
              this.results_empl_serv[ind].push(x)
              
          }
        }
      }
    }
  }
  filter_s(){
    this.final_spots
  }
  async firstweek_availability(){
    this.uniques=[]
    this.availableSpots1=[]
    this.final_spots =[]
    var now = new  Date()
    var today = now.getDay() -1
    var month = now.getMonth()
    var day_number = now.getDate()
    var week_n =this.getWeekNumber(now)
    var week:any=[]
    var week2:any=[]
    if (today == -1){
      today= 6
    }
    for (let i=0;i<7;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
    week.push(day)
    }
    for (let i=7;i<14;i++){
      if( day_number - today  + i<= this.months_days[month]){
        var day = day_number - today  + i
        if(day<1){
        day= day +this.months_days[month-1]
        }
      }else{
        var day = day_number - today  + i - this.months_days[month]
      }
    week2.push(day)
    }
   
    var list1 =[ ]
    for (let day of this.empl_hours){
        var start = day.start_t
        var end =  day.end_t
        for (var i = start; i <= end; i++) {
          list1.push({time: i  , employee: day.employee, day: week[day.wkday], week_day: day.wkday});
        }
      }
      for (let day of this.empl_hours){
        var start = day.start_t
        var end =  day.end_t
        for (var i = start; i <= end; i++) {
          list1.push({time: i  , employee: day.employee, day: week2[day.wkday], week_day: day.wkday});
        }
      }
      this.list_work = list1
       if (this.just_entered == 0){

    
        this.api.getAppointmentsByshop2(week_n,this.id).subscribe(
          async data=>{
           this.all_app_week1 =  await data
           for(let appointment of  this.all_app_week1){
           
            this.list_work =  this.list_work.filter(function(value, index, arr){ return (value.time < appointment.start_t && appointment.employee==value.employee )|| (value.time  >= appointment.end_t && appointment.employee==value.employee || appointment.employee!=value.employee || appointment.day!=value.day )})
          } 
          var app
          var tot_dur=0
            for(let serv_ind of this.service){
             tot_dur = tot_dur+ serv_ind.duration_book
            }
            
           

              // if(id ==0 || id == max_ind || this.openhours[id].time-this.openhours[id-1].time> 1   || this.list_work[id].time-this.list_work[id-1].time< 0  || this.openhours[id].employee-this.openhours[id-1].employee!= 0 || app == undefined || app.duration == this.service[serv_ind].duration_book){
              //   if (app != undefined){
              //     if(app.duration ==   this.service[serv_ind].duration_book){
              //         this.availableSpots.push(app) 
              //         console.log(app) 
              //     }
              //     if(id>0 && this.openhours[id].time-this.openhours[id-1].time> 1){
              //       app=undefined
              //     }
              //   }

              //   if(this.hourfilter.indexOf(this.times[this.openhours[id].time])!=-1){
              //     app = {start: this.openhours[id].time, duration: 1, employee:y, emplo_name:empl_name, service: this.service[0].id , service_name: service_name}
                
              //   }
            
              // }else{
              //     app.duration +=1
              // }
            
              // console.log(this.all_app_week1.filter((app)=>{app.day==11}) ,this.all_app_week1)
            for(let idx in this.list_work){
       
              let id:any = idx
              var length =this.list_work.length-1
              if(id ==0 || id == length || this.list_work[id].time-this.list_work[id-1].time> 1 || this.list_work[id].time-this.list_work[id-1].time< 0  || this.list_work[id].employee-this.list_work[id-1].employee!= 0 || app == undefined || app.duration == tot_dur){
                if (app != undefined){
                  if(app.duration ==   tot_dur){
                    this.availableSpots1.push(app)
                }
                if(id>0 && this.list_work[id].time-this.list_work[id-1].time> 1){
                  app=undefined
                }
              }
              if(this.hourfilter.indexOf(this.times[this.list_work[id].time])!=-1){
                  app = { duration: 1, day: this.list_work[id].day} 
                }
               
             }else{
                 app.duration +=1
             }
           
            }
            // console.log(this.availableSpots,this.availableSpots1)
            let weeks=[]
            for(let spot of this.availableSpots1){
                weeks.push(spot.day)
              
            }
            weeks= await [...new Set(weeks)]
          
        
            var weeks1 =week
            for (let day of week2){
              weeks1.push(day)
            }
            
            weeks1 = await weeks1.filter( function( el ) {
              return weeks.indexOf( el ) < 0;
            } );
            
          
       
              this.uniques = await this.unique.filter( function( el ) {
                return weeks1.indexOf( el.number ) < 0;
            
              } );
              
              await this.DatePicker(this.uniques[0],0,true)
             
             //  Notiflix.Block.Remove('.all_spots');
   
          
        },err=>{
          console.log(err)
        })   
      this.just_entered=1
    }else{
          for(let appointment of  this.all_app_week1){
           this.list_work =  this.list_work.filter(function(value, index, arr){ return (value.time < appointment.start_t && appointment.employee==value.employee )|| (value.time  >= appointment.end_t && appointment.employee==value.employee || appointment.employee!=value.employee || appointment.day!=value.day )})
         } 
         var app
         var tot_dur=0
            for(let serv_ind of this.service){
             tot_dur = tot_dur+ serv_ind.duration_book
            }
          
         
            for(let idx in this.list_work){
       
              let id:any = idx
              var length =this.list_work.length-1
              if(id ==0 || id == length || this.list_work[id].time-this.list_work[id-1].time> 1 || this.list_work[id].time-this.list_work[id-1].time< 0  || this.list_work[id].employee-this.list_work[id-1].employee!= 0 || app == undefined || app.duration == tot_dur){
                if (app != undefined){
                  if(app.duration ==   tot_dur){
                    this.availableSpots1.push(app)
                }
                if(id>0 && this.list_work[id].time-this.list_work[id-1].time> 1){
                  app=undefined
                }
              }
              if(this.hourfilter.indexOf(this.times[this.list_work[id].time])!=-1){
                  app = { duration: 1, day: this.list_work[id].day} 
                }
               
             }else{
                 app.duration +=1
             }
           
            }
           
           let weeks=[]
           for(let spot of this.availableSpots1){
               weeks.push(spot.day)
             
           }
           weeks= await [...new Set(weeks)]
         
       
           var weeks1 =week
           for (let day of week2){
             weeks1.push(day)
           }
           
           weeks1 = await weeks1.filter( function( el ) {
             return weeks.indexOf( el ) < 0;
           } );
           
      
             this.uniques = await this.unique.filter( function( el ) {
               return weeks1.indexOf( el.number ) < 0;
           
             } );
            //  Notiflix.Block.Remove('.all_spots');
        
      }
  }
  async calculateAvailability(date, bool){
    
    this.total_service.duration=0
    this.total_service.name=''
    
        for(let service of this.service){
          if(this.service.indexOf(service) == this.service.length-1){
            this.total_service.name = this.total_service.name+service.name
            
          }else{
            this.total_service.name = this.total_service.name+service.name+' + '
            this.total_service.id = -1
            
          }
        }
        if(this.service.length==1){
           this.total_service.id = this.selected_services[0].id
        }else{
          this.total_service.id = -1
        }
    
    var serv_ind = this.service.length-1
    if(serv_ind == 0){
      var day_of_week = date.getDay()-1
      if (day_of_week == -1){
        day_of_week= 6
      }
      this.availableSpots=[]
      // this.api.getemployeeHoursByShop(this.id).subscribe(async  data=>{
      //     this.empl_hours =  await data
          var list = [];
          var app
          for (let day of this.empl_hours){
            if(day_of_week == day.wkday){
              var start = day.start_t
              var end =  day.end_t
              for (var i = start; i <= end; i++) {
                list.push({time: i  , employee: day.employee });
              }
            
            }

          }
          this.openhours = await list
          // console.log(this.openhours)
          for(let appointment of this.list_appointments){
            this.openhours = await this.openhours.filter((value, index, arr)=>{ return (value.time < appointment.start_t && appointment.employee==value.employee )|| (value.time  >= appointment.end_t && appointment.employee==value.employee ) || appointment.employee!=value.employee || appointment.month!=this.month})
          } 
          // console.log(this.openhours)
          for (let empl of this.employees_serivces){
            if( empl.service_id == this.service[0].id){                
              var y = empl.employee
              var empl_name = await this.employees_list.find(x => x.employee === y).name;
              var service_name = await this.services.find(x => x.id === empl.service_id).name;
              var max_ind = this.openhours.length-1
              // let _mid =0
              for(let idx in this.openhours){
               
                if(this.openhours[idx].employee==y){
                  let id:any = idx
                  if(id ==0 || id == max_ind || this.openhours[id].time-this.openhours[id-1].time> 1  || this.openhours[id].employee-this.openhours[id-1].employee!= 0 || app == undefined || app.duration == this.service[serv_ind].duration_book){
                    if (app != undefined){
                      if(app.duration ==   this.service[serv_ind].duration_book){
                          this.availableSpots.push(app) 
                      }
                      if(id>0 && this.openhours[id].time-this.openhours[id-1].time> 1){
                        app=undefined
                      }
                    }

                    if(this.hourfilter.indexOf(this.times[this.openhours[id].time])!=-1){
                      app = {start: this.openhours[id].time, duration: 1, employee:y, emplo_name:empl_name, service: this.service[0].id , service_name: service_name}
                    
                    }
                
                  }else{
                      app.duration +=1
                  }
                }
                }
              }
             
            }
                this.final_spots=[] 
                
              this.availableSpots= await [...new Set(this.availableSpots)]
         
              for(let spot of this.availableSpots ){
                  this.final_spots.push([spot])
                }
                
              this.final_spots=await [...new Set(this.final_spots)]
               
              await this.final_spots.sort(function(a, b) {
                return a[0].start - b[0].start;
             });
        
            
             this.filtr =  []
             this.place_holder = []   
            //  if(this.final_spots.length<1 || this.final_spots==undefined ||this.final_spots == null ) {
            //   if(this.uniques.length>0){
            //     if(date.getDate()==this.souniques[0].number){
            //       // this.just_entered =0
            //       this.uniques.shift()
            //       await this.DatePicker(this.uniques[0],0) 
            //      }else{
            //       this.has_spot=false
            //       console.log(this.uniques, this.count, this.final_spots)
            //       await this.filter_serv()
            //      }
            //   }
              

              
            //  }else{
              if(this.final_spots[0]){
                // console.log(this.final_spots[0], 'true')
                this.has_spot=true
                var g = this.final_spots[0][0].employee
                var f = this.final_spots[0][0].emplo_name
                this.filtr.push(g)
                this.place_holder.push(f)
                
                await this.filter_serv()
                if(bool && this.available_days.length>0){
                  this.date_vis='visible'
                  this.spin_spots_neg='visible'
                  this.spin_spots='none'
                }
              }else{
                this.final_spots_displ=[]
                this.has_spot=false
                if(bool && this.available_days.length>0){
                  this.date_vis='visible'
                  this.spin_spots_neg='visible'
                  this.spin_spots='none'
                }
              }
    }else{
      var day_of_week = date.getDay()-1
      if (day_of_week == -1){
        day_of_week= 6
      }
      
      this.availableSpots = this.final_spots
     
      var list = [];
      var app
      for (let day of this.empl_hours){
        if(day_of_week == day.wkday){
          var start = day.start_t
          var end =  day.end_t
          for (var i = start; i <= end; i++) {
            list.push({time: i  , employee: day.employee });
          }
        }
      }
      this.openhours = list
      
      for(let appointment of this.list_appointments){
        
        this.openhours = await this.openhours.filter((value, index, arr)=>{ return (value.time < appointment.start_t && appointment.employee==value.employee )|| (value.time  >= appointment.end_t && appointment.employee==value.employee ) || appointment.employee!=value.employee || appointment.month!=this.month})
      } 
      var o:any = await this.groupBy( this.openhours, 'employee')
    // setTimeout(async () => {
      this.final_spots=[]
      var last_spot_ind = +serv_ind - 1
      var dur_client =this.service[last_spot_ind].duration
      var duration = this.service[serv_ind].duration_book
     
      for (let empl of this.employees_serivces){
        if( empl.service_id == this.service[serv_ind].id){
             var x = empl.employee
            var empl_name = await this.employees_list.find(l => l.employee === x).name;
            var service_name = this.services.find(x => x.id === empl.service_id).name; 
            for(let spot of this.availableSpots){
              let time_spot = JSON.parse(JSON.stringify(spot));
              let obj = await this.openhours.find(obj => obj.time == (Math.ceil(dur_client/3)*3)+spot[last_spot_ind].start && obj.employee == empl.employee && spot.length == last_spot_ind+1 );
              
              if(obj!=undefined){
                var ind = this.openhours.indexOf(obj)
                if(ind+duration<this.openhours.length){
                  if (obj.time+duration == this.openhours[ind+duration].time && x!=undefined){
                    time_spot.push({start: obj.time, duration: duration,employee:x,emplo_name:empl_name, service: this.service[serv_ind].id,service_name: service_name})
                    this.final_spots.push(time_spot)
                  }
                }
              }
            }
            await this.filter_serv()
        }

      
    }
  //   if(this.max_spots!=-1){
  //       for(let emplo of this.employees_list){
  //         var d_final = this.final_spots.filter(function(value, index, arr){ return (value.employee == emplo.employee )})
  //         var limit = Math.min((d_final.length),this.max_spots)
  //         for(let i=0;i<limit;i++){
  //              y =Math.random()*(d_final.length-1)
  //             this.final_spots.push([d_final[y]])
  //             d_final.splice(y,1)
  //         }
         
      
  //   }
  // }
 
  // if(this.final_spots.length<1 || this.final_spots==undefined ||this.final_spots == null ) {
  //   if(this.uniques.length>0){
  //     if(date.getDate()==this.uniques[0].number){
  //       // this.just_entered =0
  //       this.uniques.shift()
  //       await this.DatePicker(this.uniques[0],0) 
  //      }else{
  //       this.has_spot=false
  //       console.log(this.uniques,this.final_spots, this.count)
  //       await this.filter_serv()
  //      }
  //   }
  // }else{

   
    if(this.final_spots[0]){
      await  this.final_spots.sort(function(a, b) {
        return a[0].start - b[0].start;
     });
    this.filtr =  []
    this.place_holder =  []
    for( let el of  this.final_spots[0]){
      this.filtr.push(el.employee)
      this.place_holder.push(el.emplo_name)

    }
  
    await this.filter_serv()
    this.has_spot=true
    if(bool && this.available_days.length>0){
      this.date_vis='visible'
      this.spin_spots_neg='visible'
      this.spin_spots='none'
    }
    }else{
      this.has_spot=false
        if(bool && this.available_days.length>0){
        this.date_vis='visible'
        this.spin_spots_neg='visible'
        this.spin_spots='none'
      }
    }
    


  // }
 
    // this.final_spots=[...new Set(this.final_spots)]
  
  // await this.emploShow()
  // }, 700);

}
  // }
    
}
async filter_serv(){
  var final_spots_displ = await this.final_spots.filter((v, i)=> {
      var c = true
      for(let i = 0;i< v.length; i++){
        if(v[i]["employee"] != this.filtr[i]){
            c=false
        }
      }
      return (c);

    
  })
  if(this.max_spots!=-1){
    this.final_spots_displ=[]
    
     var limit = Math.min((final_spots_displ.length),this.max_spots)

     for(let i=0;i<limit;i++){
         var x =Math.round( Math.random()*(final_spots_displ.length-1))
         this.final_spots_displ.push(final_spots_displ[x])  
         final_spots_displ.splice(x,1)     
     }
     await  this.final_spots_displ.sort(function(a, b) {
      return a[0].start - b[0].start;
   });
   }else{
     this.final_spots_displ= final_spots_displ
   }
   this.final_spots_displ= [...new Set( this.final_spots_displ)]
   console.log(final_spots_displ)
}
  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = +(new Date(Date.UTC(d.getUTCFullYear(),0,1)));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return  weekNo
  }


async book(){
  document.getElementById('modal').style.top='120vh'
  this.loading =true
  var appointment = {
    studio: this.name,
    date: this.today,
    service: this.total_service.name,
    time: this.timeslot,
  }
        var month = this.month
        var day = this.day
      if (day!=1){
        day=day-1
      }else{
        day = this.months_days[this.month]-1
        month=month-1
      }
   var x = this.timeslot.split(":")
    // console.log(new Date(this.year, month, this.day, x[0]-2), `Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} oggi alle ${this.timeslot}`, new Date(this.year, this.month, day, 11),`Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} il ${this.today} alle ${this.timeslot}`,)
    if(this.api.isvalidToken()){

      for (let  ind in this.app_to_book){
        // Notiflix.Block.Standard('.cont', 'Prenotazione in corso...');
        var client_name = this.user.first_name+' '+ this.user.last_name
        var start = this.app_to_book[ind].start
        var end = start + this.app_to_book[ind].duration
        this.email=this.user.email
        // console.log(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id,this.name)
        this.api.bookAppointmentNoOwner(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
          // console.log(data)
          this.res_book =data
          if( ind == '0'){
            // console.log(this.user.email,this.user.first_name,this.user.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.total_service.name,this.name)
            this.sendEmailConfirmation(this.user.email,this.user.first_name,this.user.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
          }
      // Notiflix.Block.Remove('.cont');
      this.loading = false
       Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
       var ok_btn = document.getElementById('NXReportButton')
       ok_btn.addEventListener("click",async ()=>{
         if(this.id==44){
            this.extra_data ='block'
          }else{
            this.router.navigateByUrl('i_miei_appuntamenti')
          }
        },false) 
    },
      err=>{
        
        this.loading = false
        if(err.error.just_booked){
          this.booked_same_top='calc(50vh - 300px)'
        }else{
          document.getElementById('modal').style.top='0px'
          Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
        }
        Notiflix.Block.Remove('.cont');
        })
      }
    }else{
      this.loading=false
      this.presentRegisterModal()
    }
  }
  SendBooking(type){
    document.getElementById('modal').style.visibility='hidden'
    if(type=='register'){
      this.submit()
    }else{
      this.login()
    }
  }
  submit(){
    //aggiungi loading icon
    this.first_name_err = ''
    this.last_name_err = ''
    this.email_err = ''
    this.phone_err = ''
    this.password_err = ''

    if(this.first_name== ''){
      this.first_name_err = 'Inserisci il tuo nome'
    }
    if(this.last_name== ''){
      this.last_name_err = 'Inserisci il tuo cognome'
    }
    if(this.email== ''){
      this.email_err = 'Inserisci la tua email'
    }
    if(this.phone== ''){
      this.phone_err = 'Inserisci il tuo numero di telefono'
    }
    if(this.password== ''){
      this.password_err = 'Inserisci una password'
    }
    if(this.first_name_err == '' && this.last_name_err == '' &&  this.email_err == '' && this.phone_err == '' && this.password_err == ''){
      
      this.api.register(this.first_name, this.last_name,  this.email, this.sex, this.phone, this.password).subscribe(
        async data=>{
          document.getElementById('modal').style.top='120vh'
          await this.api.storeToken(data.token)
          for (let  ind in this.app_to_book){
            var client_name = this.first_name+' '+this.last_name
            // var start = await this.app_to_book[ind].start
            // var end = await start + this.app_to_book[ind].duration
            this.api.bookAppointmentNoOwner(this.app_to_book[ind].start, this.app_to_book[ind].start+this.app_to_book[ind].duration, this.day, this.month, this.year, client_name, this.phone, this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
            this.register_form='none'
            this.res_book =data
            this.user.first_name=this.first_name
            this.user.last_name=this.last_name
            if( ind == '0'){
              this.sendEmailConfirmation(this.email,this.first_name,this.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
            }
            await Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
            var ok_btn = document.getElementById('NXReportButton')
            ok_btn.addEventListener("click",()=>{
              if(this.id==44){
                this.extra_data ='block'
              }else{
                this.router.navigateByUrl('i_miei_appuntamenti')
              }
            },false) 
            this.selected_date='Seleziona data'
            this.displ_hour='Seleziona ora'
            this.selected_service='Seleziona servizio'
          setTimeout(() => {
            this.toastx="none"
          }, 3000);
          this.total_service={name:'',duration:0,id:-1}
          this.service=[]},
            err=>{
              this.register_form = 'none'
              if(err.error.just_booked){
                this.booked_same_top='calc(50vh - 300px)'
              }else{
                document.getElementById('modal').style.top='0px'
                Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
              }
             
              console.log(err)
          })
        }
        },
        err => {
          if (err.error.email != undefined){
            this.email_err = 'Questa email è già stata utilizzata'
          }
          if (err.error.password != undefined){
            this.password_err = 'Questa password è troppo semplice. Prova ad aggiungere dei numeri'
          }
          console.log(err.error.password)
          console.log(err.error,'err')
        }
      )
      }
   
  }
  async login(){
    this.error=''
    this.api.login(this.email1,this.password1).subscribe(
     async data=>{
        this.api.storeToken(data.token)
        this.api.getUser().subscribe(async data=>{
        this.user = await data
        for (let  ind in this.app_to_book){
          // await this.storage.setAppointment(appointment)
          // Notiflix.Block.Standard('.cont', 'Prenotazione in corso...');
          var client_name = this.user.first_name+' '+this.user.last_name
          document.getElementById('modal').style.top='120vh'
          this.email=this.user.email
          // var start = await this.app_to_book[ind].start
          // var end = await start + this.app_to_book[ind].duration
          // console.log(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id,this.name)
          this.api.bookAppointmentNoOwner(this.app_to_book[ind].start, (this.app_to_book[ind].start+this.app_to_book[ind].duration), this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
            // console.log(data)
            this.res_book =data
            if( ind == '0'){
                this.sendEmailConfirmation(this.email1,this.user.first_name,this.user.last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
              }
              // await this.storage.setAppointment(appointment)
          // Notiflix.Block.Remove('.cont');
           Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
           var ok_btn = document.getElementById('NXReportButton')
              ok_btn.addEventListener("click",async ()=>{
                if(this.id==44){
                  this.extra_data ='block'
                }else{
                  this.router.navigateByUrl('i_miei_appuntamenti')
                }
              },false) 
       
          //  await this.pay()
       
          },
          err=>{
            this.register_form = 'none'
            if(err.error.just_booked){
              this.booked_same_top='calc(50vh - 300px)'
            }else{
              document.getElementById('modal').style.top='0px'
              Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
            }
          
            })
          
          }
        },err => {
          document.getElementById('modal').style.top='120vh'
          this.error = 'Error getting user data'
          console.log(err.error,'err')
        })
      },
      err => {
        document.getElementById('modal').style.top='0px'
        this.error = 'La password o la email che hai inserito non sono valide'
        console.log(err.error,'err')
      }
    )
  }
  // async bookfromLogin(email,first_name,last_name){
  //   this.loading=true
  //   var appointment = {
  //     studio: this.name,
  //     date: this.today,
  //     service: this.total_service.name,
  //     time: this.timeslot,
  //   }

  //     var token = await this.api.isvalidToken()
  //      var month = this.month
  //       var day = this.day
  //     if (day!=1){
  //       day=day-1
  //     }else{
  //       day = this.months_days[this.month]-1
  //       month=month-1
  //     }
  //  var x = this.timeslot.split(":")
  //   // console.log(new Date(this.year, month, this.day, x[0]-2), `Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} oggi alle ${this.timeslot}`, new Date(this.year, this.month, day, 11),`Ricordati il tuo appuntamento presso ${this.name}.\n${this.total_service.name} il ${this.today} alle ${this.timeslot}`,)
  //   if(this.api.isvalidToken()){
  //   for (let  ind in this.app_to_book){
  //     // await this.storage.setAppointment(appointment)
  //     // Notiflix.Block.Standard('.cont', 'Prenotazione in corso...');
  //     var client_name =first_name+' '+ last_name
  //     document.getElementById('modal').style.top='120vh'
  //     // var start = this.app_to_book[ind].start
  //     // var end = start + this.app_to_book[ind].duration
  //     // console.log(start, end, this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id,this.name)
  //     this.api.bookAppointmentNoOwner(this.app_to_book[ind].start, (this.app_to_book[ind].start+this.app_to_book[ind].duration), this.day, this.month, this.year, client_name, this.user.phone,  this.service[ind].name, this.app_to_book[ind].employee, this.app_to_book[ind].service,this.id).subscribe(async data=>{
  //       // console.log(data)
  //       this.res_book =data
  //       if( ind == '0'){
  //           this.sendEmailConfirmation(email,first_name,last_name,this.day,this.months_names[this.month],this.year,this.times[this.app_to_book[ind].start],this.service[ind].name,this.name)
  //         }
  //         // await this.storage.setAppointment(appointment)
  //     // Notiflix.Block.Remove('.cont');
  //      Notiflix.Report.Success("L'appuntamento è stato prenotato", 'Controlla la tua email per ulteriori informazioni', 'OK');
  //      var ok_btn = document.getElementById('NXReportButton')
  //         ok_btn.addEventListener("click",async ()=>{
  //           if(this.id==44){
  //             this.extra_data ='block'
  //           }else{
  //             this.router.navigateByUrl('i_miei_appuntamenti')
  //           }
  //         },false) 
  //         this.loading=false
  //     //  await this.pay()
   
  //     },
  //     err=>{
  //       this.register_form = 'none'
  //       if(err.error.just_booked){
  //         this.booked_same_top='0px'
  //       }else{
  //         document.getElementById('modal').style.top='0px'
  //         Notiflix.Report.Failure("Errore, prenotazione fallita", 'Controlla la tua connessione o prova a cambiare orario', 'Annulla');
  //       }
  //       })
  //     }
  //     }else{
  //       this.presentRegisterModal()
  //     }
    
  //   }
  sendEmailConfirmation(email, name, surname, day, month, year, time, servcie, shop){
      this.api.emailConfirmBooking(email,name,surname,day,month,year,time,servcie,shop).subscribe(
        data=>{
          // console.log(data)
        },err=>{
            console.log(err)
        }
      )
    
}

presentRegisterModal(){
  this.loading=false
  this.register_form="block"
  this.disabled_btn=false
}

closeConfirm(ev){
  if(ev.target.id =='confirm'){
    this.confirm='none'
  }
 
}
backtoBooking(){
  this.booked_same_top='120vh'
  document.getElementById('modal').style.top='0px'
  this.confirm='none'
}

logScrolling(ev){
  if (ev.detail.scrollTop>100){
this.text_c='#fff'
  }else{
    this.text_c='#0061d5'
  }
}
getapp(){
  // if(this.mobileCheck()){
    var userAgent = navigator.userAgent || navigator.vendor ;
      if (/android/i.test(userAgent)) {
        window.location.href="http://play.google.com/store/apps/details?id=io.prenota.client"
      }
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href="https://apps.apple.com/app/id1523525291"
      }
  // }
}
closeBookingPage(){
  this.booking_left='100vw'
  this.position_book='absolute'
}

update_extra_data(){

  var extra_data =
  `- Nome e cognome:
  ${this.res_book.client_name}
  - Cellulare:
  ${this.res_book.phone}
  - Email:
  ${this.email}
  - Codice Fiscale:
  ${this.fiscal_code}`

  if(this.fiscal_code==undefined || this.fiscal_code==null|| this.fiscal_code==''){
    this.fiscal_code_err='Inserisci il codice fiscale'
  }else{
    this.fiscal_code_err=''
  }
  // if(this.born_city==undefined || this.born_city==null|| this.born_city==''){
  //   this.born_city_err='Inserisci il comune di nasicta'
  // }else{
  //   this.born_city_err=''
  // }
  
  setTimeout(() => {
    if( this.fiscal_code_err==''){
      this.api.updateAppointment(this.res_book.id, this.res_book.start_t, this.res_book.end_t, this.res_book.day, this.res_book.month, this.res_book.year, this.res_book.client_name, this.res_book.phone, this.res_book.details, this.res_book.employee, this.res_book.service_n, extra_data).subscribe(async res =>{
     
        Notiflix.Report.Success("Grazie!", "I suoi dati sono stati registrati", 'Continua')
        var ok_btn = document.getElementById('NXReportButton')
        ok_btn.addEventListener("click",async ()=>{
             this.router.navigateByUrl('i_miei_appuntamenti')
         },false) 
      
      },err=>{
        Notiflix.Notify.Failure("C'è stato un problema durante il salvataggio");
        console.log(err)
      })
    }
  }, 100);
  
  
}
}