import { Injectable } from '@angular/core';
import { Appointment, NewCatalogService } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  nextId
  constructor() { }
  
  setbusinneType(store){
    localStorage.setItem('store',store)
  }
  getbusinneType(){
    var business = localStorage.getItem('store');
    return business == null ? 0 : business;

  }
  setServiceAdons(adons){
    localStorage.setItem('serviceadons',JSON.stringify({ 'adons': adons}))
  }
  setAdons(adons){
    localStorage.setItem('storeadons',JSON.stringify({ 'adons': adons}))
  }
  getAdons(){
    var adons = JSON.parse(localStorage.getItem('storeadons'));
    return adons == null ? 0 : adons.adons;
  }
  getServiceAdons(){
    var adons = JSON.parse(localStorage.getItem('serviceadons'));
    return adons == null ? 0 : adons.adons;
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
  deleteEmployeehours(id){
    var timetable = this.getEmployeehours()
    var timetable_new = timetable.filter((employee)=> {if(employee.id != id){ return employee}})
    localStorage.setItem('employeehours',JSON.stringify(timetable_new))
    
  }
  setCatalog(id, name, duration, duration_book, price, max, color){
    // if(services.length==0){
    //   this.nextId =0
    // }else {
    //   let maxId = services[services.length-1].id
    //   this.nextId = maxId + 1
    // }

    var newservice= new NewCatalogService(id, name, duration, duration_book, price, max, color)

    
    let catalog = this.getCatalog()
    catalog.push(newservice)
    localStorage.setItem('catalog',JSON.stringify({ 'services': catalog}))
  }
  getCatalog(){
    var catalog = JSON.parse(localStorage.getItem('catalog'));
    return catalog == null ? [] : catalog.services;
  }
  deleteservice(id){
    var catalog = this.getCatalog()
    for(let service of catalog){
      if (service.id == id){
        var catalog_new = catalog.filter((service_)=> {if(service_.id != id){ return service}})
        localStorage.setItem('catalog',JSON.stringify({ 'services': catalog_new}))
      }
    }
  }
  getemployCatalog(){
    var catalog = JSON.parse(localStorage.getItem('employeecatalog'));
    return catalog == null ? [] : catalog.services;
  }
  setemployCatalog(employee, service){
    // let services = this.getCatalog()
    var data = {'employee': employee, 'service': service}
    let catalog = this.getemployCatalog()
    catalog.push(data)
    localStorage.setItem('employeecatalog',JSON.stringify({ 'services': catalog}))
  }
  deleteemployCatalog(employee, service){
    let catalog = this.getemployCatalog()
    var catalog_new = catalog.filter((service_)=> {if(service_.employee != employee || service_.service != service){ return service}})
    localStorage.setItem('employeecatalog',JSON.stringify({ 'services': catalog_new}))
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
  getAppointmet(id){
    var appointments = this.getAllAppointmets()
    for(let appo of appointments ){
      if(appo.id == id){
        return appo
      }
    }
  }
  getAllAppointmets(){
    var appointments =  this.getAppointmets(true)
    var unstoredAppointments =  this.getAppointmets(false)
    var AllAppointmets = appointments.concat(unstoredAppointments)
    return AllAppointmets == null ? [] : AllAppointmets;
  }
  addAppointmet(id, start, end, start_t, end_t, day, month, year, name, phone, details, employee, service, bool, note, payed){
    var week = this.getWeekNumber(new Date(year, month, day))
    if(note=='' || note == null ){
      note= " "
    }
    var appointment = new Appointment(id ,start, end, start_t, end_t, day, week, month, year, name, phone,  details, employee, service, note, payed)
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
  this.setAppointmentsStorage(unstored,false)
  var stored = this.getAppointmets(true)
  stored = stored.filter(employee => employee.id != id)
  this.setAppointmentsStorage(stored,true)
}

updateAppointment(id, start, end, start_t, end_t, day, month, year, name,phone, details,employee, service, bool, note, payed){
  var update =false
  var stored = this.getAppointmets(bool)
  for (let appointment of stored){
    if (appointment.id== id){
      var week = this.getWeekNumber(new Date(year, month, day))
      appointment = new Appointment(id ,start, end, start_t, end_t, day, week,month, year, name, phone, details, employee, service, note, payed)
      update = true
    }
  }
  if (update){
    return
  }
  else{
    this.addAppointmet(id, start, end,  start_t, end_t,day, month, year, name,phone, details,employee, service, bool, note, payed)
  }
}

dragUpdateAppointment(id, start, end, start_t, end_t, day, month, year, name, phone, details, employee, service, note, payed){
  // console.log(id, start, end,  day, month, year, name, phone, details, employee, service, note)
      this.deleteAppointmet(id)
      id =+id
      setTimeout(() => {
        this.addAppointmet(id, start, end, start_t, end_t, day, month, year, name, phone, details, employee, service, true, note, payed)
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

setStats(array){
  localStorage.setItem('stats',JSON.stringify({ 'data': array}))
}
getStats(){
  var stats = JSON.parse(localStorage.getItem('stats'));
  return stats == null ? [] : stats.data;
}
getStoredata(){
  var stats = JSON.parse(localStorage.getItem('shop_data'));
  return stats 
}
async updateClient(client_upd){
  var clients = JSON.parse(await localStorage.getItem('client_list'));
  clients.list = await clients.list.filter((val)=>{return val.id != client_upd.id})
  clients.list.unshift(client_upd)
  await localStorage.setItem('client_list', JSON.stringify({'list':  clients.list}))
}
async deleteClient(client_upd){
  var clients = JSON.parse(await localStorage.getItem('client_list'));
  clients.list = await clients.list.filter((val)=>{return val.id != client_upd.id})
  await localStorage.setItem('client_list', JSON.stringify({'list':  clients.list}))
}
async addClient(new_client){
  var clients = JSON.parse(await localStorage.getItem('client_list'));
  clients.list.unshift(new_client)
  await localStorage.setItem('client_list', JSON.stringify({'list':  clients.list}))
}
}
