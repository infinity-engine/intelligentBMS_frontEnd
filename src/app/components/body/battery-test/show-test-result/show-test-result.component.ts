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
  isConnected: boolean = false;
  isConnectedIntervalId: any;
  connSub?: Subscription;
  maxNoOfDataPoints: number = 1000;
  targetSampleSize: number = 700;
  updatedUptoIndex = 0;

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
    let blankData: MeasuredParameters = {};
    blankData.time = [];
    if (
      channelQuickResponse.measuredParameters.current &&
      channelQuickResponse.measuredParameters.current.length > 0
    ) {
      blankData.current = [];
      let chart: Charts = {
        name: 'Current',
        chartData: {
          datasets: [
            {
              data: blankData.current,
              label: 'Current',
            },
          ],
          labels: blankData.time,
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
      blankData.voltage = [];
      let chart: Charts = {
        name: 'Voltage',
        chartData: {
          datasets: [
            {
              data: blankData.voltage,
              label: 'Voltage',
            },
          ],
          labels: blankData.time,
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
      blankData.chamberTemp = [];
      let chart: Charts = {
        name: 'Chamber Temperature',
        chartData: {
          datasets: [
            {
              data: blankData.chamberTemp,
              label: 'Chamber Temperature',
            },
          ],
          labels: blankData.time,
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
      blankData.chamberHum = [];
      let chart: Charts = {
        name: 'Chamber Humidity',
        chartData: {
          datasets: [
            {
              data: blankData.chamberHum,
              label: 'Chamber Humidity',
            },
          ],
          labels: blankData.time,
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
      blankData.cellTemp = [];
      let chart: Charts = {
        name: 'Cell Temperature',
        chartData: {
          datasets: [],
          labels: blankData.time,
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
          let d: SensorObj = { sensorId: tempObj.sensorId, values: [] };
          blankData.cellTemp?.push(d);
          chart.chartData.datasets.push({
            data: d.values,
            label: 'Sensor' + tempObj.sensorId,
          });
        }
      );
      this.allCharts.push(chart);
    }
    this.appendNewData(blankData, channelQuickResponse.measuredParameters);
  }

  keepUpdatingChart(channelQuickResponse: QuickResponseMeasurement) {
    clearInterval(this.measurementUpdateIntervalId);
    this.measurementUpdateIntervalId = setInterval(() => {
      this.chartSub = this._testChamberService
        .getQuickResponse(
          this.chamberId as any,
          this.testId as any,
          channelQuickResponse.channelNo as any,
          this.updatedUptoIndex - 1
        )
        .subscribe((data: any) => {
          this.appendNewData(
            channelQuickResponse.measuredParameters,
            data.measuredParameters as MeasuredParameters
          );
          this.charts?.forEach((chart) => chart.update());
          this.chartSub?.unsubscribe();
          if (data.status === 'Completed' || data.status === 'Stopped') {
            clearInterval(this.measurementUpdateIntervalId);
          }
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
    this.updatedUptoIndex += newMeasurements.time
      ? newMeasurements.time.length
      : 0;

    if (
      prevMeasurements.time &&
      prevMeasurements.time.length > this.maxNoOfDataPoints
    ) {
      // Use sampling technique
      const samplingRate = prevMeasurements.time.length / this.targetSampleSize;

      this.sampleData(prevMeasurements.time, samplingRate);
      this.sampleData(prevMeasurements.current, samplingRate);
      this.sampleData(prevMeasurements.voltage, samplingRate);
      this.sampleData(prevMeasurements.chamberHum, samplingRate);
      this.sampleData(prevMeasurements.chamberTemp, samplingRate);

      prevMeasurements.cellTemp?.forEach((tempObj) => {
        this.sampleData(tempObj.values, samplingRate);
      });
    }
  }

  sampleData(data: number[] | undefined, samplingRate: number): void {
    if (!data || samplingRate <= 1) {
      return;
    }

    let writeIndex = 0;
    for (
      let readIndex = 0;
      readIndex < data.length;
      readIndex += samplingRate
    ) {
      data[writeIndex++] = data[Math.floor(readIndex)];
    }

    data.length = writeIndex;
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
            if (
              this.testInfo?.status === 'Completed' ||
              this.testInfo?.status === 'Stopped'
            ) {
              clearInterval(this.testInfoIntervalId);
            }
          });
      }
    }, 10000);

    this.updateConnection();

    this.isConnectedIntervalId = setInterval(
      () => this.updateConnection(),
      10000
    );
  }

  updateConnection() {
    if (this.chamberId) {
      this.connSub?.unsubscribe();
      this.connSub = this._testChamberService
        .getConnectionStatus(this.chamberId as any)
        .subscribe({
          next: (pay: any) => {
            this.isConnected = pay.isConnected;
            this.connSub?.unsubscribe();
          },
          error: (err) => {
            this.isConnected = false;
          },
        });
    }
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
    this.connSub?.unsubscribe();
    clearInterval(this.isConnectedIntervalId);
  }
}
