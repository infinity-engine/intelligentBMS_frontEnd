import { DeviceDataService } from './../../../services/device-data.service';
import { DeviceDataLight } from './../../../models/DeviceData';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showToast:boolean = false;
  x:any = undefined;
  toastMsg:string|undefined = undefined;
  devices:DeviceDataLight[]|undefined = undefined;
  noOfDevices:number|undefined = undefined;
  noOfDevicesConnected:number|undefined = undefined;
  isOnOverView:boolean = true;//controls whthere the all pack has been shown or a particular pack details is appearing

  constructor(private deviceData:DeviceDataService,private router:Router) { }

  ngOnInit(): void {
    let urlComponents = this.router.url.split('/');//if direct access to pack details will have a url address of '/dashboard/deviceData/<id>/'
    if(urlComponents.length>2){
      this.isOnOverView = false;
    }else{
      this.deviceData.getDeviceDataLight().subscribe( 
        (data:DeviceDataLight[])=>{
        this.devices = data;
        this.noOfDevices = data.length;
        this.noOfDevicesConnected = data.length;//check how many devices are connected.
      },
      (error) =>{
        this.showToast = true;
        this.toastMsg = "Somthing went wrong!"
      }
      );
    }
  }
  changeStatus(){
    this.showToast = !this.showToast;
    if(this.showToast){
      this.x = setTimeout(()=>{
        this.showToast = false;
      },10000)
    }else{
      clearTimeout(this.x);
    }
  }
  goToPackDetails(){
    this.isOnOverView = false;
  }
}
