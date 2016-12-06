Ext.define('Tlapp.apps.orders_month.view.Page', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.apps-orders-month-list',
    id: 'tab-apps_orders_month_list',
    closable: true,
    autoRender: true,
    requires: [
        'Tlapp.apps.orders_month.view.Filter',
        'Tlapp.apps.orders_month.view.Grid',
        'Tlapp.apps.orders_month.view.GridReport'
    ],
    title: 'Отчеты по месяцам',
    layout: 'fit',
    initComponent: function() {
        this.items = {
            layout: 'border',
            border: true,
            items:[
                {
                    xtype: 'orders-month-view-filter'
                },{
                    region: 'center',
                    layout: 'border',
                    items: [
                        {
                            xtype: 'orders-month-view-grid'
                        },
                        {
                            xtype: 'orders-month-view-gridreport'
                        }
                    ]
                }
            ]
        };
        this.callParent(arguments);
    }
});