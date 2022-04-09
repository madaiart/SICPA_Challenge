import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalFormComponentEnterprises } from './modal-form/modal-form.component';
import { EnterprisesComponent } from './enterprises.component';
import { EnterprisesRoutingModule } from './enterprise-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    EnterprisesRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EnterprisesComponent, ModalFormComponentEnterprises],
})
export class EnterprisesModule {}
