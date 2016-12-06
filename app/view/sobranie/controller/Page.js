Ext.define('Tlapp.apps.sobranie.controller.Page', {
    extend: 'Tlapp.controller.Controller',
    id: 'apps_sobranie',
    requires: [
        'Tlapp.apps.sobranie.model.Sobranie',
        'Tlapp.apps.sobranie.store.Sobranies',
        'Tlapp.apps.sobranie.view.Grid',
        'Tlapp.apps.sobranie.view.Filter',
        'Tlapp.apps.sobranie.view.Page',
        'Tlapp.apps.sobranie.view.Form'
    ],
    models: [
        'Tlapp.apps.sobranie.model.Sobranie'
    ],
    stores: [
        'Tlapp.apps.sobranie.store.Sobranies'
    ],
    views: [
        'Tlapp.apps.sobranie.view.Grid',
        'Tlapp.apps.sobranie.view.Filter',
        'Tlapp.apps.sobranie.view.Page',
        'Tlapp.apps.sobranie.view.Form'
    ],
    refs: [
        {
            ref: 'winForm',
            selector: 'sobranie-view-window-form'
        },{
            ref: 'sobranies',
            selector: 'sobranie-store-sobranies'
        }
    ],
    init: function() {
        this.control({
            'sobranie-view-filter #add_jw_sobr_form': {
                click: this.show_sobr_form
            },
            'sobranie-view-filter radiogroup': {
                'change': this.radio_change
            },
            'sobranie-view-window-form button[action=save]': {
                click: this.save_sobr_form
            },
            'sobranie-view-grid': {
                'itemdblclick': this.sobr_edit_form

            },
            'sobranie-view-grid button': {
                'click': this.sobr_s21
            }
        });
    },
    sobr_s21: function(button)
    {

    },
    radio_change: function(radio, newValue, oldValue, eOpts)
    {
        var store = Ext.data.StoreManager.lookup('Tlapp.apps.sobranie.store.Sobranies');
        var params = {};
        params[newValue.type_sob] = 1;
        store.load({
            params: params,
            scope: this
        });

    },
    show_sobr_form: function()
    {
        var sobr_form = Ext.create('Tlapp.apps.sobranie.view.Form');
        sobr_form.show();
    },
    save_sobr_form: function(button)
    {
        var store = Ext.data.StoreManager.lookup('Tlapp.apps.sobranie.store.Sobranies');
        var form = button.up('form'),
            record = form.getRecord(),
            values = form.getValues();
        if(record)
        {
            record.set(values);
        }
        else
        {
            store.add(values);
        }
    },
    sobr_edit_form: function(grid, record)
    {
        var view = Ext.widget('sobranie-view-window-form');
        view.down('form').loadRecord(record);
    }
});
