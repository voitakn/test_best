Ext.define('TT.view.main.MainBody', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-main-body',
    layout: 'fit',
    margin: '1',
    controller: 'main',
    html: 'MainBody',
    initComponent: function() {
        this.callParent(arguments);
    }
});
