Ext.define('TT.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    menu_obj: {},
    menu_root: [],
    tree_obj: {},
    init: function() {
        console.log('controller.main');
    },
    onClickMenu: function(menu, e){
        if(menu.go_to != "") {
            this.redirectTo(menu.go_to);
        }
    },

    onRedirectHome: function() {
        this.redirectTo('home');
    },

    onRedirectLogin: function() {
        this.redirectTo('login');
    }
});