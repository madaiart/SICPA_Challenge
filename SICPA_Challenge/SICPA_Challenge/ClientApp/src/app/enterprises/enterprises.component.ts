import { Component, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "enterprises",
  templateUrl: "./enterprises.component.html",
})
export class EnterprisesComponent {
  public enterprises: Enterprises[];
  public validatingForm: FormGroup;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Auth-Key":
        "VnpCV2VXTnRPWGxKUXpCblQwUnZNRTFFYnpGT2VVSkNWRll3WjFWdFZuaGtWMVo2WkVOQ01GcFlhREJTUnpscVpGY3hiR0p1VVhaWk1qbH",
    }),
  };

  constructor(private http: HttpClient) {
    this.validatingForm = new FormGroup({
      status: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)      
    });
  }

  get statusFormModal(){
    return this.validatingForm.get('status');
  }
  get addressFormModal(){
    return this.validatingForm.get('address');
  }
  get nameFormModal(){
    return this.validatingForm.get('name');
  }
  get phoneFormModal(){
    return this.validatingForm.get('phone');
  }

  getEnterprises() {
    return this.http
      .get<Enterprises[]>("https://localhost:44347/api/SICPA/enterprises")
      .subscribe(
        (result) => {
          this.enterprises = result;
          console.log(result);
        },
        (error) => console.error(error)
      );
  }

  createEnterprise(enterprise: Enterprises) {
    return this.http
      .post<Enterprises[]>(
        "https://localhost:44347/api/SICPA/enterprise",
        enterprise,
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.enterprises = result;
        },
        (error) => console.error(error)
      );
  }

  UpdateEnterprise(enterprise: Enterprises) {
    return this.http
      .patch<Enterprises[]>(
        "https://localhost:44347/api/SICPA/enterprise",
        enterprise,
        this.httpOptions
      )
      .subscribe(
        (result) => {
          this.enterprises = result;
        },
        (error) => console.error(error)
      );
  }
}
