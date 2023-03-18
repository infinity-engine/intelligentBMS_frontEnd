import { PayLoad, TestFormat } from './FormFields';
export interface TestResultLight {
  channelId?: number;
  testMethod?: string;
  testNumber?: string;
  testName?: string;
  testId?: any;
  testStartDate?: Date | any;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  isCompleted?: boolean;
  connectionStatus?: 'Connected' | 'Disconnected';
  testDetails?: string;
}
export interface _TestResultLight {
  _id?: string;
  chamberName?: string;
  chamberId?: string;
  testName?: string;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  channels?: TestChannel[];
}

export interface TestChannel {
  channelNo: number;
  statusCh: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  chMultiplierIndex: number;
  chMultiplier: number;
  onRows: number;
  totalRows: number;
  statusRow: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  rowMultiplierIndex: number;
  rowMultiplier: number;
}
export interface TestChannelDeep {
  channelNumber: number;
  status: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  currentMultiplierIndex: number;
  multiplier: number;
  testFormats: TestFormat[];
  rows: RowInfo[];
}
export interface _TestResultDeep {
  _id?: string;
  chamberName?: string;
  chamberId?: string;
  testName?: string;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  channels: TestChannelDeep[];
  accessType: 'admin' | 'read' | 'write';
}

interface MeasuredParameters {
  current: number[];
  voltage: number[];
  chamberTemp: number[];
  chamberHum: number[];
  cellTemp: number[][];
  time: number[];
}

interface RowInfo {
  rowNo: number;
  measuredParameters: MeasuredParameters;
  derivedParameters: any;
  status: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
  currentMultiplierIndex?: number;
  multiplier?: number;
}

interface Channel {
  rows: RowInfo[];
  channelNo: number;
  status: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
  currentMultiplierIndex?: number;
  multiplier?: number;
}

export interface TestResultDocument {
  channels: Channel[];
}

export interface TestResultDeep {
  'Charge/discharge experiment'?: {
    testMethod?: 'Charge/discharge experiment';
    channelId?: number;
    testId?: any;
    testName?: string;
    testNumber?: string;
    operatingTemperature?: number;
    maxVoltage?: number;
    minVoltage?: number;
    currentRate?: number;
    operatingTemperatureUnit?: string;
    voltageUnit?: string;
    currentUnit?: string;
    isToBeScheduled?: boolean;
    status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
    scheduledOn?: Date;
    isConnected?: boolean;
    connectionStatus?: 'Connected' | 'Disconnected';
    testStartDate?: Date | any;
    testEndDate?: Date | any;
    data?: {
      current?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
      voltage?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
      ambientTemperature?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
      cellTemperature?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
        sensorPosition?: any;
      }[];
      chargeFlow?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
    };
    isCompleted?: boolean;
    result?: {
      cyclicEfficiency?: { value?: number; unit?: string };
      chargeRating?: { value?: number; unit?: string };
      dischargeRating?: { valu?: number; unit?: string };
    };
  };
  'Pulse charging'?: {
    testMethod?: 'Charge/discharge experiment';
    testName?: string;
    channelId?: number;
    testId?: any;
    testNumber?: string;
    operatingTemperature?: number;
    maxVoltage?: number;
    minVoltage?: number;
    currentRate?: number;
    frequency?: number;
    dutyRatio?: number;
    operatingTemperatureUnit?: string;
    voltageUnit?: string;
    currentUnit?: string;
    frequencyUnit?: string;
    dutyRatioUnit?: string;
    isToBeScheduled?: boolean;
    status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled';
    scheduledOn?: Date;
    isConnected?: boolean;
    connectionStatus?: 'Connected' | 'Disconnected';
    data?: {
      current?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
      voltage?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
      ambientTemperature?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
      cellTemperature?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
        sensorPosition?: any;
      }[];
      chargeFlow?: {
        yValue?: number[];
        xvalue?: number[];
        yUnit?: string;
        xUnit?: string;
      };
    };
    isCompleted?: boolean;
    result?: {
      cyclicEfficiency?: { value?: number; unit?: string };
      chargeRating?: { value?: number; unit?: string };
      dischargeRating?: { valu?: number; unit?: string };
    };
  };
}
