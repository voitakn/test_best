Ext.define('TT.view.exp_items.store.Expenses', {
    extend: 'Ext.data.Store',
    alias: 'widget.store-expenses',
    requires: 'TT.view.exp_items.model.Expense',
    model: 'TT.view.exp_items.model.Expense',
    storeId: 'exp_items_store',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/php/expenses.php?get_list',
            update: '/php/expenses.php?edit',
            create: '/php/expenses.php?edit'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});