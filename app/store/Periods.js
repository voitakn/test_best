Ext.define('TT.store.Periods', {
    extend: 'Ext.data.Store',
    alias: 'widget.store-periods',
    requires: 'TT.model.Period',
    model: 'TT.model.Period',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/periods.php?get_list'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});