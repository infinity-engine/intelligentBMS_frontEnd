export interface DeviceDataLight{
    id:string,
    name:string,
    soc:number,
    soh:number,
    packVoltage:number,
    packCurrent:number,
    averageTemperature:number,
    chargeDischargeStatus:'idle'|'charging'|'discharging',
    packCondition:'poor'|'moderate'|'good',
    lastOnline:any,
    timeStamp:any
}