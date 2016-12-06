Ext.define('TT.view.global.form.field.ComboBoxOffices', {
    extend: 'TT.view.base.form.field.ComboBox',
    alias: 'widget.global-combobox-office',
    displayField: 'title',
    valueField: 'id',
    queryMode: 'local',
    initComponent: function() {
        this.store = Ext.data.StoreManager.lookup('storeOffices') || Ext.create('TT.store.Offices');
        this.callParent(arguments);
    }
});