import { ComponentStoreService } from './../../../services/component-store.service';
import { DeviceDataService } from './../../../services/device-data.service';
import { DeviceDataLight } from './../../../models/DeviceData';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface BreadCrumbs{
  url?:string,
  name?:string,
  status?:'active'|'disabled'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  devices:DeviceDataLight[]|undefined = undefined;
  noOfDevices:number|undefined = undefined;
  noOfDevicesConnected:number|undefined = undefined;
  isOnOverView:boolean = true;//controls whthere the all pack has been shown or a particular pack details is appearing
  subscriptions:Subscription[]|undefined = undefined;

  breadCrumbs:BreadCrumbs[]= [];
  

  constructor(
    private deviceData:DeviceDataService,
    private router:Router,
    private store:ComponentStoreService,
    ) {
    this.detectUrlChanges();
    }

  ngOnInit(): void {
    this.detectUrlChanges();
  }
  
  goToPackDetails(){
    this.isOnOverView = false;
  }

  detectUrlChanges(){
    let subs = this.router.events.subscribe(data=>{
      
      //Detects the change of urls, will be used when getting bakc to parent component from child component
      if(data instanceof NavigationEnd){
        this.breadCrumbs = [];
        let urlComponents = this.router.url.split('/');
        urlComponents.shift();//exculde the first "" element

        if(urlComponents.length == 3){
          this.breadCrumbs.push({name:'Dashboard',url:'../../dashboard',status:'active'});
          this.breadCrumbs.push({name:'Device data',url:'./',status:'disabled'});
          this.isOnOverView = false;
        }
        else if(urlComponents.length == 1){
          this.breadCrumbs.push({name:'Dashboard',url:'./',status:'disabled'});
          this.isOnOverView = true;

          let subs = this.deviceData.getDeviceDataLight().subscribe( 
            (data:DeviceDataLight[])=>{
            this.devices = data;
            this.noOfDevices = data.length;
            this.noOfDevicesConnected = data.length;//check how many devices are connected.
          },
          (error) =>{
            this.store.sendToastMsg({msg:'Something went wrong!',type:'warning',color:'red'});
          }
          );
          this.subscriptions?.push(subs);
        }
      }
    })
    this.subscriptions?.push(subs);
  }

  ngOnDestroy(): void {
      this.subscriptions?.forEach(subs=>{
        subs.unsubscribe();
      })
  }
}
