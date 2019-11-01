
//发送ajax请求,向服务器端所有的分页列表数据
$('#cateForm').on('submit', function () {
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();

        }
    });
    return false;
})

//获取分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //将服务器端返回的数据和html模板进行拼接
        var html = template('categoryListTpl', { data: response });
        //将拼接好的内容放到页面中
        $('#cateListBox').html(html);
    }
})


//为编辑按钮添加点击事件
$('#cateListBox').on('click', '.edit', function () {
    //获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    //根据id获取详细信息
    $.ajax({
        url: `/categories/${id}`,
        type: 'get',
        success: function (response) {
            // console.log(response);
            var html = template('modifyCategoryTpl', response);
            $('#modifyBox').html(html);
        }
    })
});

//当修改 分类数据表单发生提交行为的时候
$('#modifyBox').on('submit', '#modifyForm', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    // console.log(id);
    //发送ajax请求,修改分类数据
    $.ajax({
        url: `/categories/${id}`,
        type: 'put',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false;
})

//删除功能
// 1.利用事件委托的方式给删除按钮添加点击事件 自定义id
$('#cateListBox').on('click', '.delete', function () {
    // 2.确认管理员是否要进行删除操作
    if (confirm('您真的要删除吗?')) {
        // 3.获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        // 4.向服务器端端发送请求 删除用户 如果删除成功刷新当前页面,让页面显示最新的内容
        $.ajax({
            type: 'delete',
            url: `/categories/${id}`,
            success: function () {
                location.reload();
            }
        })
    }
})

//全选复选框
var selectAll = $('#selectAll');
//批量删除
var deleteMany = $('#deleteMany');
//1.点击全选按钮,决定全选与反选
selectAll.on('change',function(){
    //使用prop获取当前全选按钮的状态
    var status = $(this).prop('checked');
    //将全选按钮的状态,赋值给每个小的复选框
    $('#cateListBox').find('.userStatus').prop('checked',status);
    if(status){
        deleteMany.show();
    }else{
        deleteMany.show();
    }
    

})









