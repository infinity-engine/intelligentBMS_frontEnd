export interface _TestChamber {
  name?: String;
  controller?: String;
  version?: String;
  about?: String;
  maxTemp?: Number; //in °C
  minTemp?: Number; //in °C
  location?: String;
  assignedUsers?: { _id: any; accessType: 'admin' | 'write' | 'read' }[];
  testPerformed?: {
    _id: any;
    testConfig: any;
    testResult: any;
    isComplete: Boolean;
    testStartDate: Date;
    testEndDate: Date;
    Status: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
    isConnected: Boolean;
  }[];
}
export class TestChamber {
  name: String | undefined;
  controller: String | undefined;
  version: String | undefined;
  about: String | undefined;
  maxTemp: Number | undefined;
  minTemp: Number | undefined;
  location: String | undefined;
  assignedUsers: any;
  testPerformed: any;

  constructor(chmDetails: _TestChamber) {
    this.name = chmDetails.name;
    this.controller = chmDetails.controller;
    this.version = chmDetails.version;
    this.about = chmDetails.about;
    this.maxTemp = chmDetails.maxTemp;
    this.minTemp = chmDetails.minTemp;
    this.location = chmDetails.location;
    this.assignedUsers = chmDetails.assignedUsers;
    this.testPerformed = chmDetails.testPerformed;
  }
}
