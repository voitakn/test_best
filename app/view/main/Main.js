Ext.define('TT.view.main.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.viewmain',
    region: 'center',
    layout: 'border',
    requires: [
        'TT.view.main.MainController',
        'TT.view.main.MainHead',
        'TT.view.main.MainBody'
    ],
    controller: 'main',
    initComponent: function() {
        console.log('Main.initComponent');
        this.items = [
            {
                xtype: 'container',
                region: 'north',
                items: [
                    {
                        xtype: 'view-main-head'
                    }
                ]
            },{
                region: 'center',
                layout: 'fit',
                xtype: 'view-main-body'
            }
        ];
        this.callParent(arguments);
    }
});
