Ext.define('Tlapp.apps.sobranie.store.Sobranies', {
    extend: 'Ext.data.Store',
    alias: 'widget.sobranie-store-sobranies',
    requires: 'Tlapp.apps.sobranie.model.Sobranie',
    model: 'Tlapp.apps.sobranie.model.Sobranie',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/sobranie.php?get_list',
            update: '/php/sobranie.php?edit',
            create: '/php/sobranie.php?edit'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});