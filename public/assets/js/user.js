$(function () {
	// 当表单发生提交行为的时候
	$('#userForm').on('submit', function () {
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
	$('#modifyBox').on('change', '#avatar', function () {
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
				// console.log(response)
				// 实现头像预览功能
				$('#preview').attr('src', response[0].avatar);
				$('#hiddenAvatar').val(response[0].avatar)
			}
		})
	});

	//获取用户列表
	$.ajax({
		url: '/users',
		type: 'get',
		success: function (response) {
			// console.log(response);
			// 使用模板引擎将数据和HTML字符串进行拼接
			var html = template('userTpl', { data: response });
			// console.log(html);
			// 将拼接好的字符串显示在页面中
			$('#userBody').html(html)

		}
	})

	// 通过事件委托的方式为编辑按钮添加点击事件 
	$('#userBody').on('click', '.edit', function () {
		// 获取被点击用户的id值
		var id = $(this).attr('data-id');
		// 根据id获取用户的详细信息
		// console.log(id);
		$.ajax({
			type: 'get',
			url: `/users/${id}`,
			success: function (data) {
				console.log(data);
				var html = template('modifyTpl', data);
				$('#modifyBox').html(html);
			}
		})
	})
	// 编辑修改用户信息 为修改表单添加表单提交事件
	$('#modifyBox').on('submit', "#modifyForm", function () {
		var formData = $(this).serialize();
		// 获取要修改的那个用户的id值
		var id = $(this).attr('data-id');
		// 向服务器端发送修改用户的请求
		$.ajax({
			type: 'put',
			url: `/users/${id}`,
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

	//删除用户
	//利用事件委托的方式给删除按钮添加点击事件
	$('#userBody').on('click', '.delete', function () {
		//确认用户是否要进行删除操作
		if (confirm('您真的要删除用户吗?')) {
			// 获取到即将要删除的用户id
			var id = $(this).attr('data-id')
			// 向服务器端端发送请求 删除用户 如果删除成功刷新当前页面,让页面显示最新的内容
			$.ajax({
				type: 'delete',
				url: `/users/${id}`,
				success: function () {
					location.reload()
				}
			})
		}
	})

	//全选与反选
	var selectAll = $('#selectAll');
	//批量删除按钮
	var deleteMany = $('#deleteMany')
	//1.点击全选按钮,决定全选与反选
	selectAll.on('change', function () {
		//使用prop获取当前全选按钮的状态
		var status = $(this).prop('checked');
		//将全选按钮的状态,赋值给每个小的复选框
		$('#userBody').find('.userStatus').prop('checked', status);
		if (status) {
			// 显示批量删除按钮
			deleteMany.show();
		} else {
			// 隐藏批量删除按钮
			deleteMany.hide();
		}
	});

	//2.点击每个小的复选框,实现全选与反选
	$('#userBody').on('change', function () {
		//获取所有的用户
		var inputs = $('#userBody').find('.userStatus')
		//判断用户的数量与复选框购先得数量一致,就说明是全选,否则就不做选择
		//如果数量相等,就让全选按钮勾选上,否则取消勾选
		if (inputs.length === inputs.filter(':checked').length) {
			selectAll.prop('checked', true)
		} else {
			selectAll.prop('checked', false)
		}

		// 如果选中的复选框的数量大于0 就说明有选中的复选框
		if (inputs.filter(':checked').length > 0) {
			// 显示批量删除按钮
			deleteMany.show();
		} else {
			// 隐藏批量删除按钮
			deleteMany.hide();
		}
  });
  
	//为批量删除按钮进行事件绑定
	deleteMany.on('click', function () {
		var ids = [];
		var checkedUser = $('#userBody').find('.userStatus').filter(':checked');

		checkedUser.each(function (index, element) {
			ids.push($(element).attr('data-id'));
		});


    console.log(ids.join('-'))



		if (confirm('您真要确定要进行批量删除操作吗')) {
			$.ajax({
				url: `/users/${ids.join('-')}`,
				type: 'delete',
				success: function () {
					location.reload();
				}
			})
		}

	})



})