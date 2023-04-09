import { PayLoad, TestFormat } from './FormFields';

export interface _TestResultLight {
  _id?: string;
  createdOnChamber?: string;
  chamberName?: string;
  testName?: string;
  testDescription?: string;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  channels?: TestChannel[];
  createdOn?: Date;
}

export interface TestChannel {
  channelNo: number;
  statusCh: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  chMultiplierIndex: number;
  chMultiplier: number;
  onRows?: number;
  totalRows?: number;
  statusRow?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  rowMultiplierIndex?: number;
  rowMultiplier?: number;
}
export interface TestChannelDeepChannel {
  channelNumber: number;
  status: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  currentMultiplierIndex: number;
  multiplier: number;
  testFormats: TestFormat[];
  rows?: RowInfo[];
  chStartDate?: Date;
  chEndDate?: Date;
}
export interface _TestResultDeep {
  _id?: string;
  chamberName?: string;
  createdOnChamber?: string;
  testName?: string;
  testDesc?: string;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  channels: TestChannelDeepChannel[];
  accessType: 'admin' | 'read' | 'write';
  testStartDate?: Date;
  testEndDate?: Date;
  testScheduleDate?: Date;
}

export interface MeasuredParameters {
  current?: number[];
  voltage?: number[];
  chamberTemp?: number[];
  chamberHum?: number[];
  cellTemp?: SensorObj[];
  time?: number[];
}
export interface SensorObj {
  sensorId: number;
  values: number[];
}

export interface RowInfo {
  rowNo: number;
  measuredParameters?: MeasuredParameters;
  derivedParameters?: any;
  status: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
  currentMultiplierIndex: number;
  multiplier: number;
  rowStartDate?: Date;
  rowEndDate?: Date;
}

export interface Channel {
  rows?: RowInfo[];
  channelNo: number;
  status: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
  currentMultiplierIndex?: number;
  multiplier?: number;
}

export interface TestResultDocument {
  channels: Channel[];
}

export interface QuickResponseMeasurement {
  channelNo: Number;
  statusCh: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  measuredParameters: MeasuredParameters;
}
