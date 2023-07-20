import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KonkursComponent } from './components/konkurs/konkurs.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'konkurs/:konkursId', component: KonkursComponent },
  { path: 'konkurs', component: KonkursComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
