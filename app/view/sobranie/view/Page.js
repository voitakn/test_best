Ext.define('Tlapp.apps.sobranie.view.Page', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.apps-sobranie-list',
    id: 'tab-apps_sobranie_list',
    closable: true,
    autoRender: true,
    requires: [
        'Tlapp.apps.sobranie.view.Filter',
        'Tlapp.apps.sobranie.view.Grid'
    ],
    title: 'Список возвещателей',
    layout: 'fit',
    initComponent: function() {
        this.items = {
            layout: 'border',
            border: true,
            items:[
                {
                    xtype: 'sobranie-view-filter'
                },
                {
                    xtype: 'sobranie-view-grid'
                }
            ]
        };
        this.callParent(arguments);
    }
});