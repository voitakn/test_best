Ext.define('TT.view.exp_items.ComboOrgs', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.exp-items-combo-orgs',
    requires: [
        'TT.view.exp_orgs.store.Orgs',
        'TT.view.exp_items.store.OrgsFl'
    ],
    queryMode: 'local',
    displayField: 'title_org',
    valueField: 'id',
    controller: 'exp_items',
    editable : false,
    initComponent: function() {
        var self = this;
        this.store = Ext.create('TT.view.exp_items.store.OrgsFl');
        var org_store = Ext.data.StoreManager.lookup('exp_orgs_store');
        if(org_store) {
            this.createComboStore(org_store);
        }
        else {
            org_store = Ext.create('TT.view.exp_orgs.store.Orgs');
            org_store.load({
                params: {},
                callback: function(records, operation, success) {
                    self.createComboStore(org_store);
                },
                scope: self
            });
        }
        this.callParent(arguments);
    },
    createComboStore: function(org_store) {
        var orgs_data = [], orgs_fields = ['id', 'title_org'];
        org_store.each(function(row) {
            var new_row = {
                title_org: row.data.title_org,
                id: row.data.id
            };
            if(row.data.holl_id) {
                row.data.holl_id.forEach(function(element, index, array){
                    var holl_is = 'holl_id_'+element;
                    new_row[holl_is] = 1;
                    if(orgs_fields.indexOf(holl_is) == -1) {
                        orgs_fields.push(holl_is);
                    }
                });
            }
            orgs_data.push(new_row);
        });
        var store = this.getStore();
        store.setFields(orgs_fields);
        store.setData(orgs_data);
        //this.select(store.getAt(0));
    }
});