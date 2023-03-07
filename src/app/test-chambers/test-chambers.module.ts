import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    TestChambersRoutingModule
  ]
})
export class TestChambersModule { }
