import { Component, OnInit } from '@angular/core';
import {
  testFormats,
  TestFormat,
  SelectField,
  TextField,
  InputField,
  Fields,
} from './FormFields';

@Component({
  selector: 'app-create-new-test',
  templateUrl: './create-new-test.component.html',
  styleUrls: ['./create-new-test.component.css'],
})
export class CreateNewTestComponent implements OnInit {
  selectedTestFormat?:any = [];
  conAmTe: boolean = true;
  _allTestFormats:any = []

  constructor() {
  }

  ngOnInit(): void {
    this.addRow();
  }
  addRow(){
    this._allTestFormats.push([...testFormats]);
    let currentSelectedFormat = this._allTestFormats[this._allTestFormats.length-1][0];
    this.selectedTestFormat.push(currentSelectedFormat);
  }
  save() {
    console.log(this.selectedTestFormat);
  }
  update() {}
  fieldResolve(field_id: number, child_id: number, row_id:number) {
    let currentTestFormat = this.selectedTestFormat[row_id]
    // if (currentTestFormat.id == 1) {
    //   if (field_id == 1) {
    //     if (
    //       currentTestFormat.children[child_id - 1].fields[0].value ==
    //       'Rest'
    //     ) {
    //       currentTestFormat.children[child_id - 1].fields[1].visibility =
    //         false; //at
    //       currentTestFormat.children[child_id - 1].fields[2].visibility =
    //         false; //value
    //       currentTestFormat.children[child_id - 1].fields[3].visibility =
    //         false; //C|A|W
    //     } else {
    //       currentTestFormat.children[child_id - 1].fields[1].visibility =
    //         true; //at
    //       currentTestFormat.children[child_id - 1].fields[2].visibility =
    //         true; //value
    //       currentTestFormat.children[child_id - 1].fields[3].visibility =
    //         true; //C|A|W
    //       if (
    //         currentTestFormat.children[child_id - 1].fields[0].value ==
    //         'Hold'
    //       ) {
    //         currentTestFormat.children[child_id - 1].fields[3].options = [
    //           'V',
    //         ];
    //         currentTestFormat.children[child_id - 1].fields[3].value =
    //           'V';
    //       } else {
    //         currentTestFormat.children[child_id - 1].fields[3].options = [
    //           'C',
    //           'A',
    //           'W',
    //         ];
    //         currentTestFormat.children[child_id - 1].fields[3].value =
    //           'C';
    //       }
    //     }
    //   }
    // }
    // else if(currentTestFormat.id == 2) {

    // }
    // else{

    // }
  }
}
