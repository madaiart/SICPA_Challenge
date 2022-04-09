import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { EmployeesModule } from './employees.module';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    {
      path: 'employees',
      component: EmployeesModule,
      data: { title: marker('Employee') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EmployeeRoutingModule {}
