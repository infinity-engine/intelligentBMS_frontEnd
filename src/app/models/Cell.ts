import { _UserLight } from './../services/user.service';
export interface Cell {
  _id?: string;
  cellName?: string;
  cellQuantity?: Number; //should not be presetn on api schema
  manufacturer?: string;
  batchNo?: string;
  type?: string;
  formFactor?: string;
  cellChemistry?: string;
  nomVolt?: Number;
  nomCap?: Number;
  nomCurr?: Number;
  maxVolt?: Number;
  minVolt?: Number;
  users?: any[];
  accessType?: string;
  assignedUsers?: _UserLight[];
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
