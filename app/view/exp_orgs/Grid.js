Ext.define('TT.view.exp_orgs.Grid', {
    extend: 'TT.view.base.grid.Panel',
    alias: 'widget.exp-orgs-grid',
    requires: [
        'TT.view.exp_orgs.store.Orgs'
    ],
    bodyBorder: false,
    margin: '5 5 5 5',
    columns: [
        {header: 'ID',  dataIndex: 'id', width: 50},
        {
            xtype:'actioncolumn',
            width: 50,
            items: [{
                icon: '/ext/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                tooltip: 'Редактировать',
                handler: 'itemEdit'
            }]
        },
        {header: 'Наименование организации',  dataIndex: 'title_org', width: 250},
        {header: 'Залы',  dataIndex: 'holls', width: 150},
        {header: 'Телефон', dataIndex: 'phone', width: 150},
        {header: 'Сотрудник', dataIndex: 'worker', width: 150},
        {header: 'Адрес', dataIndex: 'adres', flex: 1}
    ],
    initComponent: function() {
        this.store = Ext.data.StoreManager.lookup('exp_orgs_store') || Ext.create('TT.view.exp_orgs.store.Orgs');
        this.store.load({
            params: {},
            scope: this
        });

        this.callParent(arguments);
    }
});