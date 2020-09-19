$(function () {
    $('.tozhuce').on('click', function () {
        $('.login-form').hide().siblings().show();
    });
    $('.tologin').on('click', function () {
        $('.zhuce-form').hide().siblings().show();
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        console.log($(this).serialize());
    })

    // 从layui中获取form对象和layer对象
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        // 调用verify   校验密码框内容（限定字数）
        pwd: [/^[\S]{6,12}$/, '密码长度为6-12位。且不能有空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 获取密码框的值
            var psw = $('.zhuce-form [name=upsw1]').val();
            if (value != psw) {
                $('.zhuce-form [name=upsw2]').val("")
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
            //data:$(this).serialize(),
            data: {
                username: $('.zhuce-form [name=uname]').val(),
                password: $('.zhuce-form [name=upsw1]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status == 1) {
                    layer.msg(res.message)
                } else if (res.status == 0) { 
                    layer.msg('注册成功，请登录');
                    $('.tologin').click();
                }
            }
        })
    })
    // 登录表单提交事件
    $('#login-form').submit(function (e) {
        e.preventDefault();
        var myname = $('.login-form [name=myname]').val();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: myname,
                password: $('.login-form [name=mypsw]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status == 1) {
                    layer.msg(res.message + '请检查用户名和密码是否正确')
                } else { 
                    layer.msg('登陆成功！');
                    // 保存token和用户名
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('myname', myname);
                    location.href = '/index.html'
                }
                
            },
            
        })
    })
})


// {status: 1, message: "用户名被占用，请更换其他用户名！"}
// login.js:10 uname=12345678vdfvdfavasvs&upsw1=12345678&upsw2=12345678
// login.js:40 
// {status: 0, message: "注册成功！"}
// message: "注册成功！"
// status: 0
// __proto__: Object