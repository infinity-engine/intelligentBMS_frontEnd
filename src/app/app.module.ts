import { DeviceDataService } from './services/device-data.service';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FootNavComponent } from './components/footer/foot-nav/foot-nav.component';
import { HeadNavComponent } from './components/header/head-nav/head-nav.component';
import { HomeComponent } from './components/body/home/home.component';
import { DevicesComponent } from './components/body/devices/devices.component';
import { DocsComponent } from './components/body/docs/docs.component';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AuthModule } from '@auth0/auth0-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DeviceDataComponent } from './components/body/dashboard/device-data/device-data.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FootNavComponent,
    HeadNavComponent,
    HomeComponent,
    DevicesComponent,
    DocsComponent,
    DashboardComponent,
    ChatbotComponent,
    DeviceDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      ...environment.auth
    }),
    NgCircleProgressModule.forRoot({
      animation:true,
      animationDuration:300
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
