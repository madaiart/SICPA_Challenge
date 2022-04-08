import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { DepartmentComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { CreateEnterpriseModalComponent } from './enterprises/modal/create-enterprise-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EmployeesComponent,
    EnterprisesComponent,
    DepartmentComponent,
    CreateEnterpriseModalComponent 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },        
        {path: 'enterprises', component: EnterprisesComponent},
        {path: 'departments', component: DepartmentComponent},
        {path: 'employees', component: EmployeesComponent},
      //{ path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
