Ext.define('TT.view.main.container.Title', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-main-container-title',
    componentCls: 'row col-sm-12 page-header',
    height: 106,
    requires: [
        'TT.view.main.container.TitleMenu'
    ],
    setTitle: function(title) {
    },
    items: [{
       xtype: 'view-main-container-title-menu'
    }]
});
