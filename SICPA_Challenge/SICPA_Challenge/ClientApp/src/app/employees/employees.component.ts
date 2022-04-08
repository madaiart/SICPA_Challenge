import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
 selector: 'employees',
 templateUrl: './employees.component.html'
})
export class EmployeesComponent {
 public employees: Employees[];

 constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
   http.get<Employees[]>("https://localhost:44347/api/SICPA/employees").subscribe(result => {
       this.employees = result;
       console.log(result);
   }, error => console.error(error));
 }
}