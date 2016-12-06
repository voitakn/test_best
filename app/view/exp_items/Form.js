Ext.define('TT.view.exp_items.Form', {
    extend: 'Ext.window.Window',
    alias : 'widget.exp-items-form',
    layout: 'fit',
    autoShow: true,
    autoDestroy: true,
    requires: [
        'TT.view.exp_items.Controller',
        'TT.view.exp_items.ComboHolls',
        'TT.view.exp_items.ComboOrgs'
    ],
    controller: 'exp_items',
    title: '<b>Приход / расход - форма</b>',
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                layout: 'vbox',
                labelWidth: 200,
                defaultType: 'textfield',
                items: [
                    {
                        xtype: 'radiogroup',
                        fieldLabel: 'Тип операции',
                        allowBlank: false,
                        afterLabelTextTpl: required,
                        columns: 2,
                        vertical: true,
                        listeners: {
                            change: 'changeType'
                        },
                        items: [
                            { boxLabel: 'Расход', name: 'ex_type', inputValue: '1', checked: true},
                            { boxLabel: 'Приход', name: 'ex_type', inputValue: '2' }
                        ]
                    },{
                        xtype: 'datefield',
                        fieldLabel: 'Дата операции',
                        name: 'create_date',
                        allowBlank: false,
                        afterLabelTextTpl: required,
                        value: new Date(),  // defaults to today
                        format: "d-m-Y"
                    },{
                        xtype: 'exp-items-combo-holls',
                        fieldLabel: 'Зал',
                        name: 'holl_id',
                        allowBlank: false,
                        afterLabelTextTpl: required,
                        width: 600
                    },{
                        xtype: 'exp-items-combo-orgs',
                        fieldLabel: 'Список организаций',
                        name: 'org_id',
                        width: 600
                    },{
                        fieldLabel: 'Назначение',
                        name: 'coment',
                        allowBlank: false,
                        afterLabelTextTpl: required,
                        width: 600
                    },{
                        xtype: 'numberfield',
                        fieldLabel: 'Сумма',
                        name: 'amount',
                        allowBlank: false,
                        decimalSeparator: '.',
                        afterLabelTextTpl: required,
                        width: 250
                    }
                ],
                buttons: [
                    {
                        text: 'Сохранить',
                        formBind: true,
                        disabled: true,
                        handler: 'saveItem'
                    },{
                        text: 'Очистить',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    },{
                        text: 'Закрыть',
                        handler: function() {
                            var form = this.up('form');
                            form.getForm().reset();
                            form.up('window').close();
                        }
                    }
                ]
            }

        ];
        /*
        this.listeners = {
            'afterrender': 'onRenderForm'
        };
        */
        this.callParent(arguments);
    }
});