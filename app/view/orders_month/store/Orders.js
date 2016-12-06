Ext.define('Tlapp.apps.orders_month.store.Orders', {
    extend: 'Ext.data.Store',
    alias: 'widget.orders-month-store-orders',
    requires: 'Tlapp.apps.orders_month.model.Order',
    model: 'Tlapp.apps.orders_month.model.Order',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/orders_month.php?get_list',
            update: '/php/orders_month.php?save_data',
            create: '/php/orders_month.php?save_data'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});