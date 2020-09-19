//发请求之前先调用这个函数
$.ajaxPrefilter(function (options) { 
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})