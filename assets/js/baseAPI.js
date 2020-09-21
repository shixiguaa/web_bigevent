//发请求之前先调用这个函数
$.ajaxPrefilter(function (options) {
    // 统一配置跟地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一配置headers请求
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status && res.responseJSON.status === 1 && res.responseJSON.status === '身份认证失败！') {
            localStorage.removeItem('token');
            localStorage.removeItem('myname');
            window.parent.location.href = 'login.html'
        }
    }
})
