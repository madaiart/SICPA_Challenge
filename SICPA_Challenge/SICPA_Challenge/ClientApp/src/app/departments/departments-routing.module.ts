import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { DepartmentsModule } from './departments.module';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/departments', pathMatch: 'full' },
    {
      path: 'departments',
      component: DepartmentsModule,
      data: { title: marker('Departments') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DepartmentRoutingModule {}
