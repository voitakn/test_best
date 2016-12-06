Ext.define('Tlapp.apps.orders_month.model.Report', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'god',  type: 'string'},
        {name: 'ord_mes',  type: 'int'},
        {name: 'numbs',  type: 'int'},
        {name: 'kni',  type: 'int'},
        {name: 'bro',  type: 'int'},
        {name: 'buk',  type: 'int'},
        {name: 'chas',  type: 'int'},
        {name: 'jur',  type: 'int'},
        {name: 'pov',  type: 'int'},
        {name: 'izb',  type: 'int'},
        {name: 'pp',  type: 'boolean', defaultValue: false},
        {name: 'op',  type: 'boolean', defaultValue: false}
    ]
});