import { CellsComponent } from './../components/body/devices/cells/cells.component';
import { ViewCellsComponent } from './../components/body/devices/cells/view-cells/view-cells.component';
import { EditCellsComponent } from './../components/body/devices/cells/edit-cells/edit-cells.component';
import { AddCellsComponent } from './../components/body/devices/cells/add-cells/add-cells.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    component: AddCellsComponent,
  },
  {
    path: 'edit/:cellId',
    component: EditCellsComponent,
  },
  {
    path: 'view',
    component: ViewCellsComponent,
  },
  {
    path: '',
    component: CellsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CellsRoutingModule {}
