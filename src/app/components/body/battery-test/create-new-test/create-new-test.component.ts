import { _TestChamber } from './../../../../models/TestChamber';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Component, OnInit } from '@angular/core';

import {
  testFormats,
  TestFormat,
  SelectField,
  ChannelFields,
  PayLoad,
} from '../../../../models/FormFields';
import { Test } from 'src/app/models/Test';

@Component({
  selector: 'app-create-new-test',
  templateUrl: './create-new-test.component.html',
  styleUrls: ['./create-new-test.component.css'],
})
export class CreateNewTestComponent implements OnInit {
  maxRowAllowed: number = 10;
  allSelectedChannel: ChannelFields[] = [];
  isAddChBtnDisabled: boolean = true;
  isRemChBtnDisabled: boolean = true;
  currentPayload?: PayLoad;
  testChambers?: _TestChamber[] = [];
  selectedTestChamber: _TestChamber | null | any = null;
  scheduledDate:any = new Date();
  showSpinnerButton:boolean = false;//inside schedule button
  showSpinnerConnection:boolean = true;

  constructor(private _testChamberService: TestChamberService) {}

  ngOnInit(): void {
    this._testChamberService.getChambers().subscribe((data) => {
      if (data instanceof Array) {
        this.testChambers = data;
      }
    });
    console.log(this.scheduledDate)
  }

  init() {
    this.currentPayload = {
      testId: undefined,
      testDesc: undefined,
      testName: undefined,
      channels: this.allSelectedChannel,
      isConAmTe: true,
      ambTemp: 25,
    };
    this.addChannel();
    if (this.selectedTestChamber.maxNoOfChannels > 1) {
      this.isAddChBtnDisabled = false;
    }
  }

  addRow(ch_index: number) {
    //ch_index isn't necessarily channel number
    let selectedChannel: ChannelFields | undefined;
    let selectedTestFormat: TestFormat[] | undefined = undefined;
    let _allTestFormats: TestFormat[] = JSON.parse(JSON.stringify(testFormats)); //create deep copy of the object
    let currentSelectedFormat = _allTestFormats[0]; //default one

    selectedChannel = this.allSelectedChannel[ch_index];
    selectedTestFormat = selectedChannel.testFormats;
    selectedChannel.allTestFormat.push(_allTestFormats);
    selectedTestFormat.push(currentSelectedFormat);

    if (selectedTestFormat.length > 1) {
      selectedChannel.isRemoveRowButtonDisabled = false;
    } else {
      selectedChannel.isRemoveRowButtonDisabled = true;
    }
    if (selectedTestFormat.length >= 10) {
      selectedChannel.isAddRowButtonDisabled = true;
    } else {
      selectedChannel.isAddRowButtonDisabled = false;
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

  setTime(time: string) {
    const [hours, minutes] = time.split(':');
    this.scheduledDate.setHours(parseInt(hours, 10));
    this.scheduledDate.setMinutes(parseInt(minutes, 10));
    return this.scheduledDate;
  }
  
  addChannel() {
    // if no channel row is initially added.
    let availableChannels = [];
    let usedChannels = [];
    for (let ch_info of this.allSelectedChannel) {
      usedChannels.push(ch_info.channelNumber);
    }
    for (let i = 1; i <= this.selectedTestChamber.maxNoOfChannels; i++) {
      if (usedChannels.find((e) => e == i)) {
      } else {
        availableChannels.push(i);
      }
    }
    this.allSelectedChannel.push({
      channelNumber: undefined,
      cellID: undefined,
      testFormats: [],
      allTestFormat: [],
      isRemoveRowButtonDisabled: true,
      isAddRowButtonDisabled: true,
      overallRowMultiplier: 1,
      availableChannels: availableChannels,
    });

    this.addRow(this.allSelectedChannel.length - 1);

    this.fixAddRemChBtnStatus();
  }
  
  fixAddRemChBtnStatus(){
    let l = this.allSelectedChannel.length
    if (l <= 1){
      this.isRemChBtnDisabled = true;
    }else{
      this.isRemChBtnDisabled = false;
    }
    if (l<this.selectedTestChamber.maxNoOfChannels){
      this.isAddChBtnDisabled = false;
    }else{
      this.isAddChBtnDisabled = true;
    }
  }

  updateView() {
    //if there is multiple channel is already added and then you toggle the consistent ambient temperature
    // you have tho remove the extra channel from the data
    let no_of_ch = this.currentPayload?.channels?.length;
    if (
      no_of_ch != undefined &&
      !this.currentPayload?.isConAmTe &&
      no_of_ch > 1
    ) {
      this.currentPayload?.channels?.splice(1, no_of_ch - 1);
      if (this.selectedTestChamber.maxNoOfChannels > 1) {
        this.isAddChBtnDisabled = false;
      }
      this.isRemChBtnDisabled = true;
      this.updateAvChannels();
    }
  }

  removeChannel() {
    let popedItem = this.allSelectedChannel.pop();
    //console.log(popedItem);
    if (this.allSelectedChannel.length <= 1) {
      this.isRemChBtnDisabled = true;
    }
    if (
      this.allSelectedChannel.length < this.selectedTestChamber.maxNoOfChannels
    ) {
      this.isAddChBtnDisabled = false;
    }

    this.updateAvChannels();
    this.fixAddRemChBtnStatus();
  }

  updateAvChannels() {
    for (let currentChannel of this.allSelectedChannel) {
      let availableChannels = [];
      let usedChannels = [];
      for (let ch_info of this.allSelectedChannel) {
        usedChannels.push(ch_info.channelNumber);
      }
      for (let i = 1; i <= this.selectedTestChamber.maxNoOfChannels; i++) {
        if (!usedChannels.includes(i) || currentChannel.channelNumber == i) {
          availableChannels.push(i);
        }
      }
      currentChannel.availableChannels = availableChannels;
      //console.log(availableChannels);
    }
    //console.log(this.allSelectedChannel);
  }

  save() {
    this.showSpinnerButton = true;
    const currentTest: Test = { testConfig: this.currentPayload, testScheduleDate:this.scheduledDate };
    this._testChamberService
      .createTest(this.selectedTestChamber._id, currentTest)
      .subscribe((data) => {
        //success
        this.showSpinnerButton = false;
        console.log(data);
      });
  }

  update() {}

  fieldResolve(
    field_id: number,
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
          currentTestFormat.fields[0].value == 'Rest'
        ) {
          currentTestFormat.fields[1].visibility = false; //at
          currentTestFormat.fields[2].visibility = false; //value
          currentTestFormat.fields[3].visibility = false; //C|A|W
        } else {
          currentTestFormat.fields[1].visibility = true; //at
          currentTestFormat.fields[2].visibility = true; //value
          currentTestFormat.fields[3].visibility = true; //C|A|W
          if (
            currentTestFormat.fields[0].value == 'Hold'
          ) {
            (
              currentTestFormat.fields[3] as SelectField
            ).options = ['V'];
            currentTestFormat.fields[3].value = 'V';
          } else {
            (
              currentTestFormat.fields[3] as SelectField
            ).options = ['C', 'A', 'W'];
            currentTestFormat.fields[3].value = 'C';
          }
        }
      }
    } else if (currentTestFormat.value == 2) {
    } else {
    }
  }

  logData(data?: any) {
    console.log(this.allSelectedChannel);
  }
}
