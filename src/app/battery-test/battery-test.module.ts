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

@NgModule({
  declarations: [
    BatteryTestComponent,
    CreateNewTestComponent,
    NoResultComponent,
    ShowTestResultComponent,
  ],
  imports: [
    CommonModule,
    BatteryTestRoutingModule,
    NgSelectModule,
    SharedModule,
    NgChartsModule
  ],
})
export class BatteryTestModule {}
