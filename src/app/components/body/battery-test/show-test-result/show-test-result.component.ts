import {
  _TestResultDeep,
  TestChannelDeep,
  RowInfo,
} from './../../../../models/TestResult';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import {
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartOptions,
} from 'chart.js';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

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
  showChart: boolean = false;
  allCharts: Charts[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private route: ActivatedRoute,
    private _testChamberService: TestChamberService
  ) {}

  toggleShowChart() {
    this.showChart = !this.showChart;
  }
  onClickChild(event: MouseEvent) {
    event.stopPropagation();
  }

  onClickParent(event: MouseEvent) {
    this.toggleShowChart();
  }
  showChartView(channelNo: number) {
    this.allCharts = [];
    const channel: TestChannelDeep | undefined = this.testInfo?.channels.find(
      (ch) => ch.channelNumber === channelNo
    );

    this.toggleShowChart();
    if (!channel) {
      return;
    }
    let current: number[] = [];
    let voltage: number[] = [];
    let chamberTemp: number[] = [];
    let chamberHum: number[] = [];
    let cellTemp: number[][] = [];
    let time: number[] = [];
    channel.rows.forEach((row: RowInfo) => {
      if (row.measuredParameters.current) {
        current.push(...row.measuredParameters.current);
      }
      if (row.measuredParameters.voltage) {
        voltage.push(...row.measuredParameters.voltage);
      }
      if (row.measuredParameters.chamberTemp) {
        chamberTemp.push(...row.measuredParameters.chamberTemp);
      }
      if (row.measuredParameters.chamberHum) {
        chamberHum.push(...row.measuredParameters.chamberHum);
      }
      if (row.measuredParameters.cellTemp) {
        cellTemp.push(...row.measuredParameters.cellTemp);
      }
      if (row.measuredParameters.time) {
        time.push(...row.measuredParameters.time);
      }
    });

    if (current.length > 0) {
      let chart: Charts = {
        name: 'Current',
        chartData: {
          datasets: [
            {
              data: current,
              label: 'Current',
            },
          ],
          labels: time,
        },
        ChartOptions: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Time(S)',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Cell Current (A)',
                },
              },
            ],
          },
        },
        ChartType: 'line',
      };
      this.allCharts.push(chart);
      setInterval(() => {
        chart.chartData.datasets[0].data.push(5);
        chart.chartData.labels.push(chart.chartData.labels.length * 2);

        this.chart?.update();
      }, 1000);
    }
    if (voltage.length > 0) {
      let chart: Charts = {
        name: 'Voltage',
        chartData: {
          datasets: [
            {
              data: voltage,
              label: 'Voltage',
            },
          ],
          labels: time,
        },
        ChartOptions: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Time(S)',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Cell Voltage(V)',
                },
              },
            ],
          },
        },
        ChartType: 'line',
      };
      this.allCharts.push(chart);
    }
    if (chamberTemp.length > 0) {
      let chart: Charts = {
        name: 'Chamber Temperature',
        chartData: {
          datasets: [
            {
              data: chamberTemp,
              label: 'Chamber Temperature',
            },
          ],
          labels: time,
        },
        ChartOptions: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Time(S)',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Chamber Temperature (°C)',
                },
              },
            ],
          },
        },
        ChartType: 'line',
      };
      this.allCharts.push(chart);
    }
    if (chamberHum.length > 0) {
      let chart: Charts = {
        name: 'Chamber Humidity',
        chartData: {
          datasets: [
            {
              data: chamberHum,
              label: 'Chamber Humidity',
            },
          ],
          labels: time,
        },
        ChartOptions: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Time(S)',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Chamber Humidity(%)',
                },
              },
            ],
          },
        },
        ChartType: 'line',
      };
      this.allCharts.push(chart);
    }

    if (cellTemp.length > 0) {
      let chart: Charts = {
        name: 'Cell Temperature',
        chartData: {
          datasets: [],
          labels: time,
        },
        ChartOptions: {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Time(S)',
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Cell Temperatures(°C)',
                },
              },
            ],
          },
        },
        ChartType: 'line',
      };
      cellTemp.forEach((val, index) => {
        chart.chartData.datasets.push({
          data: val,
          label: 'Sensor' + (index + 1),
        });
      });
      this.allCharts.push(chart);
    }
  }
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
