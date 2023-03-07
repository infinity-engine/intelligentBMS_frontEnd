import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryPacksRoutingModule } from './battery-packs-routing.module';
import { BatteryPacksComponent } from '../components/body/devices/battery-packs/battery-packs.component';
import { ViewBatteryPacksComponent } from '../components/body/devices/battery-packs/view-battery-packs/view-battery-packs.component';
import { EditBatteryPackComponent } from '../components/body/devices/battery-packs/edit-battery-pack/edit-battery-pack.component';
import { AddBatteryPackComponent } from '../components/body/devices/battery-packs/add-battery-pack/add-battery-pack.component';


@NgModule({
  declarations: [
    BatteryPacksComponent,
    ViewBatteryPacksComponent,
    EditBatteryPackComponent,
    AddBatteryPackComponent
  ],
  imports: [
    CommonModule,
    BatteryPacksRoutingModule
  ]
})
export class BatteryPacksModule { }
