$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比   16/9   4/3
        aspectRatio: 1,

        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 文件更新事件
    $('#file').on('change', function (e) {
        var files = e.target.files;
        // 如果没有图片提示用户选择
        if (files.length === 0) {
            return layer.msg('请选择图片');
        }
        var file = e.target.files[0];
        var imgurl = URL.createObjectURL(file);
        // 销毁，重新设置路径，重新设置选区
        $image.cropper('destroy').attr('src', imgurl).cropper(options)

    })
    // 绑定事件
    $('.checkpic').on('click', function () {
        $('#file').click();

    })
    // 上传头像点击事件
    $('.toload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('上传头像成功')
                setTimeout(() => {
                    window.parent.getuser1();
                    window.parent.location.href = '/index.html'
                }, 1000);

            }
        })

    })
})