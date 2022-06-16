import { DeviceDataComponent } from './components/body/dashboard/device-data/device-data.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { DocsComponent } from './components/body/docs/docs.component';
import { DevicesComponent } from './components/body/devices/devices.component';
import { HomeComponent } from './components/body/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path:'deviceData/:deviceId',
        component:DeviceDataComponent,
      }
    ]
  },
  {
    path:'devices',
    component:DevicesComponent
  },
  {
    path:'chatbot',
    component:ChatbotComponent
  },
  {
    path:'docs',
    component:DocsComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
