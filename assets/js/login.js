$(function(){
    $('.btnLogin').on('click',function(){
        $.ajax({
            type:'post',
            url:'/login',
            dataType:'json',
            // serialize可以获取指定表单中所有拥有name属性的表单元素的value值
            data:$('form').serialize(),
            success:function(res){
                console.log(res)
                if(res.code == 400){
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                }else{
                    // 进行页面跳转
                    location.href='/admin'
                }
            }
        })
    })
})