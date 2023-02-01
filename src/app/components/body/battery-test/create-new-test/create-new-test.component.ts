import { Component, OnInit } from '@angular/core';
import {
  testFormats,
  TestFormat,
  SelectField,
  TextField,
  InputField,
  Fields,
  ChannelFields,
} from './FormFields';

@Component({
  selector: 'app-create-new-test',
  templateUrl: './create-new-test.component.html',
  styleUrls: ['./create-new-test.component.css'],
})
export class CreateNewTestComponent implements OnInit {
  conAmTe: boolean = true;
  maxRowAllowed: number = 10;
  allSelectedChannel: ChannelFields[] = [];
  maxNoOfChannel: number = 6;
  availableChannels: number[] = [];
  isAddChBtnDisabled:boolean = true;
  isRemChBtnDisabled:boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.addRow();
    for (let i = 1; i <= this.maxNoOfChannel; i++) {
      this.availableChannels.push(i);
    }
    if(this.maxNoOfChannel > 1){
      this.isAddChBtnDisabled = false;
    }
  }

  addRow(ch_index?: number | undefined) {
    let selectedChannel: ChannelFields | undefined;
    let selectedTestFormat: TestFormat[] | undefined = undefined;
    let _allTestFormats: TestFormat[] = JSON.parse(JSON.stringify(testFormats)); //create deep copy of the object
    let currentSelectedFormat = _allTestFormats[0];

    if (ch_index === undefined) {
      // if no channel row is initially added.
      this.allSelectedChannel.push({
        channelNumber: undefined,
        cellID: undefined,
        testFormats: [currentSelectedFormat],
        allTestFormat: [_allTestFormats],
        isRemoveRowButtonDisabled: true,
        isAddRowButtonDisabled: false,
        overallRowMultiplier: 1,
      });
      selectedChannel = this.allSelectedChannel[0];
      selectedTestFormat = selectedChannel.testFormats;
    } else {
      selectedChannel = this.allSelectedChannel[ch_index];
      selectedTestFormat = selectedChannel.testFormats;
      selectedChannel.allTestFormat.push(_allTestFormats);
      selectedTestFormat.push(currentSelectedFormat);
    }

    if (selectedTestFormat.length > 1) {
      selectedChannel.isRemoveRowButtonDisabled = false;
    }
    if (selectedTestFormat.length >= 10) {
      selectedChannel.isAddRowButtonDisabled = true;
    }
  }

  removeRow(ch_index: number) {
    let selectedChannel = this.allSelectedChannel[ch_index];
    let selectedTestFormat = selectedChannel.testFormats;
    let l = selectedTestFormat.length;
    if ((l as number) > 1) {
      selectedTestFormat.pop();
      selectedChannel.isAddRowButtonDisabled = false;
      if ((l as number) - 1 <= 1) {
        selectedChannel.isRemoveRowButtonDisabled = true;
      }
    }
  }

  addChannel(){
    this.addRow();
    this.isRemChBtnDisabled = false;
  }
  removeChannel(){
    let popedItem = this.allSelectedChannel.pop();
    console.log(popedItem);
    if (this.allSelectedChannel.length == 1){
      this.isRemChBtnDisabled = true;
    }
  }

  updateAvChannels() {}

  save() {}

  update() {}

  fieldResolve(
    field_id: number,
    child_id: number,
    row_id: number,
    ch_index: number
  ) {
    //if select option is changed within a row
    let selectedChannel = this.allSelectedChannel[ch_index];
    let selectedTestFormat = selectedChannel.testFormats;
    let currentTestFormat = selectedTestFormat[row_id];
    if (currentTestFormat.value == 1) {
      if (field_id == 1) {
        //for charge/discharge/hold/reset select field
        if (
          currentTestFormat.children[child_id - 1].fields[0].value == 'Rest'
        ) {
          currentTestFormat.children[child_id - 1].fields[1].visibility = false; //at
          currentTestFormat.children[child_id - 1].fields[2].visibility = false; //value
          currentTestFormat.children[child_id - 1].fields[3].visibility = false; //C|A|W
        } else {
          currentTestFormat.children[child_id - 1].fields[1].visibility = true; //at
          currentTestFormat.children[child_id - 1].fields[2].visibility = true; //value
          currentTestFormat.children[child_id - 1].fields[3].visibility = true; //C|A|W
          if (
            currentTestFormat.children[child_id - 1].fields[0].value == 'Hold'
          ) {
            (
              currentTestFormat.children[child_id - 1].fields[3] as SelectField
            ).options = ['V'];
            currentTestFormat.children[child_id - 1].fields[3].value = 'V';
          } else {
            (
              currentTestFormat.children[child_id - 1].fields[3] as SelectField
            ).options = ['C', 'A', 'W'];
            currentTestFormat.children[child_id - 1].fields[3].value = 'C';
          }
        }
      }
    } else if (currentTestFormat.value == 2) {
    } else {
    }
  }
}
