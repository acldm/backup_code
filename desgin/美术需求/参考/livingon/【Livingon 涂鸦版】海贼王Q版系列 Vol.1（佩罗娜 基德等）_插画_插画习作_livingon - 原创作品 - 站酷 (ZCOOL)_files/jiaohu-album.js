function albumAddCollect(objectType, objectId, collectionIds, albumAddSuccessCb, albumAddErrorCb) {
    $.ajax({
        type: "POST",
        url: proMyZDomain + "/collection/collect",
        data: { objectType: objectType, objectId: objectId, collectionIds: collectionIds },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                albumAddSuccessCb(data);
            } else {
                albumAddErrorCb(data);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            pageToastFail(messagesWeb.common_abnormal)
            albumAddErrorCb()
        }
    });
}

function albumCelCollect(objectType, objectId, collectionIds, albumCelSuccessCb, albumCelErrorCb) {
    $.ajax({
        method: "delete",
        url: proMyZDomain + "/collection/delCollect.json?objectType=" + objectType + "&objectId=" + objectId + "&collectionIds=" + collectionIds,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                albumCelSuccessCb(data);
            } else {
                albumCelErrorCb(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pageToastFail(messagesWeb.common_abnormal)
            albumCelErrorCb()
            console.log(XMLHttpRequest.status + XMLHttpRequest.readyState + textStatus);
        }
    });
}

function createAlbumAjax(name, open, description, createAlSuccuessCb, createAlErrorCb) {
    $.ajax({
        type: "POST",
        url: proMyZDomain + "/collection/add.json",
        data: { name: name, open: open, description: description },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                createAlSuccuessCb(data);
            } else {
                createAlErrorCb(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    });
}
// 重置input计数和input样式
function resetCountOrInputStatus(Input,Count){
    Input.removeClass('borderred');
    Input.siblings('.count').length && Input.siblings('.count').removeClass('warning').html(Count);
}
function clearPopContents(Input, singlePrivacy, ConfirmBtn) {
    Input.val('');
    singlePrivacy.find('.js-i-public').attr('checked', true)
    singlePrivacy.find('.js-i-public').parents('label').addClass('radio-0').removeClass('radio-1')
    singlePrivacy.find('.js-i-privacy').attr('checked', false)
    singlePrivacy.find('.js-i-privacy').parents('label').addClass('radio-1').removeClass('radio-0')
    ConfirmBtn.addClass('btn-disabled').removeClass('btn-default-main');
}
function createAlbumShowAndFn(createAlSuccuess, createAlError) {
    if($("#al-name").siblings('.count').length == 0){
        zCharCount_withExceedCount($("#al-name"), {
            allowed: 50
        });
        zCharCount_withExceedCount($("#album-dis-textarea"), {
            allowed: 200
        });
    }
    
    clearPopContents($("#al-name,#album-dis-textarea"), $('.privacy-setting'), $('.js-al-confirm'));
    resetCountOrInputStatus($("#al-name"),50)
    resetCountOrInputStatus($("#album-dis-textarea"),200)
    $('#create-album-pop').show();
    // 在main.js中定义获取光标到input
    popFirstInputFocus($("#al-name"))
    // 获取创建专辑的专辑信息
    function getAlbumContentSubmit(createAlSuccuessCb, createAlErrorCb) {
        var name = $('input[name="p-al-name"]').val();
        var description = $('textarea[name="p-al-dis"]').val();
        var open;
        if ($('#create-album-pop .js-i-privacy').prop('checked')) {
            open = 0;
        }
        if ($('#create-album-pop .js-i-public').prop('checked')) {
            open = 1;
        }
        createAlbumAjax(name, open, description, createAlSuccuessCb, createAlErrorCb)
    }
    $('.js-creat-al-confirm').unbind('click');
    $('.js-creat-al-confirm').on('click', function () {
        if(!$(this).hasClass('btn-disabled')){
            loaddingBtnDis($(this));
            getAlbumContentSubmit(createAlSuccuess, createAlError)
        }
        
    })

}
inputKeyDownBtnUseable($("#al-name"), $('.js-creat-al-confirm'), 1)