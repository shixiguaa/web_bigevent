$(function () {
    // 发送获取用户信息的请求，渲染表单内容
    // 定义变量存放用户ID
    var userid = '';
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            // 动态填充表单数据
            var user = res.data;
            form.val('userform',user);
            userid = res.data.id;
            // 返回用户名，用于后面的清空表单时填充登录名
            return username = user.username;
        }
    })

    $('.turnagain').on('click', function () {
        $('#userform')[0].reset();
        $('.myname').val(username);
    });

    // 表单验证事件
    var form = layui.form;
    form.verify({
        username: [/^[\S]{6,12}$/, '用户名长度为6-12位。且不能有空格'],
    })

    // 表单提交事件
    $('#userform').on('submit', function (e) {
        e.preventDefault();
        // 拼接数据  
        let data = 'id=' + userid + '&' + $('#userform').serialize();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: data,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }

                // 调用父页面的方法，重新渲染用户信息，并跳转到首页
                layer.msg(res.message);
                setTimeout(() => {
                    window.parent.getuser1();
                    window.parent.location.href = '/index.html'
                }, 500);

            }
        })
    })
})