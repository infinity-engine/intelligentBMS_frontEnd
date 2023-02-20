import { BatteryTestComponent } from './components/body/battery-test/battery-test.component';
import { DeviceDataComponent } from './components/body/dashboard/device-data/device-data.component';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { DocsComponent } from './components/body/docs/docs.component';
import { DevicesComponent } from './components/body/devices/devices.component';
import { HomeComponent } from './components/body/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'deviceData/:deviceId',
        component: DeviceDataComponent,
      },
    ],
  },
  {
    path: 'devices',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: DevicesComponent,
    children: [
      {
        path: 'cells',
        loadChildren: () =>
          import('./cells/cells.module').then((m) => m.CellsModule),
      },
    ],
  },
  {
    path: 'docs',
    component: DocsComponent,
  },
  {
    path: 'batteryTest',
    canActivate: [AuthGuard],
    component: BatteryTestComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
