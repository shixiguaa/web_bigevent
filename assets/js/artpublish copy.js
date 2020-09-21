$(function () {
    // 定义layui对象
    var layer = layui.layer;
    var form = layui.form;

    var artstate = '';
    var $image = '';
    // 接收上一个页面传过来的id值
    var params = new URLSearchParams(location.search);

    var artId = params.get('id');
    // console.log(artId);
    if (!artId) {
        $('.cardtitle').html('写文章');
        comment();
        initcate();
        initEditor();
        // 图片裁剪工具功能
        $image = $('#image')
        // 1.2 配置选项
        const options = {
            // 纵横比   16/9   4/3
            aspectRatio: 16 / 9,

            // 指定预览区域
            preview: '.img-preview'
        }

        // 1.3 创建裁剪区域
        $image.cropper(options)
    } else {
        $('.cardtitle').html('编辑文章');
        comment();
        initcate(getart);

        function getart() {
            $.ajax({
                url: '/my/article/' + artId,
                method: 'GET',
                success: function (res) {
                    console.log(res);
                    var art = res.data;
                    // 初始化表单文字信息
                    form.val('artpublish', art)

                    // 富文本初始化
                    initEditor();


                    // 初始化图片信息
                    // 图片裁剪工具功能
                    $image = $('#image')
                    $('#image').attr('src', 'http://ajax.frontend.itheima.net' + art.cover_img)
                    // 1.2 配置选项
                    const options = {
                        // 纵横比   16/9   4/3
                        aspectRatio: 16 / 9,

                        // 指定预览区域
                        preview: '.img-preview'
                    }

                    // 1.3 创建裁剪区域
                    $image.cropper(options)
                }
            })
        }
    }
    // //文章发布状态
    // var artstate = '';






    function comment() {



        // 图片文件变化事件
        $('#file').on('change', function (e) {
            // 获取文件列表
            var files = e.target.files;
            if (files.length === 0) {
                return layer.msg('请选择图片');
            } else {
                var file = e.target.files[0];
                var imgurl = URL.createObjectURL(file);
                // 销毁，重新设置路径，重新设置选区
                $image.cropper('destroy').attr('src', imgurl).cropper(options)
            }
        });

        //选择图片 绑定事件
        $('.checkpic').on('click', function () {
            $('#file').click();

        });


        $('.topublish1').on('click', function (e) {
            artstate = '已发布';
        })
        $('.topublish2').on('click', function (e) {
            artstate = '草稿';
        })
    }


    // 富文本初始化


    // 下拉选择框数据渲染
    function initcate(callback) {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                // 根据返回数据渲染模板
                var res = template("select1", res);
                $('#artcate').html(res);
                // 必写事件
                form.render();
                callback && callback();
            }
        })
    };






    // 发布文章事件
    // 定义文章发布默认状态
    var art_state = '已发布';
    $('#artpublish').on('submit', function (e) {
        e.preventDefault();
        // 创建FD对象    现在已经有标题，分类，文章内容三个部分
        var fd = new FormData($(this)[0]);
        // 存放发布状态
        fd.append('state', art_state)
        // 定义图片信息
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                for (var k of fd.entries()) {
                    console.log(k[0] + '   ' + k[1]);
                }
                // 调用发布文章函数
                artpub(fd);
            });

    })
    // 定义发布文章函数
    function artpub(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            // FD格式发送数据，必带两条属性
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('文章发表失败！');
                }
                console.log(res);
                // 发布成功之后跳到文章列表页面
                window.parent.document.querySelector('.artlist').click();
                // window.parent.find('.artlist').click();
                // location.href = '/artlist.html';
            }
        })
    }

    // 存草稿事件     改变文章上传状态


})