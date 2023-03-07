import { AddBatteryPackComponent } from './../components/body/devices/battery-packs/add-battery-pack/add-battery-pack.component';
import { EditBatteryPackComponent } from './../components/body/devices/battery-packs/edit-battery-pack/edit-battery-pack.component';
import { ViewBatteryPacksComponent } from './../components/body/devices/battery-packs/view-battery-packs/view-battery-packs.component';
import { BatteryPacksComponent } from './../components/body/devices/battery-packs/battery-packs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'view', component: ViewBatteryPacksComponent },
  { path: 'edit', component: EditBatteryPackComponent },
  { path: 'add', component: AddBatteryPackComponent },
  { path: '', component: BatteryPacksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatteryPacksRoutingModule {}
