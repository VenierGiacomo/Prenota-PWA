import { Injectable } from '@angular/core';
import { Appointment, NewCatalogService } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  setbusinneType(store){
    localStorage.setItem('store',store)
  }
  getbusinneType(){
    var business = localStorage.getItem('store');
    return business == null ? 0 : business;

  }
  setOpenignhours(timetable){
    localStorage.setItem('openhours',JSON.stringify({ 'timetable': timetable}))
  }
  getOpenignhours(){
    var timetable = JSON.parse(localStorage.getItem('openhours'));
    return timetable == null ? 0 : timetable.timetable;
  }
  setCatalog(name, duration, sex, price){
    var newservice= new NewCatalogService(name, duration, sex, price)
    let catalog = this.getCatalog()
    console.log(catalog)
    catalog.push(newservice)
    localStorage.setItem('catalog',JSON.stringify({ 'services': catalog}))
  }
  getCatalog(){
    var catalog = JSON.parse(localStorage.getItem('catalog'));
    return catalog == null ? [] : catalog.services;
  }
  getAppointmets(bool){
    if (bool){
      var storedAppointments = JSON.parse(localStorage.getItem('appointments'));
      return storedAppointments == null ? [] : storedAppointments.appointments;
    }
    else{
      var unstoredAppointments = JSON.parse(localStorage.getItem('not_backup_appointments'));
      return unstoredAppointments == null ? [] : unstoredAppointments.appointments;
    }
  }
  getAllAppointmets(){
    var appointments =  this.getAppointmets(true)
    var unstoredAppointments =  this.getAppointmets(false)
    console.log(appointments,unstoredAppointments , 'appointms')
    var AllAppointmets = appointments.concat(unstoredAppointments)
    return AllAppointmets == null ? [] : AllAppointmets;
  }
  addAppointmet(start, end,  day, month, year, name, details, bool){
    var appointment = new Appointment(new Date().getTime(),start, end,  day, month, year, name, details)
    let oldAppointments = this.getAppointmets(bool)
    oldAppointments.push(appointment)
    this.setAppointmentsStorage(oldAppointments, bool)
}
  setAppointmentsStorage(appointments: Appointment[],bool){
    if (bool){
      localStorage.setItem('appointments', JSON.stringify({ 'appointments': appointments}))
    }
    else{
      localStorage.setItem('not_backup_appointments', JSON.stringify({ 'appointments': appointments}))
    }
}
deleteAppointmet(id){
  var unstored = this.getAppointmets(false)
  unstored = unstored.filter((appointment)=> {appointment.id != id})
  this.setAppointmentsStorage(unstored,false)
}
}
