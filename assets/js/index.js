// 定义layui对象
var layer = layui.layer;

// 发送获取用户数据请求
function getuser1() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status == 1) {
                location.href = '/login.html';
            }
            // 渲染用户信息（头像和名字）
            getuser(res.data);

        }
    })
}
getuser1();


// 渲染用户信息函数
function getuser(user) {
    $('.userinfo').show();
    // 有昵称就先渲染昵称，否则就渲染登录名
    let myname = user.nickname || user.username;
    let mypic = user.user_pic;
    if (!mypic) {
        // 如果没有头像，就获取用户名的第一个字母（汉字）显示在头像区
        $('.avatar').show().html(myname[0].toUpperCase()).parent().find($('img')).hide();
    } else {
        $('.avatar').show().prop('src', mypic).parent().find($('.text-avatar')).hide();
    }
    $('.myname').html('欢迎&nbsp;&nbsp;' + myname);
}
// 退出事件
$('#loginout').on('click', function () {
    // 弹窗
    layer.confirm('确定退出？', {
        btn: ['溜了溜了', '再看看'] //按钮
    }, function () {
        // 删除token，跳回登录页面
        localStorage.removeItem('token');
        location.href = './login.html';
    }, function () {

    });

})