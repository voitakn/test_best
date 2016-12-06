var Adm = Adm || {};
Ext.Loader.setPath('Ext.ux', 'ext/examples/ux');
if(navigator.appVersion.indexOf('Mobile') == -1) {
    Ext.util.CSS.swapStyleSheet('Mobile',"/ext/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css");
} else {
    Ext.util.CSS.swapStyleSheet('Desctop',"/ext/packages/ext-theme-crisp-touch/build/resources/ext-theme-crisp-touch-all.css");
}

Ext.application({
    name: 'TT',
    defaultToken : 'home',
    appProperty: 'app',
    requires: [
        'Ext.History',
        'Ext.util.Cookies',
        'Ext.container.Viewport',
        'TT.view.Viewport'
    ],
    theme: "ext-theme-crisp",
    user: {},
    conf: {
        period: '15-16',
        year: 2015
    },
    modules: {
        'error404': 1,
        'error403': 1
    },
    views: [
        'TT.view.Viewport'
    ],
    controllers: [
        'Root'
    ],
    stores: [
    ],
    autoCreateViewport: true,
    launch: function () {
        Adm = this;
        Adm.storeRole = [];
        this.isAutorise = Ext.util.Cookies.get("isAutorise");
        Ext.override(Ext.grid.RowEditor, {
            saveBtnText: 'Сохранить',
            cancelBtnText: 'Отмена',
            errorsText: 'Ошибка'
        });
    }
});

