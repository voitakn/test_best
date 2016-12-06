Ext.define('Tlapp.apps.orders_month.view.Grid', {
    extend: 'Tlapp.view.Grid',
    alias: 'widget.orders-month-view-grid',
    title : 'Отчеты по месяцам',
    store: 'Tlapp.apps.orders_month.store.Orders',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            autoCancel: true
        })
    ],
    selType: 'rowmodel',
    columns: [
        {xtype: 'rownumberer', header: '№', width: 50},
        {header: 'ФИО',  dataIndex: 'fio', flex: 1,  width: 120},
        {header: 'Кни', dataIndex: 'kni', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value){ return value > 0 ? value : '';}
        },
        {header: 'Бро', dataIndex: 'bro', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value){ return value > 0 ? value : '';}
        },
        /*{header: 'Бук', dataIndex: 'buk', align: 'center', width: 60, editor: 'numberfield',
         renderer: function(value){ return value > 0 ? value : '';}
         },*/
        {header: 'Час', dataIndex: 'chas', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value)
            {
                if(value == 0)
                {
                    return '<div style="background: #ffcccf;"><b>'+value+'</b></div>';
                }
                return '<b>'+value+'</b>';
            }
        },
        {header: 'Жур',  dataIndex: 'jur', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value){ return value > 0 ? value : '';}
        },
        {header: 'Повт',  dataIndex: 'pov', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value){ return value > 0 ? value : '';}
        },
        {header: 'Изуч',  dataIndex: 'izb', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value){ return value > 0 ? value : '';}
        },
        {header: 'Подс', dataIndex: 'pp', align: 'center', xtype : 'checkcolumn', width: 50, editor: 'checkboxfield'},
        {header: 'Общ', dataIndex: 'op', align: 'center', xtype : 'checkcolumn', width: 50, editor: 'checkboxfield'},
        {header: 'Отчетный мес.', dataIndex: 'ord_mes', align: 'center', width: 60, editor: 'numberfield',
            renderer: function(value){ return value > 0 ? value : '';}
        },
        {header: 'Примечание', dataIndex: 'prim', width: 150, editor: 'textfield'},
        {header: 'Mob.', dataIndex: 'mob', width: 150}
    ]
});