import { Test } from './Test';

//what you get from the back end
export interface _TestChamber {
  _id?:string;//ObjectId from mongodb gets parsed as string
  name?: String;
  controller?: String;
  version?: String;
  about?: String;
  maxTemp?: Number; //in °C
  minTemp?: Number; //in °C
  location?: String;
  assignedUsers?: { _id: any; accessType: 'admin' | 'write' | 'read' }[];//could be present if the user is admin to this chamber, otherwise this won't be present
  testPerformed?: Test[];
  createdOn?:Date,
  maxNoOfChannels?:Number,
  isConnected?:Boolean,
  lastSeen?:Date,
  accessType?:'admin'|'write'|'read',//only specific to front end
}

//what you need to send while creating a new chamber
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
  createdOn:Date|undefined;
  maxNoOfChannels:Number|undefined;
  isConnected:Boolean|undefined;

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
    this.createdOn = chmDetails.createdOn;
    this.maxNoOfChannels = chmDetails.maxNoOfChannels;
    this.isConnected = chmDetails.isConnected;
  }
}
