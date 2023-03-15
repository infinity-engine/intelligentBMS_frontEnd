import { _TestResultLight } from './../../../models/TestResult';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-battery-test',
  templateUrl: './battery-test.component.html',
  styleUrls: ['./battery-test.component.css'],
})
export class BatteryTestComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  liveTests: _TestResultLight[] = [];
  constructor(private location: Location) {}

  ngOnInit(): void {
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
    this.liveTests = [
      {
        testId: '123',
        chamberName: 'Test Chamber 1',
        testName: 'Basics 101',
        status: 'Running',
        channels: [
          { channelNo: 1, status: 'Completed', onRows: 2, totalRows: 2 },
          { channelNo: 1, status: 'Running', onRows: 3, totalRows: 6 },
        ],
      },
      {
        testId: '256',
        chamberName: 'Test Chamber 4',
        testName: 'Ad 12',
        status: 'Running',
        channels: [
          { channelNo: 1, status: 'Completed', onRows: 2, totalRows: 2 },
          { channelNo: 1, status: 'Running', onRows: 3, totalRows: 6 },
          { channelNo: 1, status: 'Running', onRows: 5, totalRows: 7 },
          { channelNo: 1, status: 'Running', onRows: 5, totalRows: 8 },
        ],
      },
      {
        testId: '123',
        chamberName: 'Test Chamber 1',
        testName: 'Basics 101',
        status: 'Running',
        channels: [
          { channelNo: 1, status: 'Completed', onRows: 2, totalRows: 2 },
          { channelNo: 1, status: 'Running', onRows: 3, totalRows: 6 },
        ],
      },
      {
        testId: '256',
        chamberName: 'Test Chamber 4',
        testName: 'Ad 12',
        status: 'Running',
        channels: [
          { channelNo: 1, status: 'Completed', onRows: 2, totalRows: 2 },
          { channelNo: 1, status: 'Running', onRows: 3, totalRows: 6 },
          { channelNo: 1, status: 'Running', onRows: 5, totalRows: 7 },
          { channelNo: 1, status: 'Running', onRows: 5, totalRows: 8 },
        ],
      },
    ];
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
