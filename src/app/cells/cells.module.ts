import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './../shared/shared.module';
import { ViewCellsComponent } from './../components/body/devices/cells/view-cells/view-cells.component';
import { EditCellsComponent } from './../components/body/devices/cells/edit-cells/edit-cells.component';
import { AddCellsComponent } from './../components/body/devices/cells/add-cells/add-cells.component';
import { CellsComponent } from './../components/body/devices/cells/cells.component';
import { NgModule } from '@angular/core';

import { CellsRoutingModule } from './cells-routing.module';

@NgModule({
  declarations: [
    CellsComponent,
    AddCellsComponent,
    EditCellsComponent,
    ViewCellsComponent,
  ],
  imports: [CellsRoutingModule, SharedModule, NgSelectModule, NgbPagination],
})
export class CellsModule {}
