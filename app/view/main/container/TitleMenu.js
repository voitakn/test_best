Ext.define('TT.view.main.container.TitleMenu', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-main-container-title-menu',
    baseCls: '',
    requires: [
        'TT.view.main.container.TitleButton'
    ],
    componentCls: 'breadcrumb',
    setTitle: function(title) {
        var el = this.getEl();
        var titleEl = el.get('container-title-status');
        titleEl.setHtml(title);
    },
    initComponent: function() {
        var self = this;
        this.setMapLink = function(title) {
            var el = self.el;
            var mapLink = el.query('#container-title-map-link', false)[0];
            var parent = mapLink.parent('li');
            parent.setStyle({
                display: ''
            });
            if (title == null) {
                parent.setStyle({
                    display: 'none'
                });
            }
            mapLink.setHtml(title);
        };
        this.setTitle = function(title) {
            var el = self.el;
            var titleEl = el.query('h3', false)[0];
            titleEl.setHtml(title);
        };
        this.setButton = function(buttons) {
            var container = self.query('container[itemId="containerBtnGroup"]')[0];
            var containerBtn = container.down('container');
            var buttonTitle = {
                xtype: 'view-main-container-title-button'
            };
            containerBtn.removeAll();
            if (!buttons) {
                return;
            }
            for(var i = 0; i < buttons.length; i++) {
                buttons[i] = Ext.Object.merge(buttonTitle, buttons[i]);
            }
            containerBtn.add(buttons);
        };
        this.items = [{
            xtype: 'button',
            baseCls: false,
            autoEl: {
                tag: 'li',
                hidefocus: 'on',
                unselectable: 'on'
            },
            renderTpl:
                '<i class="fa fa-home"></i>' +
                '&nbsp<a href="#home">Домашняя страница</a>'
        },{
            xtype: 'button',
            baseCls: false,
            autoEl: {
                tag: 'li',
                hidefocus: 'on',
                unselectable: 'on'
            },
            renderTpl: '<span id="container-title-map-link"></span>'
        },{
            xtype: 'container',
            componentCls: 'clearfix',
            layout: {
                type: 'hbox'
            },
            itemId: 'containerBtnGroup',
            items: [{
                xtype: 'label',
                autoEl: 'h3',
                padding: '10 0 0 0',
                componentCls: 'content-title pull-left',
                flex: 1
            },{
                xtype: 'container',
                componentCls: 'date-range pull-right btn-group',
                layout: {
                    type: 'hbox'
                }
            }]
        }];
        this.callParent(arguments);
    }
});
