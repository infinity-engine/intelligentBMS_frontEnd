import { Component, OnInit } from '@angular/core';
import { testMethods } from './FormFields';

@Component({
  selector: 'app-create-new-test',
  templateUrl: './create-new-test.component.html',
  styleUrls: ['./create-new-test.component.css']
})
export class CreateNewTestComponent implements OnInit {
  _testMethods:any = testMethods;
  selectedTestMethod?:any;
  selectedTestMethodParameters?:any ={};
  constructor() { }

  ngOnInit(): void {
    this.selectedTestMethod = this._testMethods[0];
  }

  save(){
  }
  update(){
    for(let i of this.selectedTestMethod.fields){
      this.selectedTestMethodParameters[i] = null;
    }
    return this.selectedTestMethod;
  }

}
