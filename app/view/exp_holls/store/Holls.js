Ext.define('TT.view.exp_holls.store.Holls', {
    extend: 'Ext.data.Store',
    alias: 'widget.store-holls',
    storeId: 'exp_holls_store',
    requires: 'TT.view.exp_holls.model.Holl',
    model: 'TT.view.exp_holls.model.Holl',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/holls.php?get_list',
            update: '/php/holls.php?edit',
            create: '/php/holls.php?edit'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});