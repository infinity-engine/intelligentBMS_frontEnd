import { PayLoad } from './FormFields';

export interface Test {
  _id?: string;
  testName?: string;
  testDesc?: string;
  testConfig?: any;
  testResult?: any;
  isComplete?: Boolean;
  testScheduleDate?: Date;
  testStartDate?: Date; //actual date on which chamber starts to execute the exp
  testEndDate?: Date;
  createdOn?: Date;
  status?: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
  forcedStatus?:
    | 'Completed'
    | 'Running'
    | 'Scheduled'
    | 'Stopped'
    | 'Paused'
    | null;
  createdOnChamber?: string; //mongoose object id
  createdByUser?: string; //mongoose object id
}
