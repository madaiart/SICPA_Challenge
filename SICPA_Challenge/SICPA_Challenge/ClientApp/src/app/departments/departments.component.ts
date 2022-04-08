import { Component, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "departments",
  templateUrl: "./departments.component.html",
})
export class DepartmentComponent {
  public departments: Departments[];

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Auth-Key":
        "VnpCV2VXTnRPWGxKUXpCblQwUnZNRTFFYnpGT2VVSkNWRll3WjFWdFZuaGtWMVo2WkVOQ01GcFlhREJTUnpscVpGY3hiR0p1VVhaWk1qbH",
    }),
  };

  constructor(private http: HttpClient) {}
  getDepartments() {
    return this.http
      .get<Departments[]>(
        "https://localhost:44347/api/SICPA/departments",
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.departments = result;
        },
        (error) => console.error(error)
      );
  }

  createDepartments(department: Departments) {
    return this.http
      .post<Departments[]>(
        "https://localhost:44347/api/SICPA/department",
        department,
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.departments = result;
        },
        (error) => console.error(error)
      );
  }

  UpdateDepartments(department: Departments) {
    return this.http
      .patch<Departments[]>(
        "https://localhost:44347/api/SICPA/department",
        department,
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.departments = result;
        },
        (error) => console.error(error)
      );
  }
}
