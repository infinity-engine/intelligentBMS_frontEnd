import { ShowTestResultComponent } from './../components/body/battery-test/show-test-result/show-test-result.component';
import { CreateNewTestComponent } from './../components/body/battery-test/create-new-test/create-new-test.component';
import { BatteryTestComponent } from './../components/body/battery-test/battery-test.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowAllTestsResultComponent } from '../components/body/battery-test/show-all-tests-result/show-all-tests-result.component';

const routes: Routes = [
  { path: 'add', component: CreateNewTestComponent },
  { path: 'view/:testId', component: ShowTestResultComponent },
  { path: 'view-all', component: ShowAllTestsResultComponent },
  { path: '', component: BatteryTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatteryTestRoutingModule {}
