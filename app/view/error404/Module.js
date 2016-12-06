Ext.define('TT.view.error404.Module', {
    extend: 'Ext.container.Container',
    alias: 'widget.view-error404',
    requires: [
        'TT.view.error404.Controller'
    ],
    controller: 'error404',
    html: 'Error: 404',
    cls: 'x-body-container'
});