import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
 selector: 'enterprises',
 templateUrl: './enterprises.component.html'
})
export class EnterprisesComponent {
 public enterprises: Enterprises[];

 constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
   http.get<Enterprises[]>("https://localhost:44347/api/SICPA/enterprises").subscribe(result => {
       this.enterprises = result;
       console.log(result);
   }, error => console.error(error));
 }
}