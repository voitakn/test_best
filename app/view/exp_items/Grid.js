Ext.define('TT.view.exp_items.Grid', {
    extend: 'TT.view.base.grid.Panel',
    alias: 'widget.exp-items-grid',
    requires: [
        'TT.view.exp_items.store.Expenses'
    ],
    bodyBorder: false,
    margin: '5 5 5 5',
    columns: [
        {header: 'ID',  dataIndex: 'id', width: 50},
        {
            xtype:'actioncolumn',
            width: 50,
            items: [{
                icon: '/ext/examples/shared/icons/fam/cog_edit.png',
                tooltip: 'Редактировать',
                handler: 'itemEdit'
            }]
        },
        {header: 'Тип',  dataIndex: 'ex_type_name', width: 100},
        {header: 'Зал',  dataIndex: 'title_holl', width: 140,
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'Итого:';
            }},
        {
            header: 'Сумма',
            dataIndex: 'amount',
            width: 120,
            align: 'right',
            style: {
                fontWeight: 'bold'
            },
            summaryType: 'sum',
            renderer: Ext.util.Format.numberRenderer('0.00'),
            summaryRenderer: Ext.util.Format.numberRenderer('0.00')
        },
        {header: 'Дата',  dataIndex: 'create_date', width: 120},
        {header: 'Организация',  dataIndex: 'title_org', width: 200},
        {header: 'Назначение',  dataIndex: 'coment', flex: 1}
    ],
    features: [{
        ftype: 'summary',
        dock: 'top'
    }],
    initComponent: function() {
        var dt = new Date(),
            fdt = Ext.Date.getFirstDateOfMonth(dt),
            tdt = Ext.Date.getLastDateOfMonth(dt),
            date_from = Ext.Date.format(fdt, 'd-m-Y'),
            date_to = Ext.Date.format(tdt, 'd-m-Y');
        var params =
        this.store = Ext.data.StoreManager.lookup('exp_items_store') || Ext.create('TT.view.exp_items.store.Expenses');
        this.store.load({
            params: {
                date_from: date_from,
                date_to: date_to
            },
            scope: this
        });
        this.callParent(arguments);
    }
});