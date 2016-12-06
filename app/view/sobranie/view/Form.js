Ext.define('Tlapp.apps.sobranie.view.Form', {
    extend: 'Ext.window.Window',
    alias : 'widget.sobranie-view-window-form',
    layout: 'fit',
    autoShow: true,
    autoDestroy: true,
    title: 'Карточка возвещателя',
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                layout: 'vbox',
                labelWidth: 75,
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Ф.И.О.',
                    name: 'fio',
                    allowBlank: false,
                    width: 600
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Пол',
                        columns: 1,
                        vertical: false,
                        items: [
                            { boxLabel: 'Муж.', name: 'pol', inputValue: 'муж.'},
                            { boxLabel: 'Жен.', name: 'pol', inputValue: 'жен.', checked: true}
                        ]
                    },{
                        xtype: 'checkboxgroup',
                        columns: 1,
                        fieldLabel: 'Назначения',
                        vertical: false,
                        width: 650,
                        items: [
                            { boxLabel: 'Общий пионер', name: 'op', inputValue: '1' },
                            { boxLabel: 'Старейшина', name: 'st', inputValue: '1' },
                            { boxLabel: 'Служебный помошник', name: 'sp', inputValue: '1' }
                        ]
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Адрес',
                        name: 'adr',
                        width: 600
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Телефон',
                        name: 'tel',
                        width: 400
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Мобильный',
                        name: 'mob',
                        width: 400
                    },{
                        xtype: 'datefield',
                        format: 'd.m.Y',
                        fieldLabel: 'Дата рождения',
                        name: 'data_r',
                        width: 250
                    },{
                        xtype: 'datefield',
                        format: 'd.m.Y',
                        fieldLabel: 'Дата крещения',
                        name: 'data_k',
                        width: 250
                    },{
                        xtype: 'checkboxgroup',
                        columns: 5,
                        fieldLabel: 'Статус',
                        vertical: false,
                        width: 650,
                        items: [
                            { boxLabel: 'Архив', name: 'arhive' },//, inputValue: '1'
                            { boxLabel: 'Исклен', name: 'pk' }
                        ]
                    }
                ],
                buttons: [
                    {
                        text: 'Сохранить',
                        formBind: true,
                        disabled: true,
                        action: 'save'
                    },{
                        text: 'Очистить',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    },{
                        text: 'Отмена',
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