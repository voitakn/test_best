Ext.define('Tlapp.apps.orders_month.view.Filter', {
    extend: 'Tlapp.view.Panel',
    alias: 'widget.orders-month-view-filter',
    initComponent: function() {
        console.log('Tlapp.apps.orders_month.view.Filter - init()');
        var store = Ext.create('Tlapp.store.Months');
        console.log(store.getCount());
        var items_radio = [];
        for(var i=0; i<store.getCount(); i++)
        {
            var row = store.getAt(i);
            items_radio.push({
                boxLabel: ' ['+row.get('num_mes')+'] '+row.get('text'),
                name: 'num_mes',
                inputValue: row.get('num_mes')
            });
        }
        this.items = [
            {
                xtype: 'fieldset',
                title: 'Отчетные месяцы',
                collapsible: false,
                margin: '10 5 10 5',
                items: [{
                    xtype: 'radiogroup',
                    columns: 1,
                    vertical: true,
                    items: items_radio
                }]

            }
        ];
        this.callParent(arguments);
    }
});