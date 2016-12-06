Ext.define('TT.view.exp_orgs.Form', {
    extend: 'Ext.window.Window',
    alias : 'widget.exp-orgs-form',
    layout: 'fit',
    autoShow: true,
    autoDestroy: true,
    requires: [
        'TT.view.exp_orgs.Controller'
    ],
    controller: 'exp_orgs',
    title: 'Форма организации',
    initComponent: function() {
        var holls_check = [],
            store_holls = Ext.data.StoreManager.lookup('exp_holls_store') || Ext.create('TT.view.exp_holls.store.Holls');
        store_holls.each(function(row){
            holls_check.push({
                boxLabel: row.data.title_holl,
                inputValue: row.data.id,
                name: "holl_id"
            })
        });
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                layout: 'vbox',
                labelWidth: 160,
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: 'Наименование',
                        name: 'title_org',
                        allowBlank: false,
                        width: 600
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Адрес',
                        name: 'adres',
                        width: 600
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Телефон',
                        name: 'phone',
                        width: 400
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Сотрудник',
                        name: 'worker',
                        width: 400
                    },{
                        xtype: 'checkboxgroup',
                        columns: 1,
                        fieldLabel: 'Обслуживает ЗЦ',
                        vertical: false,
                        width: 600,
                        items: holls_check
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
        this.callParent(arguments);
    }
});