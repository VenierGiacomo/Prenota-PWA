import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export class UserCache{
  constructor(
              public id: number,
              public name: string,
              public img: string,
              public wallet: number,
              ){}
  }
const BASE_URL = 'https://giacomovenier.pythonanywhere.com/api/'
// const BASE_URL = 'http://127.0.0.1:8000/api/'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

httpheader = new HttpHeaders({'Content-type':'application/json'}) //'Access-Control-Allow-Origin':'*'

mailApi = 'https://mailthis.to/franz.stupar@gmail.com'
constructor(private http: HttpClient) { }
//Should be in store but import problems

newheader(){
  var authheader = new HttpHeaders({'Content-type':'application/json','Authorization':'JWT '+ this.getToken() })
 return authheader
}
isvalidToken(){
  const token = this.getToken()
        if (token) {
            var l = this.parseJwt(token) 
            var exp = 1000*l.exp
            var now = +new Date()
            if (now < exp){ 
                return true
            }
            else{
                return false
            }
        } else {
            return false
        }
    }
storeToken(token){
  var data={
    "token": token,
    "last_resfresh":  +new Date()
  }
  localStorage.setItem('token', JSON.stringify(data))
}
getToken(){
  var storedtoken = JSON.parse(localStorage.getItem('token'));
  var now = +new Date()
  if(storedtoken != undefined  || storedtoken != null){
    if ((now - storedtoken.last_resfresh)> 7200000){  // 7.200.000 it's 2 hours
      this.refreshToken(storedtoken.token).subscribe(
        data=>{
          this.storeToken(data.token)
        },
        err => {
          console.log(err.error,'err')
        }
      )
  }
  return storedtoken.token 
  }
}
deleteAllData(){
  localStorage.clear()
}

refreshToken(token):Observable<any>{
  var data ={
    'token': token
  }
  return this.http.post(BASE_URL+'auth/refresh/', data,{headers: this.httpheader })
}

login(email, password):Observable<any>{
  var data ={
    "email": email,
    "password": password,
  }
  return this.http.post(BASE_URL+'auth/', data,{headers: this.httpheader })
}
register(first_name, last_name, email, sex,  phone, password):Observable<any>{
  var data ={
    "first_name": first_name,
    "last_name": last_name,
    "email": email,
    "sex": sex,
    "phone": phone,
    "password": password,
  }
  return this.http.post(BASE_URL+'auth/register/', data,{headers: this.httpheader })
}
registeremployee(first_name, last_name, email, sex,  phone, password):Observable<any>{
  var data ={
    "first_name": first_name,
    "last_name": last_name,
    "email": email,
    "sex": sex,
    "phone": phone,
    "password": password,
  }
  return this.http.post(BASE_URL+'auth/register/employee/', data,{headers: this.newheader() })
}
getEmployees(): Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'employees/?employee='+l.user_id,{headers: this.newheader()})
  }
  throw throwError("error");  

}
getEmployeesfromshop(shop): Observable<any>{
  return this.http.get(BASE_URL+'employees/store/?shop='+shop,{headers: this.httpheader })
}
getUser(){
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'auth/'+l.user_id,{headers: this.newheader()})
  }
  throw throwError("error");  
}
getSpecificUser(id){
  return this.http.get(BASE_URL+'auth/'+id,{headers: this.httpheader })
  
}
getopenHours(): Observable<any>{
        return this.http.get(BASE_URL+'closedhours/',{headers:  this.newheader()})
}
setopenHours(data): Observable<any>{
  return this.http.post(BASE_URL+'closedhours/', data, {headers: this.newheader()})
}
setemployeeHours(data): Observable<any>{
  return this.http.post(BASE_URL+'employeehours/', data, {headers: this.newheader()})
}
getemployeeHours(): Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'employeehours/?employee='+l.user_id,{headers: this.newheader()})
  }
  throw throwError("error");  
}
getemployeeHoursNoLogin(id): Observable<any>{
     return this.http.get(BASE_URL+'employeehours/?employee='+id,{headers: this.httpheader})
 
}
setStoreservice( name, duration, sex, max_n, color, price){
var data = { 'name':name, 'duration':duration, 'sex':sex, 'max_n':max_n, 'color':color, 'price': price}
  return this.http.post(BASE_URL+'services/', data, {headers: this.newheader()})
}
setStoreserviceDefault(){
    return this.http.get(BASE_URL+'services/setdefault', {headers: this.httpheader})
}
getStoreservice(){
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
  return this.http.get(BASE_URL+'services/',{headers: this.httpheader, params: {owner: l.user_id }})
}
  throw throwError("error");  
}
getStoreserviceNoLogin(owner){
  return this.http.get(BASE_URL+'services/?owner='+owner,{headers: this.httpheader})

}
getEmployeeservices(owner){
    return this.http.get(BASE_URL+'employee/services/?owner='+owner, {headers: this.httpheader})
}

