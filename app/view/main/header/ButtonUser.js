Ext.define('TT.view.main.header.ButtonUser', {
    extend: 'Ext.button.Button',
    alias: 'widget.view-main-header-button-user',
    baseCls: '',
    requires: [
        'TT.view.main.header.ButtonMenu',
        'TT.view.main.header.ButtonMenuUsers'
    ],
    componentCls: 'dropdown user',
    renderTpl:
        '<a id="{id}-btnEl" href="#" class="dropdown-toggle" data-toggle="dropdown">' +
            '<img alt="" src="/icons/system-users_9896.png">' +
            '<span class="username">John Doe</span>' +
            '<i class="fa fa-angle-down"></i>' +
        '</a>',
    menu: {
        xtype: 'view-main-header-button-menu-users'
    },
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
    initComponent: function() {
        var self = this;
        this.setNameUser = function(name) {
            var el = self.getEl();
            var nameEl = el.query('.username', false)[0];
            nameEl.setHtml(name);
        };
        this.renderTpl =
            '<a id="{id}-btnEl" href="#" class="dropdown-toggle" data-toggle="dropdown">' +
                '<img alt="" src="/icons/system-users_9896.png">' +
                '<span class="username">' + Adm.user.nickname + '</span>' +
                '<i class="fa fa-angle-down"></i>' +
            '</a>';
        this.callParent(arguments);
    }
});