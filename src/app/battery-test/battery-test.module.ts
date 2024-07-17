import { RouterModule } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { ShowTestResultComponent } from './../components/body/battery-test/show-test-result/show-test-result.component';
import { NoResultComponent } from './../components/body/battery-test/no-result/no-result.component';
import { CreateNewTestComponent } from './../components/body/battery-test/create-new-test/create-new-test.component';
import { BatteryTestComponent } from './../components/body/battery-test/battery-test.component';
import { SharedModule } from './../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryTestRoutingModule } from './battery-test-routing.module';
import { ShowAllTestsResultComponent } from '../components/body/battery-test/show-all-tests-result/show-all-tests-result.component';

@NgModule({
  declarations: [
    BatteryTestComponent,
    CreateNewTestComponent,
    NoResultComponent,
    ShowTestResultComponent,
    ShowAllTestsResultComponent,
  ],
  imports: [
    CommonModule,
    BatteryTestRoutingModule,
    NgSelectModule,
    SharedModule,
    NgChartsModule,
    NgbPagination,
    RouterModule,
  ],
})
export class BatteryTestModule {}
