export interface CellTemplate {
  _id: String;
  templateName: string;
  manufacturer?: string;
  nomVoltage: number; //in V
  nomCurrent?: number; //in A
  nomCapacity: number; //in mAh
  maxVoltage?: number; //in V
  minVoltage?: number; //in V
  formFactor?: string;
  cellChemistry?: string;
  type?: string; //Pouch,Cyclindrical,Prismatic
}