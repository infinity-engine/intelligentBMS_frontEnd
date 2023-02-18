export interface Cell{
    _id?:String,
    cellName?:String,
    cellQuantity?:Number,//should not be presetn on api schema
    manufacturer?:String,
    batchNo?:String,
    type?:String,
    formFactor?:String,
    cellChemistry?:String,
    nomVolt?:Number,
    nomCap?:Number,
    nomCurr?:Number,
    maxVolt?:Number,
    minVolt?:Number,
    users?:any[],
}

export class CellClass implements Cell {
    constructor(
      public _id?: string,
      public cellName?: string,
      public nomVolt?: number,
      public nomCap?: number,
      public manufacturer?: string,
      public cellQuantity?: number,
      public batchNo?: string,
      public type?: string,
      public formFactor?: string,
      public cellChemistry?: string,
      public nomCurr?: number,
      public maxVolt?: number,
      public minVolt?: number
    ) {}
  }