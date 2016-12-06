Ext.define('TT.view.exp_items.Module', {
    extend: 'TT.view.base.panel.Panel',
    alias: 'widget.view-exp-items',
    requires: [
        'TT.view.exp_items.Controller',
        'TT.view.exp_items.ComboHolls',
        'TT.view.exp_items.ComboHollsFl',
        'TT.view.exp_items.ComboOrgsFl',
        'TT.view.exp_items.Filter',
        'TT.view.exp_items.Grid'
    ],
    controller: 'exp_items',
    layout: 'border',
    items: [
        {
            xtype: 'exp-items-filter',
            margin: 0
        },{
            xtype: 'panel',
            region: 'center',
            margin: '0 0 0 10',
            title : '<b>Приход / расход</b>',
            header: {
                itemPosition: 0,
                items: [
                    {
                        xtype: 'button',
                        text: 'Экспорт',
                        margin: '0 10 0 0',
                        handler: 'exportItems'
                    }
                ]
            },

            layout: 'fit',
            items: [{xtype: 'exp-items-grid'}]
        }
    ]
});