getEmployeeservicesNoInput(){
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
  }
  return this.http.get(BASE_URL+'employee/services/?owner='+l.user_id, {headers: this.httpheader})
}
setEmployeeservice(employee, service_id){
  var data = {'employee':employee, 'service_id':service_id}
    return this.http.post(BASE_URL+'employee/services/', data, {headers: this.newheader()})
}
deleteEmployeeservice(employee, service_id){
  return this.http.delete(BASE_URL+'employee/services/'+employee+'/'+service_id+'/', {headers: this.newheader()})
}

bookAppointment(start, end, day, month, year,name, phone, details, employee, service, client_id, adons, store_client):Observable<any>{
  
  var week = this.getWeekNumber(new Date(year, month, day))
  if(year==2021 && week==0 && day<4){
    week=53
  }
 var data
  if(store_client){
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': '','client':client_id,'adons':adons,'store_client':store_client}
   }else{
      
      data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': '','client':client_id, 'adons':adons}
   }
    return this.http.post(BASE_URL+'bookings/', data,{headers: this.newheader()})
}

addClientStore(client_name, hair_color, hair_lenght, phone, avarage_expense, last_service):Observable<any>{
  var data = {'client_name': client_name , 'hair_color': hair_color, 'hair_lenght': hair_lenght, 'phone':phone, 'avarage_expense':avarage_expense, 'last_service' : last_service}
    return this.http.post(BASE_URL+'store/clients/', data,{headers: this.newheader()})
}
updateClientStore(id, client_name,  phone,  credit, note, isMember):Observable<any>{
  if(note==''){
    note =' '
  }
  var data = {'client_name': client_name , 'phone':phone, 'credit' : credit, 'note': note, 'isMember':isMember}
  
    return this.http.put(BASE_URL+'store/clients/'+id+'/', data,{headers: this.newheader()})
}
deleteClientStore(id){
  return this.http.delete(BASE_URL+'store/clients/'+id+'/',  {headers: this.newheader()})
}
setClientStore( client_name,  phone,  credit, note):Observable<any>{
  var data = {'client_name': client_name , 'phone':phone, 'credit' : credit, 'note': note}
    return this.http.post(BASE_URL+'store/clients/', data,{headers: this.newheader()})
}
setClientStorebyId( client_id):Observable<any>{
  var data = {'client_name':'temporary_name','client_id': client_id }
    return this.http.post(BASE_URL+'store/clients/', data,{headers: this.newheader()})
}
isStoreClient(shop):Observable<any>{
  return this.http.get(BASE_URL+'store/clients/is/?shop='+shop,{headers: this.newheader()})
}

 async getStoreClients(force?){
    var last_download 
    if(JSON.parse(await localStorage.getItem('last_clients_update'))!= null && JSON.parse(localStorage.getItem('last_clients_update'))!= undefined){
      last_download = await Number(JSON.parse(localStorage.getItem('last_clients_update')).time)  
    }else{
      last_download=0
    }
    if(force){
      var x = await this.http.get(BASE_URL+'store/clients/',{headers: this.newheader()}).pipe().toPromise()
      await localStorage.setItem('last_clients_update', JSON.stringify({ 'time': Number(new Date())}))
      await localStorage.setItem('client_list', JSON.stringify({'list':  x}))
      return  x
    }
    if(Number(new Date())-last_download>1200000 ||  JSON.parse(localStorage.getItem('client_list'))==null ||  JSON.parse(localStorage.getItem('client_list'))==undefined){
      var x = await this.http.get(BASE_URL+'store/clients/',{headers: this.newheader()}).pipe().toPromise()
      await localStorage.setItem('last_clients_update', JSON.stringify({ 'time': Number(new Date())}))
      await localStorage.setItem('client_list', JSON.stringify({'list':  x}))
      return  x
    }else{
      var stored = await JSON.parse(await localStorage.getItem('client_list'))
      return stored.list
    }
    
    
    
}
bookAppointmentNoOwner(start, end, day, month, year,name, phone, details, employee, service, shop):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone': phone, 'details': details, 'service_n': service, 'shop':shop}
    return this.http.post(BASE_URL+'bookings/', data,{headers: this.newheader()})
}
getAppointments(week):Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'bookings/week/'+week+'/?owner='+l.user_id, {headers: this.httpheader})
  }
  throw throwError("error");  
  
}
getAppointmentsExternal(week):Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'bookings/week/'+week+'/external/?owner='+l.user_id, {headers: this.httpheader})
  }
  throw throwError("error");  
  
}
getClientAppointments():Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
     return this.http.get(BASE_URL+'bookings/user/?user='+l.user_id,{headers: this.newheader()})
  }
  throw throwError("error"); 
}
getStoreAppointments(week,store):Observable<any>{ 
     return this.http.get(BASE_URL+'bookings/week/'+week+'/?owner='+store, {headers: this.httpheader})   
}
getMonthAppointments(month):Observable<any>{
  return this.http.get(BASE_URL+'bookings/month/'+month,{headers: this.newheader()})
}

