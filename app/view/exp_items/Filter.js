Ext.define('TT.view.exp_items.Filter', {
    extend: 'TT.view.base.panel.Filter',
    alias: 'widget.exp-items-filter',
    reqires: [
        'TT.view.exp_items.Controller',
        'TT.view.exp_items.ComboHollsFl',
        'TT.view.exp_items.ComboOrgsFl'
    ],
    controller: 'exp_items',
    buttonAlign:'center',
    reference: 'filterItems',
    initComponent: function() {
        var holls_check = [],
            store_holls = Ext.data.StoreManager.lookup('exp_holls_store') || Ext.create('TT.view.exp_holls.store.Holls');
        store_holls.each(function(row){
            holls_check.push({
                boxLabel: row.data.title_holl,
                inputValue: row.data.id,
                name: "holl_id"
            });
        });

        var dt = new Date(),
            fdt = Ext.Date.getFirstDateOfMonth(dt),
            tdt = Ext.Date.getLastDateOfMonth(dt),
            date_from = Ext.Date.format(fdt, 'd-m-Y'),
            date_to = Ext.Date.format(tdt, 'd-m-Y');
        this.items = [
            {
                xtype: 'button',
                text: 'Добавить запись',
                handler: 'itemForm',
                margin: '10 10 10 10'
            },
            {
                xtype: 'form',
                bodyBorder: false,

                border: 0,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                buttonAlign:'center',
                items: [
                    {
                        xtype: 'radiogroup',
                        fieldLabel: 'Тип операции',
                        labelAlign: 'top',
                        columns: 2,
                        vertical: true,
                        items: [
                            { boxLabel: 'Расход', name: 'fl_ex_type', inputValue: '1'},
                            { boxLabel: 'Все', name: 'fl_ex_type', inputValue: '0', checked: true},
                            { boxLabel: 'Приход', name: 'fl_ex_type', inputValue: '2' }

                        ]
                    },
                    {
                        xtype:'fieldset',
                        title: 'Период',
                        collapsible: false,
                        defaultType: 'datefield',
                        margin: '5 5 5 5',
                        defaults: {labelWidth: 40, anchor: '99%', format: "d-m-Y"},
                        items :[{
                            fieldLabel: 'С',
                            name: 'date_from',
                            allowBlank: false,
                            value: date_from
                        }, {
                            fieldLabel: 'По',
                            name: 'date_to',
                            allowBlank: false,
                            value: date_to
                        }]
                    },{
                        xtype: 'exp-items-combo-holls-fl',
                        fieldLabel: 'Список залов',
                        controller: 'exp_items',
                        name: 'fl_holl_id',
                        margin: 5,
                        labelAlign: 'top'
                    },{
                        xtype: 'exp-items-combo-orgs-fl',
                        fieldLabel: 'Список организаций',
                        controller: 'exp_items',
                        name: 'fl_org_id',
                        margin: 5,
                        labelAlign: 'top'
                    }
                ],
                buttons: [
                    {
                        text: 'Очистить',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    },{
                        text: 'Поиск',
                        formBind: true,
                        disabled: true,
                        handler: 'searchItems'
                    }
                ]

            }
        ];
        this.callParent(arguments);
    }
});