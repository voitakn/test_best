Ext.define('TT.view.login.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.viewlogin',
    autoShow: true,
    autoDestroy: true,
    closable: false,
    draggable: false,
    resizable: false,
    width: 300,
    layout: 'fit',
    title: 'Test-Best Login',
    requires: [
        'TT.view.login.LoginController',
        'TT.view.base.form.field.Text'
    ],
    viewModel: {
        type: 'login'
    },
    controller: 'login',
    initComponent: function() {
        this.items = {
            xtype: 'form',
            layout: 'form',
            defaultType: 'base-textfield',
            buttonAlign: 'center',
            items: [{
                fieldLabel: 'Логин',
                name: 'login',
                allowBlank: false
            },{
                fieldLabel: 'Пароль',
                name: 'passw',
                inputType: 'password',
                allowBlank: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    type: 'vbox'
                },
                items: [{
                    text: 'Войти',
                    formBind: true,
                    disabled: true,
                    handler: 'onClickLogin'
                }]
            }]
        };
        this.callParent(arguments);
    }
});
