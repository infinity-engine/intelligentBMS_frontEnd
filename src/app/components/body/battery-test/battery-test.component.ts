import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battery-test',
  templateUrl: './battery-test.component.html',
  styleUrls: ['./battery-test.component.css']
})
export class BatteryTestComponent implements OnInit {
  activeComponent:'NoTestResult'|'ShowTestResult'|'CreateNewTest'= 'CreateNewTest';
  constructor() { }

  ngOnInit(): void {
  }

  changeButtonStatus(){
    if (this.activeComponent == 'ShowTestResult' || this.activeComponent == 'NoTestResult'){
      this.activeComponent = 'CreateNewTest';
    }else{
      if(false){
        //Put the condition to check whether there is any test result,
        //if no test result found then show test result should lead to no test result component.
        this.activeComponent = 'NoTestResult'
      }else{
        this.activeComponent = 'ShowTestResult';
      }
    }
  }

}
