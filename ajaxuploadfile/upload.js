//
// ajax 上传文件+ajax post参数
// 
function ajaxFileUpload(url, postParams, fileIds)
{

    $.ajaxFileUpload
    (
        {
            url: url,               //post url
            secureuri: false,
            fileElementId: fileIds, //文件上传ids, 格式为对象, 支持多文件
            dataType: 'json',
            data: postParams,       //其他post参数, 格式为对象
            beforeSend:function()
            {
                $("#loading").show();
            },
            complete:function()
            {
                $("#loading").hide();
            },
            success: function (data, status)
            {
                console.debug(data);
                document.location.reload();
                if(typeof(data.error) != 'undefined')
                {
                    if(data.error != '')
                    {
                        alert(data.error);
                    }else
                    {
                        alert(data.msg);
                    }
                }
            },                 
            error: function (data, status, e)
            {
                alert(e);
            }
        }
    )

    return false;
} 

