Ext.define('TT.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    init: function(){
        Ext.util.Cookies.clear("session_hash");
    },
    onClickLogin: function (button) {
        var form = button.up('form'),
        values = form.getValues();
        Ext.Ajax.request({
            scope: this,
            url:"/php/login.php",
            params: {
                login: values.login,
                passw: values.passw
            },
            success: this.resultLogin
        });
    },
    resultLogin: function(response)
    {
        var text = response.responseText,
            json_data = Ext.JSON.decode(text);
        if(json_data.success == false)
        {
            Ext.util.Cookies.clear("isAutorise", "/");
            Ext.Msg.alert('Ошибка авторизации', json_data.msg);
            return;
        }
        else if(json_data.data)
        {
            Ext.util.Cookies.set('isAutorise', 1);
            var win = this.getView();
            win.close();
            Adm.user = json_data.data;
            this.redirectTo('home');
        }
    }
});