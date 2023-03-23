import { AddTestChamberComponent } from './../components/body/devices/test-chambers/add-test-chamber/add-test-chamber.component';
import { EditTestChamberComponent } from './../components/body/devices/test-chambers/edit-test-chamber/edit-test-chamber.component';
import { ViewTestChambersComponent } from './../components/body/devices/test-chambers/view-test-chambers/view-test-chambers.component';
import { TestChambersComponent } from './../components/body/devices/test-chambers/test-chambers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'view', component: ViewTestChambersComponent },
  { path: 'edit/:chamberId', component: EditTestChamberComponent },
  { path: 'add', component: AddTestChamberComponent },
  { path: '', component: TestChambersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestChambersRoutingModule {}
