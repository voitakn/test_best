Ext.define('TT.view.exp_items.model.Expense', {
    extend: 'Ext.data.Model',
    fields: [//'id', 'ex_type', 'ex_type_name', 'holl_id', 'title_holl', 'org_id', 'title_org', 'coment',  'amount', 'create_date'
        {name: 'id', type: 'int'},
        {name: 'ex_type',  type: 'int'},
        {name: 'ex_type_name',  type: 'string'},
        {name: 'holl_id',  type: 'int'},
        {name: 'title_holl',  type: 'string'},
        {name: 'org_id',  type: 'int'},
        {name: 'title_org',  type: 'string'},
        {name: 'coment',  type: 'string'},
        {name: 'amount',  type: 'number'},
        {name: 'create_date',  type: 'string'}
    ]
});
