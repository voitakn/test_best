Ext.define('Tlapp.apps.sobranie.view.Filter', {
    extend: 'Tlapp.view.Panel',
    alias: 'widget.sobranie-view-filter',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    initComponent: function() {
        console.log('Tlapp.apps.sobranie.view.Filter - init()');
        this.items = [
            {
                xtype: 'button',
                id: 'add_jw_sobr_form',
                text: 'Добавить карточку',
                margin: '10 0 0 0'
            },
            {
                xtype: 'fieldset',
                title: 'Тип карточек собрания',
                collapsible: false,
                margin: '10 5 0 5',
                width: 190,
                items: [
                    {
                    xtype: 'radiogroup',
                    columns: 1,
                    vertical: true,
                    items: [
                        { boxLabel: 'Активные', name: 'type_sob', inputValue: 0, checked: true},
                        { boxLabel: 'Архив', name: 'type_sob', inputValue: 'arhive'},
                        { boxLabel: 'Исключенные', name: 'type_sob', inputValue: 'pk'}
                    ]
                }]

            }
        ];
        this.callParent(arguments);
    }
});