updateAppointment(id, start, end, day, month, year,name, phone, details, employee, service, note, payed?):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data
  if(payed){
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note, 'payed':payed}
  }else{
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note}
  }
  
  return this.http.put(BASE_URL+'bookings/'+id+'/', data, {headers: this.newheader()})
}
updateAppointmentClient(id, start, end, day, month, year,name, phone, details, employee, service, note,  client_id,payed?,):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data
  if(payed){
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note, 'client_id':client_id, 'payed':payed,}
  }else{
    data = {'new':true,'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note, 'client_id':client_id,}
  }
  
  return this.http.put(BASE_URL+'bookings/'+id+'/', data, {headers: this.newheader()})
}
payBookingFromShop(id){
  return this.http.get(BASE_URL+'bookings/pay/shop/?id='+id, {headers: this.newheader()})   
}

deleteAppointment(id):Observable<any>{
  return this.http.delete(BASE_URL+'bookings/'+id+'/',  {headers: this.newheader()})
}

createStore(store_name, address, city, zip_code):Observable<any>{
  var new_store ={
    'store_name': store_name,
    'address': address,
    'city': city,
    'zip_code': zip_code,
  }
  var header = new HttpHeaders({'Content-type':'application/json','Authorization':'JWT '+ this.getToken() })
  return this.http.post(BASE_URL+'store/', new_store,{headers: this.newheader()})
}
updateStore(type):Observable<any>{
  const token = this.getToken()
  var l 
  if (token) {
     l = this.parseJwt(token) 
  }
  var data ={
    'business_type': type
  }
  return this.http.put(BASE_URL+'store/'+l.user_id+'/', data,{headers: this.newheader()})
}

sendEmail(input: any) {
  return this.http.post(this.mailApi, input, { responseType: 'text' })
}
emailConfirmBooking(email,name,surname,day,month,year,time,service,shop){
  var data ={
    "email":email,
    "name":name,
    "surname":surname,
    "day":day,
    "month": month,
    "year":year,
    "time":time,
    "service":service,
    "shop":shop
  }
  return this.http.post(BASE_URL+'email/bookingconfirm', data,{headers: this.newheader()})
}

