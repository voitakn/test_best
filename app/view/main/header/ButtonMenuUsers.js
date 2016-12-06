Ext.define('TT.view.main.header.ButtonMenuUsers', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.view-main-header-button-menu-users',
    baseCls: '',
    margin: 0,
    width: 166,
    componentCls: 'dropdown-menu default-drop-menu menu-users',
    initComponent: function() {
        this.items = [{
            width: 166,
            disabledCls: '',
            handler: 'onShowProfiles',
            renderTpl: [
                '<li><a href="#"><i class="fa fa-user"></i> Мой профиль</a></li>'
            ]
        },{
            width: 166,
            disabledCls: '',
            handler: 'onLogin',
            renderTpl: [
                '<li><a href="#login"><i class="fa fa-power-off"></i> Логин</a></li>'
            ]
        }];
        this.callParent(arguments);
    }
});