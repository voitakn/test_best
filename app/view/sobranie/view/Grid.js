Ext.define('Tlapp.apps.sobranie.view.Grid', {
    extend: 'Tlapp.view.Grid',
    alias: 'widget.sobranie-view-grid',
    title : 'Список возвешателей',
    store: 'Tlapp.apps.sobranie.store.Sobranies',
    selType: 'checkboxmodel',
    open_sdata: [],
    selModel: Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function(sm, selections) {
                console.log(sm);
                console.log(selections);
                console.log(this.view);
                this.view.open_sdata = selections;
            }
        }
    }),
    columns: [
        {xtype: 'rownumberer', header: '№', width: 50},
        {header: 'ФИО',  dataIndex: 'fio', flex: 1, width: 250},
        {header: 'Mob.', dataIndex: 'mob', width: 150},
        {header: 'Телефон', dataIndex: 'tel', width: 150},
        {header: 'Адрес', dataIndex: 'adr', width: 150},
        {header: 'Дата рожд.', dataIndex: 'data_r'},
        {header: 'Дата крещ.', dataIndex: 'data_k'},
        {header: 'Общий', xtype : 'checkcolumn', dataIndex: 'op'},
        {header: 'Стар.', xtype : 'checkcolumn', dataIndex: 'st'},
        {header: 'Служ.', xtype : 'checkcolumn', dataIndex: 'sp'},
        {header: 'Архив.', xtype : 'checkcolumn', dataIndex: 'arhive'},
        {header: 'Искл.', xtype : 'checkcolumn', dataIndex: 'pk'}
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text:'S-21',
            handler: function(btn)
            {
                console.log(btn.up('grid'));
                var open_s = btn.up('grid').view.open_sdata;
                var url_text = [];
                for(var i=0; i<open_s.length; i++)
                {
                    var rowd = open_s[i];
                    url_text.push(rowd.data.id);
                }
                window.open('/php/s-21.php?s_21=['+url_text.toString()+']', '_blank');
            }
        }]
    }],
    onButtonClick: function(btn, scope)
    {
        console.log('onButtonClick');
        console.log(btn);
        console.log(scope);
    }
});