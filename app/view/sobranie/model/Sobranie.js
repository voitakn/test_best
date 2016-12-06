Ext.define('Tlapp.apps.sobranie.model.Sobranie', {
    extend: 'Ext.data.Model',
    fields: ['id', 'fio', 'pol', 'adr', 'tel', 'mob', 'data_r', 'data_k', 'po_do',
        {name: 'st', type: 'boolean', defaultValue: false},
        {name: 'sp', type: 'boolean', defaultValue: false},
        {name: 'op', type: 'boolean', defaultValue: false},
        {name: 'arhive', type: 'boolean', defaultValue: false},
        {name: 'pk', type: 'boolean', defaultValue: false}
    ]
});