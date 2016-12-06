Ext.define('TT.view.main.header.Button', {
    extend: 'Ext.button.Button',
    alias: 'widget.view-main-header-button',
    baseCls: '',
    requires: [
        'TT.view.main.header.ButtonMenu',
        'TT.view.main.header.ButtonMenuUsers'
    ],
    componentCls: 'dropdown',
    autoEl: {
        tag: 'li',
        hidefocus: 'on',
        unselectable: 'on'
    },
    listeners: {
        menushow: function(cmp) {
            cmp.addCls('open');
        },
        menuhide: function(cmp) {
            cmp.removeCls('open');
        }
    },
    renderTpl:
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
            '<i class="fa {iconCls}"></i>' +
            '<span class="badge"></span>' +
        '</a>',
    getTriggerRegion: function() {
        var me = this,
            region = me._triggerRegion,
            isRight = me.arrowAlign === 'right',
            getEnd = isRight ? 'getRight' : 'getBottom',
            btnSize = isRight ? me.getWidth() : me.getHeight();
        region.begin = btnSize - me.el[getEnd]();
        region.end = btnSize;
        return region;
    },
    getTotalMenuItems: function() {
        var el = this.getEl();
        var totalCont = el.query('.badge', false)[0];
        if (totalCont) {
            return totalCont.getHtml()
        }
        return false
    },
    setTotalMenuItems: function(total) {
        var el = this.getEl();
        var totalCont = el.query('.badge', false)[0];
        if (totalCont) {
            totalCont.setHtml(total);
        }
    },
    getMenuItems: function() {
        var menu = this.query('view-main-header-button-menu')[0];
        return menu.items;
    },
    setMenuItems: function(menu) {
        if (!menu) {
            return;
        }
        var menuEl = this.query('view-main-header-button-menu')[0];
        var menTTef = Ext.Array.clone(this._menTTefault);
        menuEl.removeAll();
        Ext.Array.each(menu, function(item, index) {
            menTTef.splice(index + 1, 0, item)
        });
        menuEl.add(menTTef);
        var collection = menuEl.items;
        this.setTotalMenuItems(collection.length - 2);
        this.setHeaderMenu(collection.length - 2);
    },
    delMenuItems: function(count) {
        var menuEl = this.query('view-main-header-button-menu')[0];
        var collection = menuEl.items;
        menuEl.remove(collection.getAt(count + 1));
        this.setTotalMenuItems(collection.length - 2);
        this.setHeaderMenu(collection.length - 2);
    },
    insertMenuItems: function(index, component) {
        var menuEl = this.query('view-main-header-button-menu')[0];
        menuEl.insert(index + 1, component);
        var collection = menuEl.items;
        this.setTotalMenuItems(collection.length - 2);
        this.setHeaderMenu(collection.length - 2);
    },
    setHeaderMenu: function(count) {
        var menu = this.getMenu();
        menu = menu.getEl();
        var headerCount = menu.query('.header-count', false)[0];
        headerCount.setHtml(count);
    },
    _menTTefault: [{
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
    }],
    initComponent: function() {
        var menu = Ext.Array.clone(this._menTTefault);
        if (this.menuBtn) {
            Ext.Array.each(this.menuBtn, function(item, index) {
                menu.splice(index + 2, 0, item)
            });
            this.menu = {
                xtype: 'view-main-header-button-menu'
            };
        }
        this.callParent(arguments);
    }
});