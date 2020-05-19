export class Appointment {
 constructor(
     public id: number,
    public start: number,
    public end: number,
    public day: number,
    public week:number,
    public month:number,
    public year:number,
    public client_name: string,
    public details: string,
    public employee: string,){}
  }

  export class NewCatalogService {
    constructor(
       public name: string,
       public duration: number,
       public sex: number,
       public price:number,
       ){}
     }