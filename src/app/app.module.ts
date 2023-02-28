import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FootNavComponent } from './components/footer/foot-nav/foot-nav.component';
import { HeadNavComponent } from './components/header/head-nav/head-nav.component';
import { HomeComponent } from './components/body/home/home.component';
import { DevicesComponent } from './components/body/devices/devices.component';
import { DocsComponent } from './components/body/docs/docs.component';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { AuthModule } from '@auth0/auth0-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DeviceDataComponent } from './components/body/dashboard/device-data/device-data.component';
import { HttpClientModule } from '@angular/common/http';
import { BatteryTestComponent } from './components/body/battery-test/battery-test.component';
import { NoResultComponent } from './components/body/battery-test/no-result/no-result.component';
import { ShowTestResultComponent } from './components/body/battery-test/show-test-result/show-test-result.component';
import { CreateNewTestComponent } from './components/body/battery-test/create-new-test/create-new-test.component';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FootNavComponent,
    HeadNavComponent,
    HomeComponent,
    DevicesComponent,
    DocsComponent,
    DashboardComponent,
    DeviceDataComponent,
    BatteryTestComponent,
    NoResultComponent,
    ShowTestResultComponent,
    CreateNewTestComponent
  ],
  imports: [
    AppRoutingModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: environment.httpInterceptor,
    }),
    NgCircleProgressModule.forRoot({
      animation: true,
      animationDuration: 300,
    }),
    HttpClientModule,
    NgChartsModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
