import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAppointmets(){
    let storedAppointments = JSON.parse(localStorage.getItem('appointments'));
    return storedAppointments == null ? [] : storedAppointments;
  }
  addAppointmets(start, end,  day, month, year, name, details){
    let appointment = new Appointment(start, end,  day, month, year, name, details)
    let storedAppointments = this.getAppointmets()
    let updatedAppointments = storedAppointments.push(appointment)
    this.setAppointmentsStorage(updatedAppointments)
}
  setAppointmentsStorage(appointments: Appointment[]){
    localStorage.setItem('appointments', JSON.stringify({ 'appointments': appointments}))
}
}
