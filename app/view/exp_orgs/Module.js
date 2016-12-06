Ext.define('TT.view.exp_orgs.Module', {
    extend: 'TT.view.base.panel.Panel',
    alias: 'widget.exp-orgs',
    requires: [
        'TT.view.exp_orgs.Controller',
        'TT.view.exp_orgs.HollsFilter',
        'TT.view.exp_orgs.Filter',
        'TT.view.exp_orgs.Grid'
    ],
    controller: 'exp_orgs',
    layout: 'border',
    items: [
        {
            xtype: 'exp-orgs-filter'
        },{
            xtype: 'panel',
            region: 'center',
            title : '<b>Список организаций</b>',
            layout: 'fit',
            items: [{xtype: 'exp-orgs-grid'}]
        }
    ]
});