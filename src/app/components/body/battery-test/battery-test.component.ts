import { TestChamber } from './../../../models/TestChamber';
import { Component, OnInit } from '@angular/core';
import { TestChamberService } from 'src/app/services/test-chamber.service';

@Component({
  selector: 'app-battery-test',
  templateUrl: './battery-test.component.html',
  styleUrls: ['./battery-test.component.css']
})
export class BatteryTestComponent implements OnInit {
  activeComponent:'NoTestResult'|'ShowTestResult'|'CreateNewTest'= 'ShowTestResult';
  constructor(private _testChS:TestChamberService) { }

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
  createNewTestChamber(){
    const testChamber = new TestChamber({})
    const {...plainObject} = testChamber
    //console.log(plainObject)
    this._testChS.createNewTestChamber(plainObject).subscribe(d=>{
      console.log(d)
    })
    
  }

}
