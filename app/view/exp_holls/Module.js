Ext.define('TT.view.exp_holls.Module', {
    extend: 'TT.view.base.panel.Panel',
    alias: 'widget.view-exp-holls',
    requires: [
        'TT.view.exp_holls.Controller',
        'TT.view.exp_holls.Grid'
    ],
    controller: 'exp_holls',
    layout: 'fit',
    title : '<b>Список залов</b>',
    tbar: [
        { xtype: 'button', text: 'Добавить' }
    ],
    items: [
        {
            xtype: 'exp-holls-view-grid'
        }
    ]
});