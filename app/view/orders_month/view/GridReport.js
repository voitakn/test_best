Ext.define('Tlapp.apps.orders_month.view.GridReport', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.orders-month-view-gridreport',
    title : 'Отчет собрания',
    region: 'east',
    width: 500,
    split: true,
    collapsible: true,
    store: 'Tlapp.apps.orders_month.store.Reports',
    columns: [
        {header: 'Кол.', dataIndex: 'numbs', align: 'center', width: 50},
        {header: 'Под.', dataIndex: 'pp', align: 'center', xtype : 'checkcolumn', width: 45},
        {header: 'Общ.', dataIndex: 'op', align: 'center', xtype : 'checkcolumn', width: 45},
        {header: 'Кни.', dataIndex: 'kni', align: 'center', width: 45},
        {header: 'Бро.', dataIndex: 'bro', align: 'center', width: 75},
        /*{header: 'Бук', dataIndex: 'buk', align: 'center', width: 50},*/
        {header: 'Час', dataIndex: 'chas', align: 'center', width: 75},
        {header: 'Жур.',  dataIndex: 'jur', align: 'center', width: 45},
        {header: 'Пов.',  dataIndex: 'pov', align: 'center', width: 75},
        {header: 'Из.',  dataIndex: 'izb', align: 'center', width: 45}
    ]
});