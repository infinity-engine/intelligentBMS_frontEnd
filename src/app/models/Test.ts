export interface Test{
    _id?: any;
    testConfig: any;
    testResult?: any;
    isComplete?: Boolean;
    testScheduleDate?:Date;
    testStartDate?: Date;//actual date on which chamber starts to execute the exp
    testEndDate?: Date;
    createdOn?:Date;
    status?: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
  }