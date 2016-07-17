define(function (require) {

    "use strict";

    return {
        // Bootstrap file input
        fileInput: {
            importConfig: {
                showPreview: false,
                showCancel: false,
                showClose: false,
                showUpload: false,
                showUploadedThumbs: false,
                browseIcon:"<span class='glyphicon glyphicon-upload'></span>",
                browseLabel:"Import config",
                removeIcon:"<span class='glyphicon glyphicon-trash'></span>",
                removeLabel:"Clear"
            }
        },
        // Bootstrap switch
        switch: {
            tag: {
                onText: '&nbsp;',
                offText: '&nbsp;',
                onColor: 'success',
                offColor: 'danger',
                size: 'mini',
                onInit: function (event, state) {
                    var title = $(this).attr('title');
                    $(this).parents('.bootstrap-switch').attr('title', title);
                },
                onSwitchChange: function (event, state) {
                    $(this).change();
                }
            }
        }
    };

});