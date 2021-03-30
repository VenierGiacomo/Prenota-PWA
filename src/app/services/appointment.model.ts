export class Appointment {
  
 constructor(
    public id: number,
    public start: number,
    public end: number,
    public start_t: number,
    public end_t: number,
    public day: number,
    public week:number,
    public month:number,
    public year:number,
    public client_name: string,
    public phone: string,
    public details: string,
    public employee: string,
    public service_n: string,
    public note: string,
    public payed: boolean){}
  }

  export class NewCatalogService {
    constructor(
       public id: number,
       public name: string,
       public duration: number,
       public duration_book: number,
       public price: number,
       public max_n:number,
       public color:number,
       ){}
     }