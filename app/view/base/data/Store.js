Ext.define('TT.view.base.data.Store', {
    extend: 'Ext.data.Store',
    procedure: null,
    crud: null,
    defaultExtraParams : null,
    constructor: function(config) {
        if(this.procedure) {
            if(Adm.user.subprograms_access[this.procedure] != 1) {
                Ext.toast({
                    html: 'Нет доступа к данным!',
                    title: 'Ошибка запроса',
                    width: 300,
                    align: 't',
                    '$panel-border-color': 'red'
                });
                return;
            }
        }
        if(!config.proxy){
            config.proxy = {
                type: 'ajax',
                actionMethods:  {create: 'POST', read: 'GET', update: 'POST', destroy: 'POST'},
                headers: {
                    'Authorization': 'Basic ' + Adm.user.token
                }
            };
            if(this.crud) {
                config.proxy.api = {
                    create  : this.crud.create ? '/actions/crm/'+this.crud.create : undefined,
                    read    : this.crud.read ? '/actions/crm/'+this.crud.read : undefined,
                    update  : this.crud.update ? '/actions/crm/'+this.crud.update : undefined,
                    destroy : this.crud.destroy ? '/actions/crm/'+this.crud.destroy : undefined
                }
            } else if(this.procedure) {
                config.proxy.url =  '/actions/crm/' + this.procedure
            }
        }

        this.callParent([config]);
    }
});
