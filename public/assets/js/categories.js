//发送ajax请求,向服务器端所有的分页列表数据
$('#cateForm').on('submit',function(){
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
		url: '/categories',
		data: formData,
        success:function(){
            location.reload();

        }
    });
    return false;
})

//获取分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        //将服务器端返回的数据和html模板进行拼接
        var html = template('categoryListTpl',{data:response});
        //将拼接好的内容放到页面中
        $('#categoryBox').html(html);          
    }
})




//为编辑按钮添加点击事件
// $('#categroyBox').on('click','.edit',function(){
//     //获取要修改的分类数据的id
//     var 
// })