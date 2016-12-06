Ext.define('TT.view.main.MainHead', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.view-main-head',
    layout: {
        type: 'vbox'
    },
    cls: 'x-body-container',
    controller: 'main',
    initComponent: function() {
        this.tbar = [{
            icon: '/icons/home.png',
            handler: 'onRedirectHome'
        },{
            xtype: 'tbseparator'
        }];
        if(Adm.user.is_sobr == '1') {
            this.tbar.push(
                {   text: 'Собрание',
                    go_to: 'sobranie',
                    margin: '1',
                    handler: 'onClickMenu'
                },{
                    text: 'Отчеты',
                    go_to: 'orders_month',
                    margin: '1',
                    handler: 'onClickMenu'}
            );
        }
        if(Adm.user.is_buh == '1') {
            this.tbar.push(
                {
                    text: 'Приход расход',
                    go_to: 'exp_items',
                    margin: '1',
                    handler: 'onClickMenu'
                },{
                    text: 'Организации',
                    go_to: 'exp_orgs',
                    margin: '1',
                    handler: 'onClickMenu'
                },{
                    text: 'Залы',
                    go_to: 'exp_holls',
                    margin: '1',
                    handler: 'onClickMenu'
                }
            );
        }
        this.tbar.push({
            xtype: 'tbfill'
        },{
            icon: '/icons/user.png',
            text: Adm.user.login
        },{
            xtype: 'tbseparator'
        },{
            icon: '/icons/login-1-16.png',
            handler: 'onRedirectLogin'
        });
        this.callParent(arguments);
    }
});
