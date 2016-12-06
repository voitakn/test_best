Ext.define('TT.view.exp_orgs.store.HollsCheck', {
    extend: 'Ext.data.Store',
    alias: 'widget.exp-orgs-store-hollscheck',
    storeId: 'exp_orgs_store_holls_check',
    requires: 'TT.view.exp_orgs.model.HollCheck',
    model: 'TT.view.exp_orgs.model.HollCheck',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/holls.php?get_list_check'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});