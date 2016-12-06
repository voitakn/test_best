Ext.define('Tlapp.apps.orders_month.controller.Page', {
    extend: 'Tlapp.controller.Controller',
    id: 'apps_orders_month',
    requires: [
        'Tlapp.apps.orders_month.model.Order',
        'Tlapp.apps.orders_month.store.Orders',
        'Tlapp.model.Month',
        'Tlapp.store.Months'

    ],
    models: [
        'Tlapp.apps.orders_month.model.Order',
        'Tlapp.apps.orders_month.model.Report',
        'Tlapp.model.Month'
    ],
    //select god, ord_mes, COUNT(id) as col, SUM(kni), SUM(bro), SUM(chas), SUM(jur), SUM(pov), SUM(izb), pp, op from jw_order where god = '13-14' and ord_mes = 3 group by pp, op;
    stores: [
        'Tlapp.apps.orders_month.store.Orders',
        'Tlapp.apps.orders_month.store.Reports',
        'Tlapp.store.Months'
    ],
    views: [
        'Tlapp.apps.orders_month.view.Grid',
        'Tlapp.apps.orders_month.view.GridReport',
        'Tlapp.apps.orders_month.view.Filter',
        'Tlapp.apps.orders_month.view.Page'
    ],
    init: function() {
        this.control({
            'orders-month-view-filter radiogroup': {
                'change': this.radio_change
            },
            'orders-month-view-grid': {
                'edit': this.grid_edit
            }
        });
    },
    radio_change: function(radio, newValue, oldValue, eOpts)
    {
        var months = Ext.data.StoreManager.lookup('Tlapp.store.Months');
        var find_rec = months.findRecord("num_mes", newValue.num_mes);
        this.num_mes = newValue.num_mes;
        this.god = Inside.application.appState.period;
        this.mes = find_rec.get('text');

        var store = Ext.data.StoreManager.lookup('Tlapp.apps.orders_month.store.Orders');

        var params = {
            god: this.god,
            num_mes: this.num_mes
        };
        store.load({
            params: params,
            scope: this
        });
        this.reload_reports();

    },
    grid_edit: function(editor, e)
    {
        var srow = e.newValues;
        var rec = e.record.data;
        var save_data = {
            id: rec.id,
            ord_mes: srow.ord_mes || this.num_mes,
            num_mes: this.num_mes,
            god: this.god,
            userid: rec.us_id,
            mes: this.mes,
            kni: srow.kni,
            bro: srow.bro,
            buk: srow.buk,
            chas: srow.chas,
            jur: srow.jur,
            pov: srow.pov,
            izb: srow.izb,
            prim: srow.prim,
            pp: srow.pp,
            op: srow.op
        };
        e.record.set(save_data);

        e.store.sync();
        e.store.reload();
        this.reload_reports();

    },
    reload_reports: function()
    {
        var store_report = Ext.data.StoreManager.lookup('Tlapp.apps.orders_month.store.Reports');
        var params = {
            god: this.god,
            ord_mes: this.num_mes
        };
        store_report.load({
            params: params,
            scope: this
        });
    }
});
