import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DepartmentsComponent } from './departments.component';
import { ModalFormComponentDepartments } from './modal-form/modal-form.component';
import { DepartmentRoutingModule } from './departments-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    DepartmentRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DepartmentsComponent, ModalFormComponentDepartments],
})
export class DepartmentsModule {}
