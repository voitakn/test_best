Ext.define('TT.view.global.form.field.ComboBoxCompany', {
    extend: 'TT.view.base.form.field.ComboBox',
    alias: 'widget.global-combobox-company',
    displayField: 'name',
    valueField: 'id',
    queryMode: 'local',
    initComponent: function() {
        this.store = Ext.data.StoreManager.lookup('storeCompany') || Ext.create('TT.store.Company');
        this.callParent(arguments);
    }
});