registrationConfirmation(name,surname,email,phone){
  var data ={
    "name":name,
    "surname":surname,
    "email":email,
    "phone":phone,
  }
  return this.http.post(BASE_URL+'email/registrationconfirm', data,{headers: this.httpheader})
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
deleteEmployee(id){
  return this.http.delete(BASE_URL+'employees/delete/'+id+'/',  {headers: this.newheader()})
}
deleteService(id):Observable<any>{
  return this.http.delete(BASE_URL+'services/'+id+'/',  {headers: this.newheader()})
}

stripePaymentIntet(service){
  return this.http.post(BASE_URL+'webhooks/payment_intent', {services:service},{headers: this.newheader()})
}
stripeSubscriptionSession(){
  return this.http.post(BASE_URL+'webhooks/session/stripe', {},{headers: this.newheader()})
}
stripePortalSession(){
  return this.http.post(BASE_URL+'webhooks/portal/stripe', {},{headers: this.newheader()})
}
hasStore(){
  return this.http.get(BASE_URL+'store/owner/',  {headers: this.newheader()})
}
getAppointmentsByshop2(week,id):Observable<any>{
  return this.http.get(BASE_URL+'bookings/week/'+week+'/2shop/?shop='+id, {headers: this.httpheader})
}
getAppointmentsByshop5(week,id):Observable<any>{
  return this.http.get(BASE_URL+'bookings/week/'+week+'/5shop/?shop='+id, {headers: this.httpheader})
}
getEmploservicebyStore(id){
  return this.http.get(BASE_URL+'employee/services/store/?store='+id,{headers: this.httpheader, params: {shop: id }})
}
getemployeeHoursByShop(id): Observable<any>{
  return this.http.get(BASE_URL+'employeehours/shop/?shop='+id,{headers: this.httpheader})
}
getAppointmentsByshop(week,id):Observable<any>{
  return this.http.get(BASE_URL+'bookings/week/'+week+'/shop/?shop='+id, {headers: this.httpheader})
}
getStoreservicebyStore(id){
  return this.http.get(BASE_URL+'services/byshop/',{headers: this.httpheader, params: {shop: id }})
}
getStores(){
  return this.http.get(BASE_URL+'store/list',{headers: this.httpheader})
}
getStore(id){
  return this.http.get(BASE_URL+'store/id/'+id+'/',{headers: this.httpheader})
}
getStoresCategory(id){
  return this.http.get(BASE_URL+'store/list/category/'+id+'/',{headers: this.httpheader})
}
activatePayments(business_type){
  var data = {
    "business_type": business_type
  }
  return this.http.post(BASE_URL+'webhooks/activate_account/',data,{headers: this.newheader()})
}
listBusinessTransactions(){
  return this.http.get(BASE_URL+'webhooks/list/transactions',{headers: this.newheader()})
}

 getCharthsData(month,year){
  return this.http.get(BASE_URL+'bookings/charts_data/?month='+month+'&year='+year,{headers: this.newheader()})

  // var last_download 
  // if(JSON.parse(await localStorage.getItem('last_stat_update'))!= null && JSON.parse(localStorage.getItem('last_stat_update'))!= undefined){
  //   last_download = await Number(JSON.parse(localStorage.getItem('last_stat_update')).time)  
  // }else{
  //   last_download=0
  // }
  // if(Number(new Date())-last_download>300000 ||  JSON.parse(localStorage.getItem('stat_list'))==null ||  JSON.parse(localStorage.getItem('stat_list'))==undefined){
  //   var x = await this.http.get(BASE_URL+'bookings/charts_data/?month='+month+'&year='+year,{headers: this.newheader()}).pipe().toPromise()
  //   await localStorage.setItem('last_stat_update', JSON.stringify({ 'time': Number(new Date())}))
  //   await localStorage.setItem('stat_list', JSON.stringify({'list':  x}))
  //   return  x
  // }else{ 
  //   var stored = await JSON.parse(await localStorage.getItem('stat_list'))
  //   return stored.list
  // } 
  
}
setRecuringBooking(id, weeks,payed){
  var data
  if(weeks){
    data={id:id,client_name:'~',start:1,end:2,day:1,week:0,month:0,year:2021, weeks:weeks,payed:payed}
  }else{
  data={id:id,client_name:'~',start:1,end:2,day:1,week:0,month:0,year:2021,payed:payed}
  }
  return this.http.post(BASE_URL+'bookings/recurring/',data,{headers: this.newheader()})
}
deleteRecuringBooking(id){
  return this.http.delete(BASE_URL+'bookings/recurring/delete/'+id,{headers: this.newheader()})
}
registerClientWithEmail(first_name, last_name, phone ,email?  ):Observable<any>{
  var data 
  if(email){
    data={
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "phone": phone,
      'client_name': first_name+' '+last_name
    }
  }else{
    data={
      "first_name": first_name,
      "last_name": last_name,
      "phone": phone,
      'client_name': first_name+' '+last_name,
    }
  }
 
  return this.http.post(BASE_URL+'store/clients/new/', data,{headers: this.newheader() })
}
getAllServicesAdons():Observable<any>{
  return this.http.get(BASE_URL+'serviceaddons/store/all',{headers: this.newheader()})
}

getServiceAdons(service_id):Observable<any>{
  return this.http.get(BASE_URL+'serviceaddons/'+service_id,{headers: this.httpheader})
}
getCustomServices(client_id):Observable<any>{
  return this.http.get(BASE_URL+'customservices/?client_id='+client_id,{headers: this.newheader()})
}
addCustomService(service,store_client,duration,price):Observable<any>{
  var data={
    "service": service,
    "store_client": store_client,
    "duration": duration,
    'price': price
  }
  return this.http.post(BASE_URL+'customservices/', data,{headers: this.newheader() })
}
deleteCustomService(id):Observable<any>{
  return this.http.delete(BASE_URL+'customservices/'+id+'/', {headers: this.newheader()})
}
updateCustomService(id,price,duration){
  var data={
    "duration": duration,
    'price': price
  }
  return this.http.put(BASE_URL+'customservices/'+id+'/', data,{headers: this.newheader()})
}
getAdons():Observable<any>{
  return this.http.get(BASE_URL+'addons',{headers: this.httpheader})
}
inviteCLient(client):Observable<any>{
  var data={
    'id': client.id,
    "client_name": client.client_name,

  }
  return this.http.post(BASE_URL+'store/clients/invite/email/', data,{headers: this.newheader() })
}
paymentMethods(){
  return this.http.post(BASE_URL+'webhooks/payment_methods/', {},{headers: this.newheader()})
}
getStoresDetails(id){
  return this.http.get(BASE_URL+'store/id/'+id,{headers: this.httpheader})
}

parseJwt = (token) => {
try {
return JSON.parse(atob(token.split('.')[1]));
} catch (e) {
return null;
}
};
}