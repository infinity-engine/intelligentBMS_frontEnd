import { _UserLight } from './../services/user.service';

//what you get from the back end
export interface _TestChamber {
  _id?: string; //ObjectId from mongodb gets parsed as string
  name?: string;
  controller?: string;
  version?: string;
  about?: string;
  maxTemp?: number; //in °C
  minTemp?: number; //in °C
  location?: string;
  assignedUsers?: _UserLight[]; //could be present if the user is admin to this chamber, otherwise this won't be present
  testPerformed?: { testId: string }[];
  createdOn?: Date;
  maxNoOfChannels?: number;
  isConnected?: Boolean;
  lastSeen?: Date;
  accessType?: 'admin' | 'write' | 'read'; //only specific to front end
}

//what you need to send while creating a new chamber
export class TestChamber {
  constructor(
    public _id?: string,
    public name?: string,
    public controller?: string,
    public version?: string,
    public about?: string,
    public maxTemp?: number,
    public minTemp?: number,
    public location?: string,
    public assignedUsers?: any,
    public maxNoOfChannels?: number
  ) {
    this.maxNoOfChannels = 1;
  }
}
