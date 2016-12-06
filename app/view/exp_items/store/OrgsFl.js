Ext.define('TT.view.exp_items.store.OrgsFl', {
    extend: 'Ext.data.Store',
    alias: 'widget.store-orgs-fl',
    requires: 'TT.view.exp_items.model.OrgFl',
    model: 'TT.view.exp_items.model.OrgFl',
    storeId: 'exp_orgs_fl_store'
});