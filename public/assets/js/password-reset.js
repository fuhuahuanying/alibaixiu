$(function () {
    //修改密码绑定提交事件
    $('.form-horizontal').on('submit', function () {
      //获取用户在表单中输入的内容
      var formData = $(this).serialize();
      //调用接口 实现密码修改功能
      $.ajax({
        url: `/users/password`,
        type: 'put',
        data: formData,
        success: function (data) {
          // console.log(data);
          location.href="/admin/login.html"
        } 
      })
      return false;
    })
  })