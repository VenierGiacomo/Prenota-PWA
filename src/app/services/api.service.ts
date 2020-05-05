import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class UserCache{
  constructor(
              public id: number,
              public name: string,
              public img: string,
              public wallet: number,
              ){}
  }
const BASE_URL = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

httpheader = new HttpHeaders({'Content-type':'application/json'}) //'Access-Control-Allow-Origin':'*'

constructor(private http: HttpClient) { }

login(username, password):Observable<any>{
  var data ={
    "username": username,
    "password": password,
  }
  return this.http.post(BASE_URL+'auth/', data,{headers: this.httpheader })
}

openHours(): Observable<any>{
        return this.http.get(BASE_URL+'closedhours/',{headers: this.httpheader})
}

bookApp(data):Observable<any>{
    return this.http.post(BASE_URL+'bookings/', data,{headers: this.httpheader })
}


//   users:Array<UserCache> = [];
  
//   constructor(private storage: Storage) { }

//   addUserChache(user: UserCache): Promise<any>{
//     return this.storage.get(USERS_KEY).then((users =>{
//       if (!this.users){
//         this.users.push(user)
//         return this.storage.set(USERS_KEY,[this.users]);
//       }
//       else{
//         return this.storage.set(USERS_KEY,[user]);
//       }
//     }))
//   }

// setUser(user:DataUser){
//   this.storage.set(USERS_DATA,user);
// }
// getUser(){
//   var user = this.storage.get(USERS_DATA);
//   return user
// }
// getUserChache(): Promise<UserCache> {
//   return this.storage.get(USERS_KEY);
// }
// setBonus(bonus:Bonus){
//   this.storage.set(Bonus_DATA,bonus);
// }
// getBonus(){
//   var user = this.storage.get(Bonus_DATA);
//   return user

// }
// setcorona(corona:Bonus){
//   this.storage.set('corona',corona);
// }
// corona(){
//   var user = this.storage.get('corona');
//   return user

// }
// deleteBonus(){
//   this.storage.remove(Bonus_DATA)
// }


//   updateUserChache(user: UserCache): Promise<any>{
//     return this.storage.get(USERS_KEY).then((users: UserCache[])=> {
//       if(!users || users.length === 0){
//         return null
//       }
//       let newUserChaches: UserCache[] = []
//       for (let i of users){
//         if (i.id === user.id){
//           newUserChaches.push(user)
//         } else {
//           newUserChaches.push(i)
//         }
//       }
//       return this.storage.set(USERS_KEY, newUserChaches);
//     });
//   }

//   deleteUserChache(id: number): Promise<UserCache> {
//     return this.storage.get(USERS_KEY).then((users: UserCache[])=> {
//       if(!users || users.length === 0){
//         return null
//       }
//     let toKeep: UserCache[] = []
//     for(let i of users){
//       if (i.id !== id){
//         toKeep.push(i)
//       }
//     }
//     return this.storage.set(USERS_KEY, toKeep);
// });
// }

}
