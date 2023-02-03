export interface SelectField {
  value: any,
  type: string,
  id:number,
  options:string[],
  visibility:boolean,
  template_width:number,
}
export interface TextField {
  type: 'text',
  id:number,
  value:'at'|'for'|'Run'|'until'|'volt.',
  visibility:boolean,
  template_width:number
}
export interface InputField {
  type: 'input',
  id: number,
  value: any,
  visibility: boolean,
  template_width: number
}
export interface Fields {
  id: number;
  fields: (SelectField | TextField | InputField)[];
}
export interface TestFormat {
  children: Fields[],
  name: string, 
  value: number,
  multiplier:number
}

const testFormats: TestFormat[] = [
  {
    name: 'Do this for this long.',
    value: 1,
    children: [
      {
        id: 1,
        fields: [
          {
            id: 1,
            type: 'select',
            options: ['Charge', 'Discharge', 'Rest', 'Hold'],
            value: 'Charge',
            visibility: true,
            template_width: 2,
          } as SelectField,
          {
            id: 2,
            type: 'text',
            value: 'at',
            visibility: true,
            template_width: 1,
          } as TextField,
          {
            id: 3,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          } as InputField,
          {
            id: 4,
            type: 'select',
            options: ['C', 'A', 'W'],
            value: 'C',
            visibility: true,
            template_width: 2,
          } as SelectField,
          {
            id: 5,
            type: 'text',
            value: 'for',
            visibility: true,
            template_width: 1,
          } as TextField,
          {
            id: 6,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          } as InputField,
          {
            id: 7,
            type: 'select',
            options: ['hours.', 'minutes.', 'seconds.'],
            value: 'hours.',
            visibility: true,
            template_width: 2,
          } as SelectField,
        ],
        multiplier: 1,
      } as Fields,
    ],
    multiplier:1
  },
  {
    name: 'Do this until this happen.',
    value: 2,
    children: [
      {
        id: 1,
        fields: [
          {
            id: 1,
            type: 'select',
            options: ['Charge', 'Discharge'],
            value: 'Charge',
            visibility: true,
            template_width: 2,
          } as SelectField,
          {
            id: 2,
            type: 'text',
            value: 'at',
            visibility: true,
            template_width: 1,
          } as SelectField,
          {
            id: 3,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          } as InputField,
          {
            id: 4,
            type: 'select',
            options: ['C', 'A', 'W'],
            value: 'C',
            visibility: true,
            template_width: 2,
          } as SelectField,
          {
            id: 5,
            type: 'text',
            value: 'until',
            visibility: true,
            template_width: 1,
          } as TextField,
          {
            id: 6,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          } as InputField,
          {
            id: 7,
            type: 'text',
            value: 'volt.',
            visibility: true,
            template_width: 2,
          } as TextField,
        ],
        multiplier: 1,
      } as Fields,
    ],
    multiplier:1
  },
  {
    name: 'Run X.',
    value: 3,
    children: [
      {
        id: 1,
        fields: [
          {
            id: 1,
            type: 'text',
            value: 'Run',
            visibility: true,
            template_width: 1,
          } as TextField,
          {
            id: 2,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          } as InputField,
          {
            id: 3,
            type: 'text',
            value: 'for',
            visibility: true,
            template_width: 1,
          } as TextField,
          {
            id: 4,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 3,
          } as InputField,
          {
            id: 5,
            type: 'select',
            options: ['seconds.', 'kms.'],
            value: 'seconds.',
            visibility: true,
            template_width: 2,
          } as SelectField,
        ],
        multiplier: 1,
      } as Fields,
    ],
    multiplier:1
  },
];
export interface ChannelFields{
  channelNumber:number|undefined,
  cellID:string|undefined,
  testFormats:TestFormat[],
  allTestFormat:TestFormat[][],
  isRemoveRowButtonDisabled:boolean,
  isAddRowButtonDisabled:boolean,
  overallRowMultiplier:number,
  availableChannels:number[]|undefined
}

export { testFormats };
