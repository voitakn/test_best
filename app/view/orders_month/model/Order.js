Ext.define('Tlapp.apps.orders_month.model.Order', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'us_id',  type: 'int'},
        {name: 'fio',  type: 'string'},
        {name: 'tel',  type: 'string'},
        {name: 'mob',  type: 'string'},
        {name: 'id',  type: 'int'},
        {name: 'userid',  type: 'int'},
        {name: 'num_mes',  type: 'int'},
        {name: 'ord_mes',  type: 'int'},
        {name: 'mes',  type: 'string'},
        {name: 'god',  type: 'string'},
        {name: 'kni',  type: 'int'},
        {name: 'bro',  type: 'int'},
        {name: 'buk',  type: 'int'},
        {name: 'chas',  type: 'int'},
        {name: 'jur',  type: 'int'},
        {name: 'pov',  type: 'int'},
        {name: 'izb',  type: 'int'},
        {name: 'prim',  type: 'string'},
        {name: 'pp',  type: 'boolean', defaultValue: false},
        {name: 'op',  type: 'boolean', defaultValue: false}
    ]
});