import { _TestResultDeep } from './../../../../models/TestResult';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartOptions,
} from 'chart.js';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

interface Charts {
  name?: string;
  chartData?: ChartConfiguration['data'] | any;
  ChartOptions?: ChartConfiguration['options'] | any;
  ChartType: ChartType;
}

@Component({
  selector: 'app-show-test-result',
  templateUrl: './show-test-result.component.html',
  styleUrls: ['./show-test-result.component.css'],
})
export class ShowTestResultComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  testInfo?: _TestResultDeep;
  constructor(
    private route: ActivatedRoute,
    private _testChamberService: TestChamberService
  ) {}

  ngOnInit(): void {
    const os$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const testId = params.get('testId');
        const chamberId = params.get('chamberId');
        return this._testChamberService.getTestData(
          chamberId as any,
          testId as any
        );
      })
    );
    os$.subscribe((testInfo: _TestResultDeep) => {
      this.testInfo = testInfo;
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
