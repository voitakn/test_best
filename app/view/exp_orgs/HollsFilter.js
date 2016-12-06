Ext.define('TT.view.exp_orgs.HollsFilter', {
    extend: 'TT.view.base.grid.Panel',
    alias: 'widget.exp-orgs-holls-filter',
    minWidth: 185,
    flex: 1,
    requires: [
        'TT.view.exp_orgs.Controller',
        'Ext.selection.CheckboxModel',
        'TT.view.exp_holls.store.Holls'
    ],
    deselectOnContainerClick: true,
    columns: [{header: 'Все Залы',  dataIndex: 'title_holl',  flex: 1}],
    initComponent: function() {
        this.store = Ext.data.StoreManager.lookup('exp_holls_store') || Ext.create('TT.view.exp_holls.store.Holls');
        this.store.load();
        this.selModel = {
            selType: 'checkboxmodel'
        };
        this.listeners = {
            cellClick: 'clickHolls',
            selectionchange: 'selectHolls'
        };
        this.callParent(arguments);
    }
});