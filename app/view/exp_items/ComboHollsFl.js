Ext.define('TT.view.exp_items.ComboHollsFl', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.exp-items-combo-holls-fl',
    requires: [
        'TT.view.exp_holls.store.Holls',
        'TT.view.exp_items.store.HollsFl'
    ],
    displayField: 'title_holl',
    valueField: 'id',
    forceSelection: true,
    triggerAction: 'all',
    editable : false,
    queryMode: 'local',
    listeners: {
        afterrender: function(combo) {
            combo.select(combo.store.getAt(0));
        }
    },
    initComponent: function() {
        this.store = Ext.create('TT.view.exp_items.store.HollsFl');
        var self = this;
        var holl_store = Ext.data.StoreManager.lookup('exp_holls_store');
        if(holl_store && holl_store.data.length > 0) {
            console.log('!!! holl_store', holl_store.data.length);
            self.createComboStore(holl_store);
        }
        else {
            holl_store = Ext.create('TT.view.exp_holls.store.Holls');
            holl_store.load({
                params: {},
                callback: function(records, operation, success) {
                    self.createComboStore(holl_store);
                },
                scope: self
            });
        }
        this.listeners = {
            'select': 'selectHollFl'
        };
        this.callParent(arguments);
    },
    createComboStore: function(holl_store) {
        console.log('Holls.createComboStore()', holl_store.data, this);
        var holls_data = [{id: 0, title_holl: 'Все'}];
        holl_store.each(function(row) {
            var new_row = {
                id: row.data.id,
                title_holl: row.data.title_holl
            };
            holls_data.push(new_row);
        });
        var store = this.getStore();
        store.setData(holls_data);
    }
});