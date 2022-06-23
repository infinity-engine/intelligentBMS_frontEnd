import { Subscription } from 'rxjs';
import { TestResultDeep, TestResultLight } from './../../../../models/TestResult';
import { TestDataService } from './../../../../services/test-data.service';
import { ChartConfiguration, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

interface Charts {
  name?: string,
  chartData?: ChartConfiguration['data'] | any,
  ChartOptions?: ChartConfiguration['options'] | any,
  ChartType: ChartType
}

@Component({
  selector: 'app-show-test-result',
  templateUrl: './show-test-result.component.html',
  styleUrls: ['./show-test-result.component.css']
})
export class ShowTestResultComponent implements OnInit, OnDestroy {
  allCharts?: Charts[] = [];
  subscriptions?: Subscription[]=[];
  deepSbs?:Subscription;
  allTestResultLight?:TestResultLight[];
  currentTestResultLight?: TestResultLight;
  currentTestResultDeep?:TestResultDeep['Pulse charging'] | TestResultDeep['Charge/discharge experiment'] | any;
  btnValue?:'Start'|'Pause'|'Resume' = 'Start';
  btnColor?:'rgb(13, 110, 253)'|'green'|'yellow' = 'rgb(13, 110, 253)';

  constructor(private testData: TestDataService) {

  }

  ngOnInit(): void {
    let sbs = this.testData.getTestDataLight().subscribe((result:TestResultLight[])=>{
      this.allTestResultLight = [...result];
    });
    this.subscriptions?.push(sbs);
  }

  setCurrentTestResult(testId:any){
    this.deepSbs?.unsubscribe();
    if(testId){
      this.deepSbs = this.testData.getTestDataDeep().subscribe((result: TestResultDeep['Charge/discharge experiment']) => {
        this.currentTestResultDeep = {...result} as any;
        this.createChart({...result});
        this.currentTestResultLight = {
          "channelId": 1,
          "testMethod": "Charge/discharge experiment",
          "testNumber": "CV001",
          "testName": "Charge/discharge experiment test 1",
          "testId": "CV001",
          "status": "Paused",
          "isCompleted": false,
          "connectionStatus": "Disconnected",
          "testDetails": "This is a demo test."
        };
      })
    }
  }

  // events
  chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  chartHovered({ event, active }: { event?: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }



  createChart(result: TestResultDeep['Charge/discharge experiment'] | TestResultDeep['Pulse charging']) {
    this.allCharts = [];
    //push current values
    let chart: Charts = {
      name: 'Current',
      chartData: {
        datasets: [{
          data: result?.data?.current?.yValue as any,
          label: 'Current'
        }
        ],
        labels: result?.data?.current?.xvalue,
      },
      ChartOptions: {},
      ChartType: 'line'
    }
    this.allCharts?.push(chart);

    //push voltages value
    chart = {
      name: 'Voltage',
      chartData: {
        datasets: [{
          data: result?.data?.voltage?.yValue as any,
          label: 'Voltage'
        }
        ],
        labels: result?.data?.voltage?.xvalue,
      },
      ChartOptions: {},
      ChartType: 'line'
    }
    this.allCharts?.push(chart);

    //push ambient temperature values
    chart = {
      name: 'Ambient Temperature',
      chartData: {
        datasets: [{
          data: result?.data?.ambientTemperature?.yValue as any,
          label: 'Ambient Temperature'
        }
        ],
        labels: result?.data?.ambientTemperature?.xvalue,
      },
      ChartOptions: {},
      ChartType: 'line'
    }
    this.allCharts?.push(chart);

    //push cell temperature values
    chart = {
      name: 'Cell Temperatures',
      chartData: {
        datasets: [],
        labels: []
      },
      ChartOptions: {},
      ChartType: 'line'

    }
    result?.data?.cellTemperature?.forEach((val, index, arr) => {
      chart.chartData.datasets.push({ data: val.yValue, label: 'Sensor' + (index + 1) });
      chart.chartData.labels = val.xvalue;
    })
    this.allCharts?.push(chart);

    //push charge data inthe chart
    chart = {
      name: 'Charge Flow',
      chartData: {
        datasets: [{
          data: result?.data?.chargeFlow?.yValue as any,
          label: 'Charge Flow'
        }
        ],
        labels: result?.data?.chargeFlow?.xvalue,
      },
      ChartOptions: {},
      ChartType: 'line'
    }
    this.allCharts?.push(chart);
  }
  cloneExp(){

  }
  stopExp(){

  }
  changeButtonStatus(data:any){
    console.log(data);
  }
  ngOnDestroy(): void {
    this.subscriptions?.forEach(subs => {
      subs.unsubscribe();
    })
  }

}
