import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css'],
})
export class DeviceDataComponent implements OnInit, OnDestroy {
  deviceId?: string;
  subs: Subscription[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const sub = this.route.paramMap.subscribe((params) => {
      this.deviceId = params.get('deviceId') as any;
      //console.log(this.deviceId);
    });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
