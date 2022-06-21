export interface TestResultLight{
    channelId?:number,
    testMethod?:string,
    testNumber?:string,
    testName?:string,
    testId?:any,
    testStartDate?:Date|any,
    status?:'Running' | 'Paused' | 'Stopped' | 'Scheduled' |'Completed',
    isCompleted?:boolean,
    connectionStatus?:'Connected'|'Disconnected',
    testDetails?:string
}

export interface TestResultDeep {
    'Cyclic voltammetry'?: {
        testMethod?: 'Cyclic voltammetry',
        channelId?:number,
        testId?: any,
        testName?:string,
        testNumber?: string,
        operatingTemperature?: number,
        maxVoltage?: number,
        minVoltage?: number,
        currentRate?: number,
        operatingTemperatureUnit?:string,
        voltageUnit?:string,
        currentUnit?:string,
        isToBeScheduled?: boolean,
        status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled' | 'Completed',
        scheduledOn?: Date,
        isConnected?: boolean,
        connectionStatus?: 'Connected' | 'Disconnected',
        testStartDate?:Date|any,
        testEndDate?:Date|any,
        data?: {
            current?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string },
            voltage?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string },
            ambientTemperature?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string },
            cellTemperature?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string, sensorPosition?: any }[],
            chargeFlow?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string }
        },
        isCompleted?: boolean,
        result?: {
            cyclicEfficiency?: { value?: number, unit?: string },
            chargeRating?: { value?: number, unit?: string },
            dischargeRating?: { valu?: number, unit?: string }
        }
    },
    'Pulse charging'?: {
        testMethod?: 'Cyclic voltammetry',
        testName?:string,
        channelId?:number,
        testId?: any,
        testNumber?: string,
        operatingTemperature?: number,
        maxVoltage?: number,
        minVoltage?: number,
        currentRate?: number,
        frequency?: number,
        dutyRatio?: number,
        operatingTemperatureUnit?:string,
        voltageUnit?:string,
        currentUnit?:string,
        frequencyUnit?:string,
        dutyRatioUnit?:string,
        isToBeScheduled?: boolean,
        status?: 'Running' | 'Paused' | 'Stopped' | 'Scheduled',
        scheduledOn?: Date,
        isConnected?: boolean,
        connectionStatus?: 'Connected' | 'Disconnected',
        data?: {
            current?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string },
            voltage?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string },
            ambientTemperature?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string },
            cellTemperature?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string, sensorPosition?: any }[],
            chargeFlow?: { yValue?: number[], xvalue?: number[], yUnit?: string, xUnit?: string }
        },
        isCompleted?: boolean,
        result?: {
            cyclicEfficiency?: { value?: number, unit?: string },
            chargeRating?: { value?: number, unit?: string },
            dischargeRating?: { valu?: number, unit?: string }
        }
    }
}