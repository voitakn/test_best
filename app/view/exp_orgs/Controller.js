Ext.define('TT.view.exp_orgs.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.exp_orgs',
    org_load: false,
    init: function() {
        console.log('controller.exp_orgs');
    },
    clickHolls: function(checkgroup, record, index, eOpts) {
        console.log('clickHolls', checkgroup.getSelection());
        if(!this.org_load) {
            this.loadOrgs(checkgroup.getSelection());
        }
    },
    selectHolls: function(row, selections, eOpts) {
        this.org_load = true;
        this.loadOrgs(selections);
    },
    loadOrgs: function(selections) {
        console.log('loadOrgs', selections);
        var org_l = this.org_load;
        var holls, params={};
        if(selections.length > 0)
        {
            holls = '(';
            for(var i=0; i<selections.length; i++)
            {
                var row = selections[i];
                if(i==0)
                    holls += row.data.id;
                else holls += ','+row.data.id;
            }
            holls += ')';
            params = {holls: holls};
        }
        var user_store = Ext.data.StoreManager.lookup('exp_orgs_store');
        user_store.load({
            params: params,
            callback: function(records, operation, success) {
                org_l = false;
                this.org_load = false;
            },
            scope: this
        });
    },
    itemForm: function() {
        var view = Ext.create('TT.view.exp_orgs.Form');
    },
    itemEdit: function(grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        console.log('itemEdit', record);
        var view = Ext.create('TT.view.exp_orgs.Form');
        view.down('form').loadRecord(record);
    },
    saveItem: function(button) {
        var store = Ext.data.StoreManager.lookup('exp_orgs_store');
        var form = button.up('form'),
            record = form.getRecord(),
            values = form.getValues();
        console.log('saveItem', values);
        if(record)
        {
            record.set(values);
        }
        else
        {
            store.add(values);
        }
        //store.sync();
    }
});