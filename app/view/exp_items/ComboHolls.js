Ext.define('TT.view.exp_items.ComboHolls', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.exp-items-combo-holls',
    requires: [
        'TT.view.exp_holls.store.Holls'
    ],
    displayField: 'title_holl',
    valueField: 'id',
    forceSelection: true,
    triggerAction: 'all',
    editable : false,
    queryMode: 'local',
    initComponent: function() {
        var self = this;
        this.store = Ext.data.StoreManager.lookup('exp_holls_store') || Ext.create('TT.view.exp_holls.store.Holls');
        this.store.load({
            params: {},
            callback: function(records, operation, success) {
                //self.select(self.store.getAt(0));
            },
            scope: this
        });
        this.listeners = {
            'select': 'selectHoll'
        };
        this.callParent(arguments);
    }
});