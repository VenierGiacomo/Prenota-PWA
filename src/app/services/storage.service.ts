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
  setEmployeehours(id, name, timetable){
    var empl = { 'id': id, 'name':name,'timetable': timetable}
    var new_timetable:any
    var old_timetable =  this.getEmployeehours()
    console.log( empl)
    if (old_timetable.length > 0){
      for (let employee of old_timetable){
        if(employee.id == empl.id){
            employee.timetable = empl.timetable
            new_timetable = old_timetable
            localStorage.setItem('employeehours',JSON.stringify(new_timetable))
            return
        }
        else{
            new_timetable = old_timetable.concat(empl)
        }
      }
    }else{
      new_timetable = [empl]
    }

    localStorage.setItem('employeehours',JSON.stringify(new_timetable))
  }
  getEmployeehours(){
    var timetable = JSON.parse(localStorage.getItem('employeehours'));
    return timetable == null ? [] : timetable;
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
    var AllAppointmets = appointments.concat(unstoredAppointments)
    return AllAppointmets == null ? [] : AllAppointmets;
  }
  addAppointmet(id, start, end,  day, month, year, name, details, employee, bool){
    var week = this.getWeekNumber(new Date(year, month, day))
    var appointment = new Appointment(id ,start, end,  day, week, month, year, name, details, employee)
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
  var unstored= unstored.filter(employee => employee.id != id)
  console.log(unstored)
  this.setAppointmentsStorage(unstored,false)
  var stored = this.getAppointmets(true)
  stored = stored.filter(employee => employee.id != id)
  console.log(stored)
  this.setAppointmentsStorage(stored,true)
}
updateAppointment(id, start, end,  day, month, year, name, details,employee, bool){
  var update =false
  var stored = this.getAppointmets(bool)
  for (let appointment of stored){
    if (appointment.id== id){
      var week = this.getWeekNumber(new Date(year, month, day))
      appointment = new Appointment(id ,start, end,  day, week,month, year, name, details, employee)
      update = true
    }
  }
  if (update){
    return
  }
  else{
    this.addAppointmet(id, start, end,  day, month, year, name, details, employee,bool)
  }
}
dragUpdateAppointment(id, start, end,  day, month, year, name, details, employee){
      this.deleteAppointmet(id)
      id =+id
      setTimeout(() => {
        this.addAppointmet(id, start, end,  day, month, year, name, details, employee,true)
      }, 500);
     
 
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
}
