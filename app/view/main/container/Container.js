Ext.define('TT.view.main.container.Container', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-main-container',
    componentCls: 'main-content-default-style col-lg-12 container',
    id: 'content',
    region: 'center',
    layout: 'border',
    items: [{
        xtype: 'view-main-container-title',
        region: 'north'
    },{
        xtype: 'container',
        region: 'center',
        layout: 'border',
        itemId: 'main_container'
    }]
});
