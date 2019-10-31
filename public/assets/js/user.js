// 当表单发生提交行为的时候
$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function () {
			alert('用户添加失败')
		}
	})
    // console.log(formData);
    //// 阻止表单的默认提交行为
    return false;
})

//添加用户头像和预览功能
//1.给input绑定change事件
$('#modifyBox').on('change','#avatar',function () {
	// 用户选择到的文件
	// this.files[0]
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			console.log(response)
			// 实现头像预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
});

//获取用户列表
$.ajax({
	url:'/users',
	type:'get',
	success:function(response){
		// console.log(response);
		// 使用模板引擎将数据和HTML字符串进行拼接
		var html = template('userTpl',{data:response});
		// console.log(html);
		// 将拼接好的字符串显示在页面中
		$('#userBody').html(html)

	}
})

// 通过事件委托的方式为编辑按钮添加点击事件 
$('#userBody').on('click','.edit',function(){
	// 获取被点击用户的id值
	var id = $(this).attr('data-id');
	// 根据id获取用户的详细信息
	// console.log(id);
	$.ajax({
		type:'get',
		url:`/users/${id}`,
		success:function(data){
			console.log(data);
			var html = template('modifyTpl', data);
			$('#modifyBox').html(html);
		}
	})
	
// 编辑用户 为修改表单添加表单提交事件
$('#modifyBox').on('submit',"#modifyForm",function(){
	var formData = $(this).serialize();
	// 获取要修改的那个用户的id值
	var id = $(this).attr('data-id');
    // 向服务器端发送修改用户的请求
	$.ajax({
		type: 'put',
		url:`/users/${id}` ,
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		}
	})
    // console.log(formData);
    //// 阻止表单的默认提交行为
    return false;	













})















})
