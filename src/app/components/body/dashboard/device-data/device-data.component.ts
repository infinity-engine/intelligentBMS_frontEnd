import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit {
  deviceId?:string;
  constructor(private route:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.deviceId = params.get('deviceId') as any;
      console.log(this.deviceId);
    })
  }

}
