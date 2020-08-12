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
    public phone: string,
    public details: string,
    public employee: string,
    public service_n: string,
    public note: string){}
  }

  export class NewCatalogService {
    constructor(
       public id: number,
       public name: string,
       public duration: number,
       public sex: number,
       public max_n:number,
       public color:number,
       ){}
     }