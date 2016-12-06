Ext.define('TT.view.desktop_view.Module', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.view-desktop-view',
    requires: [
        'TT.view.desktop_view.Controller'
    ],
    controller: 'desktop_view',
    html: 'desktop_view',
    title: 'Рабочий стол'
});