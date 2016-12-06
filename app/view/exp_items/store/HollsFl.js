Ext.define('TT.view.exp_items.store.HollsFl', {
    extend: 'Ext.data.Store',
    alias: 'widget.store-holls-fl',
    requires: 'TT.view.exp_items.model.HollFl',
    model: 'TT.view.exp_items.model.HollFl',
    storeId: 'exp_holls_fl_store'
});