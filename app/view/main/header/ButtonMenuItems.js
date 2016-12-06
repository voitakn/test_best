Ext.define('TT.view.main.header.ButtonMenuItems', {
    extend: 'Ext.menu.Item',
    alias: 'widget.view-main-header-button-menu-items',
    width: 268,
    disabledCls: '',
    initComponent: function() {
        var typeNoticeCls = this.typeNoticeCls;
        var message = this.message || '';
        var noticeType, noticeIcon;
        switch (typeNoticeCls) {
            case 'alert':
                noticeType = 'label-primary';
                noticeIcon = 'fa-comment';
                break;
            case 'error':
                noticeType = 'label-warning';
                noticeIcon = 'fa-exclamation-triangle';
                break;
            default:
                noticeType = 'label-warning';
                noticeIcon = 'fa-exclamation-triangle';
        }
        this.renderTpl = [
            '<li>' +
                '<a href="#">' +
                    '<span class="label ' + noticeType + '"><i class="fa ' + noticeIcon + '"></i></span>' +
                    '<span class="body">' +
                        '<span class="message">' + message + '</span>' +
                    '</span>' +
                '</a>' +
           '</li>'
        ];
        this.callParent(arguments);
    }
});

