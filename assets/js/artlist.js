$(function () {
    // 定义layui对象
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // 初始化请求的数据
    var list = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }

    // 初始化文章类别选择框
    function initcate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                // 根据返回数据渲染模板
                var res = template("select1", res);
                $('#selectart').html(res);
                // 必写事件
                form.render();
            }
        })
    };
    initcate();


    // 筛选功能
    $('#artlist').on('submit', function (e) {
        e.preventDefault();
        // 动态设置请求数据的内容
        list.cate_id = $('#artlist [name=cate_id]').val();
        list.state = $('#artlist [name=state]').val();
        // 更新列表
        getlist();
    })

    // 定义获取文章列表函数

    function getlist() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: list,
            success: function (res) {
               
                var data = template("table1", res);
                $('tbody').html(data)
                // 调入函数，传入total参数
                renderPage(res.total)
            }

        })
    }
    getlist();

    // 分页功能函数


    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: list.pagesize, // 每页显示几条数据
            curr: list.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                list.pagenum = obj.curr;
                list.pagesize = obj.limit;
                if (!first) {
                    getlist();
                }

            }
        })
    }




    //删除事件
    $('tbody').on('click', '.artdel', function () {
        // 获取对应的ID
        var len = $('.artdel').length;
        var artid = $(this).parent().attr('class')
        // 弹框及对应事件
        var index = layer.confirm('确定删除？', {
            btn: ['确定', '先留着'] //按钮
        }, function () {

            $.ajax({
                url: '/my/article/delete/' + artid,
                method: 'GET',
                success: function (res) {
                    if (res.status != 0) {
                        layer.msg(res.message)
                    }
                    // 判断当前页面是否还有数据，没有的话页码减一再重新发请求
                    if (len == 1) {
                        list.pagenum = list.pagenum === 1 ? 1 : list.pagenum - 1;

                    }
                    getlist();
                    layer.close(index)
                }
            })
        }, function (index) {
            layer.close(index)
        });
    });
    // 编辑事件
    $('tbody').on('click', '.artchange', function () {
        // 获取当前行的文章的id值，发请求获取详细信息
        var artid = $(this).parent().attr('class');
        location.href = '/art/artedit.html?id=' + artid;
       
    })
})


