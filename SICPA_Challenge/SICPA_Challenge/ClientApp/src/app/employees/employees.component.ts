import { Component, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "employees",
  templateUrl: "./employees.component.html",
})
export class EmployeesComponent {
  public employees: Employees[];

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Auth-Key":
        "VnpCV2VXTnRPWGxKUXpCblQwUnZNRTFFYnpGT2VVSkNWRll3WjFWdFZuaGtWMVo2WkVOQ01GcFlhREJTUnpscVpGY3hiR0p1VVhaWk1qbH",
    }),
  };

  constructor(private http: HttpClient) {}

  getEmployee() {
    return this.http
      .get<Employees[]>("https://localhost:44347/api/SICPA/employees")
      .subscribe(
        (result) => {
          this.employees = result;
          console.log(result);
        },
        (error) => console.error(error)
      );
  }

  createEmployee(employee: Employees) {
    return this.http
      .post<Employees[]>(
        "https://localhost:44347/api/SICPA/employee",
        employee,
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.employees = result;
        },
        (error) => console.error(error)
      );
  }

  UpdateEmployee(employee: Employees) {
    return this.http
      .patch<Employees[]>(
        "https://localhost:44347/api/SICPA/employees",
        employee,
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.employees = result;
        },
        (error) => console.error(error)
      );
  }
}
