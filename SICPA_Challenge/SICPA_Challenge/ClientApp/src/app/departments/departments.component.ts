import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
 selector: 'departments',
    templateUrl: './departments.component.html'
})
export class DepartmentComponent {
 public departments: Departments[];

 constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
   http.get<Departments[]>("https://localhost:44347/api/SICPA/departments").subscribe(result => {
       this.departments = result;       
   }, error => console.error(error));
 }
}