Ext.define('TT.view.exp_orgs.Filter', {
    extend: 'TT.view.base.panel.Filter',
    alias: 'widget.exp-orgs-filter',
    reqires: [
        'TT.view.exp_orgs.Controller',
        'TT.view.exp_orgs.HollsFilter'
    ],
    controller: 'exp_orgs',
    tbar: [
        { xtype: 'button', text: 'Добавить', handler: 'itemForm'}
    ],
    initComponent: function() {
        this.items = [
            {
                xtype: 'exp-orgs-holls-filter',
                controller: 'exp_orgs',
                margin: 5
            }
        ];
        this.callParent(arguments);
    }
});