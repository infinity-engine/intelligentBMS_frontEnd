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
  testId?: string;
  chamberName?: string;
  testName?: string;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  channels?: TestChannel[];
}
let a = {
  testId: '123',
  chamberName: 'Test Chamber 1',
  testName: 'Basics 101',
  status: 'Running',
  channels: [
    { channelNo: 1, status: 'Completed', onRows: 2, totalRows: 2 },
    { channelNo: 1, status: 'Running', onRows: 3, totalRows: 6 },
  ],
};
export interface TestChannel {
  channelNo?: Number;
  status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed';
  onRows?: Number; //tells about on which rows the current experiment is going on
  totalRows?: Number; //gives how many total rows are there in a particular experiment
  progress?: Number;
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
