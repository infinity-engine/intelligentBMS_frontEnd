import { Router } from '@angular/router';
import { TestChamberService } from 'src/app/services/test-chamber.service';
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
  sub?: Subscription;
  delay: number = 10000;
  interValId?: any;
  isTestInfoViewEnabled: boolean = false;
  constructor(
    private location: Location,
    private _testChamberService: TestChamberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
    this.getTests();
    this.interValId = setInterval(() => {
      this.getTests();
    }, this.delay);
  }
  getTests() {
    this.sub = this._testChamberService.getLiveTests().subscribe({
      next: (tests: any) => {
        this.liveTests = tests;
        this.sub?.unsubscribe();
      },
      error: (err) => {
        console.log(err);
        this.liveTests = [];
      },
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
    this.sub?.unsubscribe();
    clearInterval(this.interValId);
  }
  changeView() {
    this.isTestInfoViewEnabled = !this.isTestInfoViewEnabled;
  }
}
