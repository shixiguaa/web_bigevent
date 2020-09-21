$(function () {
    // $('.turnagain').on('click', function () {
    //     $('#userform')[0].reset();

    // });
    var form = layui.form;
    var layer = layui.layer;
    // 表单验证事件
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码长度为6-12位。且不能有空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 获取密码框的值
            var psw = $('#userform [name=newPwd]').val();
            if (value != psw) {
                $('#userform [name=newPwd1]').val("")
                return '两次密码不一致，请重新输入'
            }
        }
    })
    // 表单提交事件
    $('#userform').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status == 1) {
                    return layer.msg(res.message)
                }
                layer.msg('密码修改成功')
                // 调用父页面的方法，重新渲染用户信息
                // $('#userform')[0].reset();
                setTimeout(() => {
                    window.parent.location.href = '/index.html'
                }, 500);

            }
        })
    })
})