Ext.define('TT.view.exp_orgs.store.Orgs', {
    extend: 'Ext.data.Store',
    alias: 'widget.store-orgs',
    requires: 'TT.view.exp_orgs.model.Org',
    model: 'TT.view.exp_orgs.model.Org',
    storeId: 'exp_orgs_store',
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/orgs.php?get_list',
            update: '/php/orgs.php?edit',
            create: '/php/orgs.php?edit'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});