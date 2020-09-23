$(function () {
    // 登录/注册跳转功能
    $('.tozhuce').on('click', function () {
        $('.login-form').hide().siblings().show();
    });
    $('.tologin').on('click', function () {
        $('.zhuce-form').hide().siblings().show();
    })


    // 从layui中获取form对象和layer对象
    var form = layui.form;
    var layer = layui.layer;


    // 表单验证事件
    // verifyform(zhuce_form);
    form.verify({
        // 调用verify   校验密码框内容（限定字数）
        pwd: [/^[\S]{6,12}$/, '密码长度为6-12位。且不能有空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 获取密码框的值
            var psw = $('#zhuce-form [name=upsw1]').val();
            if (value != psw) {
                $('#zhuce-form [name=upsw2]').val("")
                return '两次密码不一致，请重新输入'
            }
        }
    })


    // 注册表单提交事件
    $('#zhuce-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('#zhuce-form [name=uname]').val(),
                password: $('#zhuce-form [name=upsw1]').val()
            },
            success: function (res) {
                if (res.status == 1) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录');
                $('.tologin').click();


            }
        })
    })
    // 登录表单提交事件
    $('#login-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status == 1) {
                    return layer.msg(res.message + '请检查用户名和密码是否正确')
                }
                layer.msg('登陆成功！');
                // 保存token,跳转至首页
                setTimeout(() => {
                    localStorage.setItem('token', res.token);
                    location.href = './index.html'
                }, 500);


            },

        })
    })
})