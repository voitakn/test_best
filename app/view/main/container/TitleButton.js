Ext.define('TT.view.main.container.TitleButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.view-main-container-title-button',
    baseCls: false,
    componentCls: 'js_update btn btn-default',
    autoEl: {
        tag: 'a',
        hidefocus: 'on',
        unselectable: 'on'
    },
    initComponent: function() {
        var text = this.text || '';
        this.renderTpl = text;
        this.callParent(arguments);
    }
});