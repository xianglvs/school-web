layui.use(['form', 'layedit', 'laydate'], function () {
  var form = layui.form,
    layer = layui.layer;
  //表单初始赋值
  form.val('loginform', {
    "username": getCookie('username') ? unescape(getCookie('username')) : '',
    "password": getCookie('password'),
    "remember": getCookie('remember')
  });
  //监听提交
  form.on('submit(signin)', function (data) {
    //如果选择了记住密码就把用户名和密码保存30天
    var remember = data.field.remember && data.field.remember == 'on' ? 1 : 0;
    var username = data.field.username;
    var password = data.field.password;
    var md5Pwd = hex_md5(password);

    if (remember == 1) {
      setCookie('remember', 'on', 24 * 30);
    } else {
      delCookie('remember');
    }

    $.ajax({
      type: "POST",
      url: "/interface/api/sysUser/login",
      contentType: "application/json",
      data: JSON.stringify({
        "loginId": username,
        "password": md5Pwd
      }),
      success: function (result) {
        if (result.code != 0) {
          layer.msg('用户名或密码错误，请重试。');
          return false;
        } else {
          setCookie('username', escape(username), 2);
          setCookie('officeName', escape(result.data.officeName), 2);
          $.ajax({
            type: "POST",
            url: "/interface/api/token",
            contentType: "application/json",
            data: JSON.stringify({
              "loginId": username,
              "password": md5Pwd
            }),
            success: function (result) {
              setCookie('expireTime', result.data.expireTime, 1);
              setCookie('token', result.data.token, 1);
              window.location.href = '/';
            },
            error: function (data) {}
          });
        }
        return;
      },
      error: function (data) {
        alert("下载模板失败！");
      }
    });
    return false;
  });
});