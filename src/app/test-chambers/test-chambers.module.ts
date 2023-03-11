import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { TestChambersRoutingModule } from './test-chambers-routing.module';
import { TestChambersComponent } from '../components/body/devices/test-chambers/test-chambers.component';
import { AddTestChamberComponent } from '../components/body/devices/test-chambers/add-test-chamber/add-test-chamber.component';
import { ViewTestChambersComponent } from '../components/body/devices/test-chambers/view-test-chambers/view-test-chambers.component';
import { EditTestChamberComponent } from '../components/body/devices/test-chambers/edit-test-chamber/edit-test-chamber.component';


@NgModule({
  declarations: [
    TestChambersComponent,
    AddTestChamberComponent,
    ViewTestChambersComponent,
    EditTestChamberComponent
  ],
  imports: [
    TestChambersRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class TestChambersModule { }
