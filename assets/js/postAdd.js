$(function(){
    //一选择文件就实现文件的上传操作
    $('#feature').on('change',function(){
        //使用formdata +ajax
        // FormData收集图片数据
        // ajax发起异步请求
        // 1.获取文件对象
        var myfile = document.querySelector('#feature').files[0]
        // 2.创建formdata对象
        var formdata = new FormData();
        // 3.在formdata中追加数据
        formdata.append('img',myfile);
        formdata.append('username',"名字叫:小蝌蚪")
        // 4.使用ajax发起请求
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            contentType:false,
            processData:false,
            dataType:'json',
            success:function(res){
                console.log(res)
                if(res.code === 200){
                    //实现预览，为img标签设置src属性，让浏览器进行解析，发起二次请求
                    $('.thumbnail').attr('src','/uploads/'+ res.img).show()
                    // 将图片名称存储到指定的隐藏域中
                    $('[name="feature"]').val(res.img)
                }else{
                    $('.alert-danger >span').text(res.msg).fadeIn(500).delay(2000).fadeOut(500)
                }
            }
        })

    })

    //动态加载分类数据
    $.ajax({
        type:'get',
        url:'/getAllcate',
        dataType: 'json',
        success:function(res){
            console.log(res)
            //生成分类下拉列表的动态结构
            var str = '<option value="all">所有分类</option>'
            for(var i=0; i<res.data.length; i++){
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('#category').html(str)
        }
    })

    //创建ckeditor富文本框控件替换页面中的textarea
    // 它会创建一个富文本框对象
    CKEDITOR.replace('content')

    //保存文件
    $('.btnsave').on('click',function(){
        // 同步数据到textarea
        CKEDITOR.instances.content.updateElement()
        $.ajax({
            type:'post',
            url:'/addPost',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                if(res.code===200){
                    // console.log(res)
                    location.href = '/admin/posts'
                }else{
                    console.log(res.msg)
                }
            }
        })
    })
})