Ext.define('TT.view.main.MainButton', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-main-button',
    header: false,
    width: '100%',
    componentCls: 'mini-menu-button-style',
    height: 50,
    requires: [
        'TT.view.base.Menu',
        'TT.view.base.Button',
        'TT.view.base.MenuItem'
    ],
    layout: 'auto',
    initComponent: function() {
        var menu = this.menuButton? {xtype: 'menu'}: false;
        var handler = this.menuButton? 'onToggleMenu': 'onToggleButton';
        var buttonToggle = this.menuButton? 'mainMenuToggle': 'mainMenuButton';
        this.items = [{
            xtype: 'button',
            width: '100%',
            enableToggle: true,
            height: 45,
            toggleGroup: buttonToggle,
            text: this.textButton,
            toggleState: false,
            baseCls: false,
            autoEl: {
                tag: 'li',
                hidefocus: 'on',
                unselectable: 'on'
            },
            disabledCls: 'active',
            iconCls: this.iconCls,
            componentCls: 'li-sidebar-menu-default-style',
            renderTpl:
                '<a id="{id}-btnInnerEl" role="presentation" unselectable="on" ' +
                'class="{innerCls} {innerCls}-{ui}{childElCls}">' +
                    '<i class="{iconCls}"></i>' +
                    '<span class="menu-text">{text}</span>' +
                '</a>',
            module: this.module,
            listeners: {
                toggle: handler
            },
            menu: menu
        }];
        if (this.menuButton) {
            this.items.push({
                xtype: 'base-menu',
                bodyMenuModule: 'toggle',
                width: '100%',
                plain: true,
                hidden: true,
                floating: false,
                defaults: {
                    padding: '5 15',
                    handler: 'onSelectedModule',
                    xtype: 'base-menu-item',
                    listeners: {
                        click: 'onMenuItemsClick'
                    }
                },
                items: this.menuButton
            })
        }
        this.callParent(arguments);
    }
});
