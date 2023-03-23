import { ComponentStoreService } from './../../../../services/component-store.service';
import {
  _TestResultDeep,
  QuickResponseMeasurement,
  MeasuredParameters,
  SensorObj,
} from './../../../../models/TestResult';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { of, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

import { ChartConfiguration, ChartType } from 'chart.js';
import {
  Component,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Location } from '@angular/common';

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
  quickResponses: QuickResponseMeasurement[] = [];
  chartSub?: Subscription;
  testId?: string | null;
  chamberId?: string | null;
  measurementUpdateIntervalId: any;
  testInfoIntervalId: any;
  testInfoSub?: Subscription;
  modalTitle?: string;
  modalBody?: string;

  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>;
  @ViewChild('myModal') modal: any;

  constructor(
    private route: ActivatedRoute,
    private _testChamberService: TestChamberService,
    private _componentStoreService: ComponentStoreService,
    private modalService: NgbModal,
    private location: Location
  ) {}

  toggleShowChart() {
    this.showChart = !this.showChart;
    clearInterval(this.measurementUpdateIntervalId);
    this.chartSub?.unsubscribe();
  }

  onClickChild(event: MouseEvent) {
    event.stopPropagation();
  }

  onClickParent(event: MouseEvent) {
    this.toggleShowChart();
  }
  showChartView(channelNo: number) {
    this.allCharts = [];
    this.toggleShowChart();
    const channelQuickResponse = this.quickResponses.find(
      (res) => res.channelNo === channelNo
    );
    if (channelQuickResponse) {
      this.createChart(channelQuickResponse);
      this.keepUpdatingChart(channelQuickResponse);
    } else {
      const sub = this._testChamberService
        .getQuickResponse(
          this.chamberId as any,
          this.testId as any,
          channelNo as any
        )
        .subscribe((data: QuickResponseMeasurement) => {
          this.createChart(data);
          this.quickResponses.push(data);
          if (data.statusCh === 'Running') {
            //if channel is running then only keep updating the channel
            this.keepUpdatingChart(data);
          }
          sub.unsubscribe();
        });
    }
  }
  createChart(channelQuickResponse: QuickResponseMeasurement) {
    if (
      channelQuickResponse.measuredParameters.current &&
      channelQuickResponse.measuredParameters.current.length > 0
    ) {
      let chart: Charts = {
        name: 'Current',
        chartData: {
          datasets: [
            {
              data: channelQuickResponse.measuredParameters.current,
              label: 'Current',
            },
          ],
          labels: channelQuickResponse.measuredParameters.time,
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
    }
    if (
      channelQuickResponse.measuredParameters.voltage &&
      channelQuickResponse.measuredParameters.voltage.length > 0
    ) {
      let chart: Charts = {
        name: 'Voltage',
        chartData: {
          datasets: [
            {
              data: channelQuickResponse.measuredParameters.voltage,
              label: 'Voltage',
            },
          ],
          labels: channelQuickResponse.measuredParameters.time,
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
    if (
      channelQuickResponse.measuredParameters.chamberTemp &&
      channelQuickResponse.measuredParameters.chamberTemp.length > 0
    ) {
      let chart: Charts = {
        name: 'Chamber Temperature',
        chartData: {
          datasets: [
            {
              data: channelQuickResponse.measuredParameters.chamberTemp,
              label: 'Chamber Temperature',
            },
          ],
          labels: channelQuickResponse.measuredParameters.time,
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
    if (
      channelQuickResponse.measuredParameters.chamberHum &&
      channelQuickResponse.measuredParameters.chamberHum.length > 0
    ) {
      let chart: Charts = {
        name: 'Chamber Humidity',
        chartData: {
          datasets: [
            {
              data: channelQuickResponse.measuredParameters.chamberHum,
              label: 'Chamber Humidity',
            },
          ],
          labels: channelQuickResponse.measuredParameters.time,
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

    if (
      channelQuickResponse.measuredParameters.cellTemp &&
      channelQuickResponse.measuredParameters.cellTemp.length > 0
    ) {
      let chart: Charts = {
        name: 'Cell Temperature',
        chartData: {
          datasets: [],
          labels: channelQuickResponse.measuredParameters.time,
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
      channelQuickResponse.measuredParameters.cellTemp.forEach(
        (tempObj: SensorObj) => {
          chart.chartData.datasets.push({
            data: tempObj.values,
            label: 'Sensor' + tempObj.sensorId,
          });
        }
      );
      this.allCharts.push(chart);
    }
  }
  keepUpdatingChart(channelQuickResponse: QuickResponseMeasurement) {
    clearInterval(this.measurementUpdateIntervalId);
    this.measurementUpdateIntervalId = setInterval(() => {
      this.chartSub = this._testChamberService
        .getQuickResponse(
          this.chamberId as any,
          this.testId as any,
          channelQuickResponse.channelNo as any,
          channelQuickResponse.measuredParameters.time
            ? channelQuickResponse.measuredParameters.time?.length - 1
            : 0
        )
        .subscribe((data: any) => {
          this.appendNewData(
            channelQuickResponse.measuredParameters,
            data.measuredParameters as MeasuredParameters
          );
          this.charts?.forEach((chart) => chart.update());
          this.chartSub?.unsubscribe();
        });
    }, 2000);
  }
  appendNewData(
    prevMeasurements: MeasuredParameters,
    newMeasurements: MeasuredParameters
  ) {
    if (newMeasurements.current && newMeasurements.current?.length > 0) {
      prevMeasurements.current?.push(...newMeasurements.current);
    }
    if (newMeasurements.voltage && newMeasurements.voltage?.length > 0) {
      prevMeasurements.voltage?.push(...newMeasurements.voltage);
    }
    if (newMeasurements.chamberHum && newMeasurements.chamberHum?.length > 0) {
      prevMeasurements.chamberHum?.push(...newMeasurements.chamberHum);
    }
    if (
      newMeasurements.chamberTemp &&
      newMeasurements.chamberTemp?.length > 0
    ) {
      prevMeasurements.chamberTemp?.push(...newMeasurements.chamberTemp);
    }
    if (newMeasurements.time && newMeasurements.time?.length > 0) {
      prevMeasurements.time?.push(...newMeasurements.time);
    }
    newMeasurements.cellTemp?.forEach((tempObjNew, i) => {
      const tempObjOld = prevMeasurements.cellTemp?.find(
        (tempObj) => tempObj.sensorId === tempObjNew.sensorId
      );
      if (tempObjOld) {
        tempObjOld.values.push(...tempObjNew.values);
      } else {
        prevMeasurements.cellTemp?.push(tempObjNew);
      }
    });
  }

  ngOnInit(): void {
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
    const os$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.testId = params.get('testId');
        this.chamberId = params.get('chamberId');
        return this._testChamberService.getTestData(
          this.chamberId as any,
          this.testId as any
        );
      })
    );
    this.testInfoSub = os$.subscribe((testInfo: _TestResultDeep) => {
      this.testInfo = testInfo;
      this.testInfoSub?.unsubscribe();
    });
    this.testInfoIntervalId = setInterval(() => {
      if (this.testId && this.chamberId) {
        this.testInfoSub?.unsubscribe();
        this.testInfoSub = this._testChamberService
          .getTestData(this.chamberId as any, this.testId as any)
          .subscribe((testInfo) => {
            this.testInfo = testInfo;
            this.testInfoSub?.unsubscribe();
          });
      }
    }, 10000);
  }
  edit() {}
  play() {
    this.changeStatus('Running');
  }
  pause() {
    this.changeStatus('Paused');
  }
  stop() {
    this.modalTitle = 'Alert';
    this.modalBody =
      'Are you sure you want to stop the experiment? Once you stop it, you can never start it again.';
    this.modalService.open(this.modal, { centered: true }).result.then(
      (result) => {
        //console.log('accepted');
        this.changeStatus('Stopped');
      },
      (reason) => {
        //console.log('closed');
      }
    );
  }
  changeStatus(status: string | null) {
    const sub = this._testChamberService
      .forceStatus(this.chamberId as any, this.testId as any, status)
      .subscribe((res: any) => {
        if (res.acknowledged) {
          this._componentStoreService.sendToastMsg({
            msg: 'Status has been sent to the cloud. Wait for the Test Chamber to reflect the status',
            timeOut: 10000,
            color: 'black',
          });
        }
      });
    this.subs.push(sub);
  }

  download(channelNo: number) {
    this._testChamberService
      .downloadTestResult(this.chamberId as any, this.testId as any, channelNo)
      .subscribe((response) => {
        const blob = new Blob([response.body], {
          type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const contentDispositionHeader = response.headers.get(
          'content-disposition'
        );
        const filename = contentDispositionHeader
          ? contentDispositionHeader.split('filename=')[1].replace(/"/g, '')
          : 'testResult.csv';
        saveAs(url, filename);
      });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.testInfoSub?.unsubscribe();
    this.chartSub?.unsubscribe();
    clearInterval(this.measurementUpdateIntervalId);
    clearInterval(this.testInfoIntervalId);
  }
}
