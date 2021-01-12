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
setStoreservice( name, duration, sex, max_n, color){
var data = { 'name':name, 'duration':duration, 'sex':sex, 'max_n':max_n, 'color':color, 'price': 2000}
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

bookAppointment(start, end, day, month, year,name, phone, details, employee, service):Observable<any>{
  
  var week = this.getWeekNumber(new Date(year, month, day))
  if(year==2021 && week==0 && day<4){
    week=53
  }
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone':phone, 'details': details, 'service_n': service, 'note': ''}
    return this.http.post(BASE_URL+'bookings/', data,{headers: this.newheader()})
}

addClientStore(client_name, hair_color, hair_lenght, phone, avarage_expense, last_service):Observable<any>{
  var data = {'client_name': client_name , 'hair_color': hair_color, 'hair_lenght': hair_lenght, 'phone':phone, 'avarage_expense':avarage_expense, 'last_service' : last_service}
    return this.http.post(BASE_URL+'store/clients/', data,{headers: this.newheader()})
}
updateClientStore(id, client_name, hair_color, hair_lenght, phone, avarage_expense, last_service):Observable<any>{
  var data = {'client_name': client_name , 'hair_color': hair_color, 'hair_lenght': hair_lenght, 'phone':phone, 'avarage_expense':avarage_expense, 'last_service' : last_service}
    return this.http.put(BASE_URL+'store/clients/'+id+'/', data,{headers: this.newheader()})
}
getStoreClients():Observable<any>{
    return this.http.get(BASE_URL+'store/clients/',{headers: this.newheader()})
}
bookAppointmentNoOwner(start, end, day, month, year,name, phone, details, employee, service, shop):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'phone': phone, 'details': details, 'service_n': service, 'shop':shop}
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

updateAppointment(id, start, end, day, month, year,name, phone, details, employee, service, note):Observable<any>{
  var week = this.getWeekNumber(new Date(year, month, day))
  var data = {'start': start , 'end': end, 'day': day, 'week':week, 'month':month, 'year' : year, 'employee': employee,  'client_name' :name, 'details': details, 'service_n': service,'phone':phone, 'note':note}
  return this.http.put(BASE_URL+'bookings/'+id+'/', data, {headers: this.newheader()})
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
getStoresCategory(id){
  return this.http.get(BASE_URL+'store/list/category/'+id+'/',{headers: this.httpheader})
}

parseJwt = (token) => {
try {
return JSON.parse(atob(token.split('.')[1]));
} catch (e) {
return null;
}
};
}

// {"version":"EC_v1",
// "data":
// "/GUQLQWPAZzV1Z5bi6K1Vcs5L/CejVl0YYsccCJ2k03dX6vdYsSXcnJ5Jb+8IgQfAaR8MQ4aA7i4BiDYI89GnG8fs3z/Y3Raf/xO3Hp9aQNK5WuC1XVjoUPKPW+DJ6ABYCtmCjt4eyDB6pIUgxsJGIsenJrCqlTClAw+AWXbtX+utMuv9+bSUjeFehlnCq3svdvnRh/UyAU+NrNWFehaikZfV0v4rX++Pp5Hkmz8MaqHGRuYcxaejylumIXAXTlwCtM8J72PTVE+9RDFEVJBCoFQvMKAI2xC3jt7AJiOOVcvTBdaMa9wnt/LqQGtYYlHqJHuhUgCvmx9q6FpZMh6BectzjCeXCUhmDV2UItAKhtw5woyKnsUY1DGRYSHCq7BhU5Mrl+lgcMBUMWPbcTa2zeTvCVU9ru3A+WE5Rk/f7dp51BZo5KjzQSgwBNd6+FCFSCLSEiLVRSjEbe4+1IJ0U/qxPrxFytrUyESshxykgcBRT4vjfkqy8VZyhmm0ndQSsow8H1swbCTlyZU7Tn9aFvAskKF1aZafzv3WZClr4GeJ1EG2HFJoq0vzg==",
// "signature":"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",
// "header":{
//   "ephemeralPublicKey":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAENxWbPerxKpcmXYI6Ted3q57H/EjcZXT3t4pX+weJ1+aiCaZiprkWTt3ZO7fJNICD1da+80gC5QFep49vB0M6Iw==",
//   "publicKeyHash":"RZyadkrVEqVUN8h1cYjHzSldpJUF8pyFG1d/p/HgwhE=",
//   "transactionId":"df63bb8893feb22ec1b9c221bf8a8d747e3d3d9b495e6be323dd269f1557836d"}
// }