Ext.define('TT.view.main.Periods', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.view-main-period',
    queryMode: 'local',
    editable: false,
    autoSelect: true,
    displayField: 'text',
    valueField: 'text',
    name: 'select_period',
    initComponent: function() {
        var periods = Ext.create('TT.store.Periods');
        this.store = periods;
        this.callParent(arguments);
        this.select(Adm.conf.period);
    }
});