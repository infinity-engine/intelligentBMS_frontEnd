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
  isAddChBtnDisabled: boolean = true;
  isRemChBtnDisabled: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.addChannel();
    if (this.maxNoOfChannel > 1) {
      this.isAddChBtnDisabled = false;
    }
  }

  addRow(ch_index: number) {
    //ch_index isn't necessarily channel number
    let selectedChannel: ChannelFields | undefined;
    let selectedTestFormat: TestFormat[] | undefined = undefined;
    let _allTestFormats: TestFormat[] = JSON.parse(JSON.stringify(testFormats)); //create deep copy of the object
    let currentSelectedFormat = _allTestFormats[0];//default one
    
    selectedChannel = this.allSelectedChannel[ch_index];
    selectedTestFormat = selectedChannel.testFormats;
    selectedChannel.allTestFormat.push(_allTestFormats);
    selectedTestFormat.push(currentSelectedFormat);

    if (selectedTestFormat.length > 1) {
      selectedChannel.isRemoveRowButtonDisabled = false;
    }else{
      selectedChannel.isRemoveRowButtonDisabled = true;
    }
    if (selectedTestFormat.length >= 10) {
      selectedChannel.isAddRowButtonDisabled = true;
    }else{
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

  addChannel() {
    // if no channel row is initially added.
    let availableChannels = [];
    let usedChannels = [];
    for (let ch_info of this.allSelectedChannel) {
      usedChannels.push(ch_info.channelNumber);
    }
    for (let i = 1; i <= this.maxNoOfChannel; i++) {
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

    this.addRow(this.allSelectedChannel.length-1);

    this.isRemChBtnDisabled = false;
    if (this.allSelectedChannel.length == this.maxNoOfChannel) {
      this.isAddChBtnDisabled = true;
    }
    console.log(this.allSelectedChannel);

  }
  removeChannel() {
    let popedItem = this.allSelectedChannel.pop();
    console.log(popedItem);
    if (this.allSelectedChannel.length == 1) {
      this.isRemChBtnDisabled = true;
    }
    if (this.allSelectedChannel.length < this.maxNoOfChannel) {
      this.isAddChBtnDisabled = false;
    }
  }

  updateAvChannels() {
    for (let currentChannel of this.allSelectedChannel) {
      let availableChannels = [];
      let usedChannels = [];
      for (let ch_info of this.allSelectedChannel) {
        usedChannels.push(ch_info.channelNumber);
      }
      for (let i = 1; i <= this.maxNoOfChannel; i++) {
        if (usedChannels.find((e) => e == i)) {
        } else {
          availableChannels.push(i);
        }
      }
      currentChannel.availableChannels = availableChannels;
      console.log(availableChannels);
    }
  }

  save() {
    console.log(this.allSelectedChannel);
  }

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
