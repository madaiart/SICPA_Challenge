import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { EnterprisesComponent } from './enterprises.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/enterprises', pathMatch: 'full' },
    {
      path: 'enterprises',
      component: EnterprisesComponent,
      data: { title: marker('Enterprises') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EnterprisesRoutingModule {}
