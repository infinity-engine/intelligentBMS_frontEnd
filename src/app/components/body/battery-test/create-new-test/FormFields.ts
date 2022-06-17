let testMethods =[
    {
        name:'Cyclic voltammetry',
        fields:[
            {name:'Test Number',type:'number',disabled:true},
            {name:'Operating Temperature (°C)',type:'number',disabled:false},
            {name:'Max-voltage (V)',type:'number',disabled:false},
            {name:'Min-voltage (V)',type:'number',disabled:false},
            {name:'Constant current rate (A)',type:'number',disabled:false}
        ],
        labels:[
            'It gets generated automatically.',
            'Provide the temperature (in °C) at which you want to carry out your test.',
            'Set the maximum voltage (in Volt) for the cell. Usually, it is provided by the manufacturer.',
            'Set the cut-off voltage (in Volt) for the cell. Usually, specified by the manufacturer',
            'Set the current (in Amps) at which you want to carry out the charging and discharging.'
        ]
    },
    {
        name:'Pulse charging',
        fields:[
            {name:'Test Number',type:'number',disabled:true},
            {name:'Operating Temperature (°C)',type:'number',disabled:false},
            {name:'Max-voltage (V)',type:'number',disabled:false},
            {name:'Min-voltage (V)',type:'number',disabled:false},
            {name:'Average current rate (A)',type:'number',disabled:false},
            {name:'Frequency (Hz)',type:'number',disabled:false},
            {name:'Duty ratio (%)',type:'number',disabled:false}
        ],
        labels:[
            'It gets generated automatically.',
            'Provide the temperature (in °C) at which you want to carry out your test.',
            'Set the maximum voltage (in Volt) for the cell. Usually, it is provided by the manufacturer.',
            'Set the cut-off voltage (in Volt) for the cell. Usually, specified by the manufacturer',
            'Set the current (in Amps) at which you want to carry out the charging and discharging.',
            'Set the frequency (in Hz)  for charging/rest period.',
            'Set the duty ratio (in percent) for charging/rest period.'
        ]
    }
]

export {testMethods}