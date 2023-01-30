export class SelectField {
  value?: any;
  type: string = 'select';
  constructor(
    public id: number,
    public options: any[],
    public visibility: boolean = true,
    public template_width: number = 1
  ) {
    this.value = this.options[0];
  }
}
export class TextField {
  type: string = 'text';
  constructor(
    public id: number,
    public value: 'at' | 'for',
    public visibility: boolean = true,
    public template_width: number = 1
  ) {}
}
export class InputField {
  type: string = 'input';
  constructor(
    public id: number,
    public value: any = null,
    public visibility: boolean = true,
    public template_width: number = 1
  ) {}
}
export interface Fields {
  id: number;
  fields: (SelectField | TextField | InputField)[];
  mulitiplier: number;
}
export class TestFormat {
  children: Fields[] = [];
  constructor(public name: string, public value: number) {}
}
const testFormats: any = [
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
          },
          {
            id: 2,
            type: 'text',
            value: 'at',
            visibility: true,
            template_width: 1,
          },
          {
            id: 3,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          },
          {
            id: 4,
            type: 'select',
            options: ['C', 'A', 'W'],
            value: 'C',
            visibility: true,
            template_width: 2,
          },
          {
            id: 5,
            type: 'text',
            value: 'for',
            visibility: true,
            template_width: 1,
          },
          {
            id: 6,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          },
          {
            id: 7,
            type: 'select',
            options: ['hours.', 'minutes.', 'seconds.'],
            value: 'hours.',
            visibility: true,
            template_width: 2,
          },
        ],
        multiplier: 1,
      },
    ],
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
          },
          {
            id: 2,
            type: 'text',
            value: 'at',
            visibility: true,
            template_width: 1,
          },
          {
            id: 3,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          },
          {
            id: 4,
            type: 'select',
            options: ['C', 'A', 'W'],
            value: 'C',
            visibility: true,
            template_width: 2,
          },
          {
            id: 5,
            type: 'text',
            value: 'until',
            visibility: true,
            template_width: 1,
          },
          {
            id: 6,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          },
          {
            id: 7,
            type: 'text',
            value: 'volt.',
            visibility: true,
            template_width: 2,
          },
        ],
        multiplier: 1,
      },
    ],
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
          },
          {
            id: 2,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 2,
          },
          {
            id: 3,
            type: 'text',
            value: 'for',
            visibility: true,
            template_width: 1,
          },
          {
            id: 4,
            type: 'input',
            value: null,
            visibility: true,
            template_width: 3,
          },
          {
            id: 5,
            type: 'select',
            options: ['seconds.', 'kms.'],
            value: 'seconds.',
            visibility: true,
            template_width: 2,
          },
        ],
        multiplier: 1,
      },
    ],
  },
];

export { testFormats };
