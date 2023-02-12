export interface Test{
    _id?: any;
    testConfig: any;
    testResult?: any;
    isComplete?: Boolean;
    testStartDate?: Date;
    testEndDate?: Date;
    testCreationDate?:Date;
    status?: 'Completed' | 'Running' | 'Scheduled' | 'Stopped' | 'Paused';
    isConnected?: Boolean;
    lastSeen?:Date;
  }