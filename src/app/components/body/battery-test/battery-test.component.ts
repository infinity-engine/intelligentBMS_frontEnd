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
          {
            channelNo: 1,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 4,
            onRows: 2,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 4,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 1,
            chMultiplier: 5,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 5,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 10,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
        ],
      },
      {
        testId: '657',
        chamberName: 'Test Chamber 3',
        testName: 'Basics 101',
        status: 'Running',
        channels: [
          {
            channelNo: 1,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 4,
            onRows: 2,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 4,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 5,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
        ],
      },
      {
        testId: '657',
        chamberName: 'Test Chamber 3',
        testName: 'Basics 101',
        status: 'Running',
        channels: [
          {
            channelNo: 1,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 4,
            onRows: 2,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 4,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 5,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
        ],
      },
      {
        testId: '123',
        chamberName: 'Test Chamber 1',
        testName: 'Basics 101',
        status: 'Running',
        channels: [
          {
            channelNo: 1,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 4,
            onRows: 2,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 4,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 1,
            chMultiplier: 5,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 5,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
          {
            channelNo: 2,
            statusCh: 'Running',
            chMultiplierIndex: 2,
            chMultiplier: 10,
            onRows: 3,
            totalRows: 4,
            statusRow: 'Running',
            rowMultiplierIndex: 2,
            rowMultiplier: 3,
          },
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
