import { TestDataService } from './../../../../services/test-data.service';
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
  constructor(private testData: TestDataService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
