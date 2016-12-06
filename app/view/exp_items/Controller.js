Ext.define('TT.view.exp_items.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.exp_items',
    init: function() {
        console.log('controller.exp_items');
    },
    itemForm: function(button) {
        console.log('itemForm', button);
        var view = Ext.create('TT.view.exp_items.Form');
    },
    selectHollFl: function(combo, record) {
        console.log('selectHollFl', record);
        var orgCombo = Ext.ComponentQuery.query('exp-items-combo-orgs-fl')[0];
        var org_store = orgCombo.getStore();
        org_store.clearFilter();
        if(record.id > 0) {
            org_store.filter('holl_id_'+record.id, 1);
        }
        orgCombo.setValue(0);
    },
    selectHoll: function(combo, record) {
        console.log('selectHoll', record);
        var orgCombo = Ext.ComponentQuery.query('exp-items-combo-orgs')[0];
        var org_store = orgCombo.getStore();
        org_store.clearFilter();
        if(record.id > 0) {
            org_store.filter('holl_id_'+record.id, 1);
        }
        orgCombo.select(org_store.getAt(0));
    },
    onRenderForm: function(win_form) {
        console.log('onRenderForm()', win_form);
        var holl_combo = Ext.ComponentQuery.query('exp-items-combo-holls')[0];
        var holl_store = holl_combo.getStore();
        holl_combo.select(holl_store.getAt(0));
    },
    changeType: function(radiogroup, newValue, oldValue, eOpts) {
        var form = radiogroup.up('form');
        var combo_orgs = form.down('exp-items-combo-orgs');
        console.log('changeType', newValue, radiogroup, form, combo_orgs);
        if(newValue.ex_type == 2) {
            combo_orgs.hide();
        } else {
            combo_orgs.show();
        }
    },
    itemEdit: function(grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        console.log('itemEdit', record);
        var view = Ext.create('TT.view.exp_items.Form');
        view.down('form').loadRecord(record);
    },
    saveItem: function(button) {
        var store = Ext.data.StoreManager.lookup('exp_items_store');
        var form = button.up('form'),
            record = form.getRecord(),
            values = form.getValues();
        console.log('saveItem', values);
        values.amount = Math.abs(values.amount);
        if(record)
        {
            record.set(values);
        }
        else
        {
            store.add(values);
        }
        form.up('window').close();
    },
    searchItems: function(button) {
        var store = Ext.data.StoreManager.lookup('exp_items_store'),
            form = button.up('form'),
            values = form.getValues();
        var params = {
            date_from: values.date_from,
            date_to: values.date_to
        };
        if(values.fl_ex_type > 0) {
            params.ex_type = values.fl_ex_type
        }
        if(values.fl_holl_id > 0) {
            params.holl_id = values.fl_holl_id
        }
        if(values.fl_org_id > 0) {
            params.org_id = values.fl_org_id
        }
        store.load({
            params: params,
            scope: this
        })
    },
    exportItems: function() {
        console.log('exportItems');
        var flt = this.lookupReference('filterItems');
        var form = flt.down('form');
        var values = form.getValues();
        var params = {
            date_from: values.date_from,
            date_to: values.date_to
        };
        var op = "/php/expenses.php?export&date_from="+params.date_from+"&date_to="+params.date_to+"&page=1&start=0&limit=1000";
        if(values.fl_ex_type > 0) {
            params.ex_type = values.fl_ex_type;
            op += '&ex_type='+params.ex_type;
        }
        if(values.fl_holl_id > 0) {
            params.holl_id = values.fl_holl_id;
            op += '&holl_id='+params.holl_id;
        }
        if(values.fl_org_id > 0) {
            params.org_id = values.fl_org_id;
            op += '&org_id='+params.org_id;
        }

        window.open(op, '_newtab');
    }
});