import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees.component';
import { ModalFormComponentEnterprises } from '@app/enterprises/modal-form/modal-form.component';
import { EmployeeRoutingModule } from './employees-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    EmployeeRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EmployeesComponent, ModalFormComponentEnterprises],
})
export class EmployeesModule {}
