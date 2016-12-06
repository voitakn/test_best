Ext.define('TT.view.main.header.ButtonMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.view-main-header-button-menu',
    baseCls: '',
    margin: 0,
    width: 268,
    requires: [
        'TT.view.main.header.ButtonMenuItems'
    ],
    componentCls: 'dropdown-menu notification default-drop-menu',
    initComponent: function() {
        this.items = [{
            width: 268,
            disabled: true,
            disabledCls: '',
            style: {
                cursor: 'default'
            },
            renderTpl: [
                '<li class="dropdown-title">'+
                    '<span>' +
                        '<i class="fa fa-bell"></i>' +
                        '<span class="header-count"></span>Уведомление' +
                    '</span>'+
                '</li>'
            ]
        },{
            width: 268,
            disabledCls: '',
            renderTpl: [
                '<li class="footer">' +
                    '<a href="#">Просмотр всех уведомлений<i class="fa fa-arrow-circle-right"></i></a>' +
                '</li>'
            ]
        }];
        this.callParent(arguments);
    }
});
