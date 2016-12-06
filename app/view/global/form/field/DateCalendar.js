Ext.define('TT.view.global.form.field.DateCalendar', {
    extend: 'TT.view.base.form.FieldSet',
    alias: 'widget.global-date-calendar',
    title: 'Дата выключения',
    collapsible: true,
    requires: [
        'TT.view.base.form.FieldSet',
        'TT.view.base.form.field.Date'
    ],
    defaults: {
        labelWidth: 30,
        anchor: '100%'
    },
    controller: 'global-form-field',
    initComponent: function() {
        var self = this;
        self.nameDateFrom = self.nameDateFrom || 'date_from';
        self.nameDateTo = self.nameDateTo || 'date_to';
        this.items = [{
            xtype: 'base-datefield',
            format: 'd.m.Y',
            fieldLabel: 'С',
            reference: 'dateFrom',
            name: self.nameDateFrom
        },{
            xtype: 'base-datefield',
            format: 'd.m.Y',
            fieldLabel: 'По',
            reference: 'dateTo',
            name: self.nameDateTo
        },{
            xtype: 'base-combobox',
            fieldLabel: 'За',
            name: 'period',
            displayField: 'name',
            valueField: 'id',
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            value: 0,
            listeners: {
                change: 'onChangeCalendar'
            },
            store: Ext.create('TT.store.Store', {
                fields: [
                    'id',
                    'name'
                ],
                data: [{
                    "id": 0,
                    "name": "Все"
                },{
                    "id": 1,
                    "name": "День"
                },{
                    "id": 2,
                    "name": "Неделя"
                },{
                    "id": 3,
                    "name": "Месяц"
                },{
                    "id": 4,
                    "name": "Год"
                }]
            })
        }];
        this.callParent(arguments);
    }
});

Ext.define('DateCalendarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.global-form-field',

    onChangeCalendar: function(cmp, newValue) {
        var dateTo = this.lookupReference('dateTo');
        var dateFrom = this.lookupReference('dateFrom');
        var date = new Date();
        if (newValue == 0) {
            dateTo.setValue('');
            dateFrom.setValue('');
            return;
        }
        dateTo.setValue(Ext.Date.format(date, 'd.m.Y'));
        switch (newValue) {
            case 1:
                dateFrom.setValue(Ext.Date.format(Ext.Date.add(date, Ext.Date.DAY, -1), 'd.m.Y'));
                break;
            case 2:
                dateFrom.setValue(Ext.Date.format(Ext.Date.add(date, Ext.Date.DAY, -7), 'd.m.Y'));
                break;
            case 3:
                dateFrom.setValue(Ext.Date.format(Ext.Date.add(date, Ext.Date.MONTH, -1), 'd.m.Y'));
                break;
            case 4:
                dateFrom.setValue(Ext.Date.format(Ext.Date.add(date, Ext.Date.YEAR, -1), 'd.m.Y'));
                break;
            default :
                dateTo.setValue('');
                dateFrom.setValue('');
                break;
        }
    }
});