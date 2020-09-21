$(function () {
    var layer = layui.layer;
    // 刷新数据源
    function getart() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                var res = template("table1", res);
                $('tbody').html(res)
            }
        })
    }
    getart();
    // 添加文章分类功能
    $('#addcate').on('click', function () {
        // 弹框
        var index = layer.open({
            type: 1,
            title: '添加文章分类', //标题
            skin: 'layer-ext-moon', //样式
            area: ['500px', '250px'], //宽高
            content: $('#main').html(),
        });
        // 表单提交         添加事件
        $('#addform').on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/my/article/addcates',
                method: 'POST',
                data: $('#addform').serialize(),
                success: function (res) {
                    // 刷新列表，关闭弹框
                    getart();
                    layer.close(index);
                }
            })
        })
    });
    // 删除功能
    $('tbody').on('click', '#artdel', function () {
        // 获取对应的ID
        var artid = $(this).parent().attr('class')
        // 弹框及对应事件
        var index = layer.confirm('确定删除？', {
            btn: ['确定', '先留着'] //按钮
        }, function () {
            $.ajax({
                url: '/my/article/deletecate/' + artid,
                method: 'GET',
                success: function (res) {
                    if (res.status != 0) { 
                        layer.msg(res.message)
                    }
                    getart();
                    layer.close(index)
                }
            })
        }, function (index) {
            layer.close(index)
        });
    });
    // 修改功能
    $('tbody').on('click', '#artchange', function () {
        var artid = $(this).parent().attr('class')
        $.ajax({
            url: '/my/article/cates/' + artid,
            method: 'GET',
            success: function (res) {
                changeart(res);
            }
        })
        // 修改分类内容事件
        function changeart(res) {
            // 渲染模板     根据请求回来的数据自动填写内容
            var data = res.data;
            var res = template("change", data);
            // 弹框
            var index = layer.open({
                type: 1,
                title: '修改文章分类',
                skin: 'layer-ext-moon',
                area: ['500px', '250px'], //宽高
                content: res,   //模板填充内容
            });
            $('#changeform').on('submit', function (e) {
                e.preventDefault();
                //拼接数据
                var data = 'Id=' + artid + '&&' + $(this).serialize()
                $.ajax({
                    url: '/my/article/updatecate',
                    method: 'POST',
                    data: data,
                    success: function (res) {
                        getart();
                        layer.close(index);
                    }
                })
            })
        }

    });
})