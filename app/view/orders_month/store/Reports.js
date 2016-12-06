Ext.define('Tlapp.apps.orders_month.store.Reports', {
    extend: 'Ext.data.Store',
    alias: 'widget.orders-month-store-reports',
    requires: 'Tlapp.apps.orders_month.model.Report',
    model: 'Tlapp.apps.orders_month.model.Report',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/orders_month.php?get_reports'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});