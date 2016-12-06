Ext.define('TT.controller.Root', {
    extend: 'Ext.app.Controller',
    routes : {
        '.*' : {
            action: 'showModule'
        }
    },
    views: [
        'TT.view.login.Login'
    ],
    refs: [{
        ref: 'mainViewPort',
        selector: 'viewport'
    },{
        ref: 'viewMain',
        selector: 'viewmain'
    }],

    init: function() {
        var sessionHash = Ext.util.Cookies.get('isAutorise');
        if(sessionHash == undefined){
            this.redirectTo('login');
        } else {
            this.redirectTo('get_satus');
        }
    },

    renderMain: function(){
        var viewport = this.getMainViewPort();
        var main_el = this.getViewMain();
        if(!main_el)
        {
            viewport.removeAll();
            var main = Ext.create('TT.view.main.Main');
            viewport.add(main);
            viewport.doLayout();
            this.mainModule = main;
            this.mainContainer = main.query('view-main-body')[0];
        }
    },

    showLogin: function(){
        this.logout();
        var viewport = this.getMainViewPort();
        viewport.removeAll();
        var window_login = Ext.create('TT.view.login.Login');
        viewport.add({xtype: 'container', cls: 'x-body-container', items: [window_login]});
        window_login.show();
    },

    showModule: function() {
        var hash = Ext.util.History.getHash();
        if(hash == 'get_satus') {
            this.getUserStatus();
            return;
        }
        if(hash == 'login') {
            this.logout();
            this.showLogin();
            return;
        }
        this.renderMain();
        var hsplit_slash = hash.split('/'),
            hsplit = hsplit_slash[0].split('?'),
            module = hsplit[0];
        this.mainContainer.removeAll();

        var moduleObj = Ext.create('TT.view.' + module + '.Module');
        this.mainContainer.add(moduleObj);
    },
    getUserStatus: function() {
        Ext.Ajax.request({
            scope: this,
            url:"/php/login.php",
            params: {
                get_status: 1
            },
            success: this.resultStatus
        });
    },
    resultStatus: function(response) {
        var text = response.responseText,
            json_data = Ext.JSON.decode(text);
        if(json_data.success == false)
        {
            this.logout();
            this.redirectTo('login');
            return;
        }
        if(json_data.data)
        {
            Adm.user = json_data.data;
            this.redirectTo('home');
        }
    },
    logout: function() {
        Ext.util.Cookies.clear('isAutorise');
        Adm.user = {};
        Ext.Ajax.request({
            scope: this,
            url:"/php/login.php",
            params: {
                logout: 1
            },
            success: function(){}
        });

    }
});