Ext.define('TT.view.exp_holls.Grid', {
    extend: 'TT.view.base.grid.Panel',
    alias: 'widget.exp-holls-view-grid',
    requires: [
        'TT.view.exp_holls.store.Holls'
    ],
    bodyBorder: false,
    margin: '5 5 5 5',
    columns: [
        /*{xtype: 'rownumberer', header: '№', width: 50},*/
        {header: 'ID',  dataIndex: 'id', width: 50},
        {header: 'Зал',  dataIndex: 'title_holl', flex: 1}
    ],
    initComponent: function() {
        this.store = Ext.data.StoreManager.lookup('exp_holls_store') || Ext.create('TT.view.exp_holls.store.Holls');
        this.callParent(arguments);
    }
});