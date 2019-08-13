$(function () {
    //封装刷新
    function init() {
        $.ajax({
            url: '/getAllCate',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('cateListTemp', res))
            }
        })

    }
    init()

    //添加编辑按钮的委托事件
    $('tbody').on('click', '.btnedit', function () {
        // 使用自定义属性的意义在于获取数据的时候可以直接获取到对象
        var obj = $(this).data()
        console.log(obj)
        $('#id').val(obj.id)
        $('#name').val(obj.name)
        $('#slug').val(obj.slug)
        $('.optinfo').text('编辑分类数据')
        $('.btnAdd').hide()
        $('.btnEdit').show()

    })

    //为编辑按钮添加事件
    $('.btnEdit').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/editCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('.alert-danger>span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)

                    $('.optinfo').text('添加分类数据')
                    $('.btnAdd').show()
                    $('.btnEdit').hide()

                    $('[name="id"]').val('')
                    $('[name="name"]').val('')
                    $('[name=slug]').val('')
                    init()

                }
            }
        })
    })

    //为添加按钮绑定事件
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500)

                    $('[name="name"]').val('')
                    $('[name="slug"]').val('')
                    init()
                }
            }
        })
    })

    //使用事件委托的方式实现删除
    $('tbody').on('click', '.btndel', function () {
        if (confirm('请问是否真的需要删除？')) {
            let id = $(this).data('id')
            $.ajax({
                url: '/delCateById?id=' + id,
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        $('.alert-danger > span').text(res.msg)
                        $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500)
                        init()
                    }
                }
            })
        }

    })

    //添加全选和全不选
    $('.chkAll').on('click',function(){
        //1.获取当前全选复选框的checked状态值  
        let status = $('.chkAll').prop('checked') 
        //2.使用这个值对tbody中所有复选框的checked属性赋值
        $('tbody .chkSingle').prop('checked',status)
        //3.判断tbody中被选中的复选框的数量，超过1，则显示批量删除
        if($('tbody .chkSingle:checked').length>1){
            $('.btndels').fadeIn(500)
        }else{
            $('.btndels').fadeOut(500)
        }
    })

    //为tbody中的复选框添加委托事件
    $('tbody').on('click','.chkSingle',function(){
        // 1.获取当前被选中的复选框的数量
        let cnt = $('tbody .chkSingle:checked').length
        // 当前tbody中的所有复选框的数量
        let total = $('tbody .chkSingle').length
        // 2.判断是否显示批量删除
        if(cnt>1){
            $('.btndels').fadeIn(500)
        }else{
            $('.btndels').fadeOut(500)
        }
        //3.判断是否让全选复选框也被选中
        if(cnt==total){
            $('.chkAll').prop('checked',true)
        }else{
            $('.chkAll').prop('checked',false)
        }
    })

    //实现批量删除
    $('.btndels').on('click',function(){
        if(confirm('请问真的需要删除吗')){
            //1.获取tbody中所有被选中的复选框
            var chks= $('tbody .chkSingle:checked')
            //2.遍历这些复选框，获取其对应的id
            let ids =[]
            for(let i=0;i<chks.length;i++){
                ids.push(chks[i].dataset['id'])
            }
            // 发起ajax请求
            $.ajax({
                url:'/delCateById?id='+ids.join(','),
                dataType:'json',
                success:function(res){
                    if(res.code==200){
                        $('.alert-danger >span').text(res.msg)
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                        init()
                    }
                }
            })
        }
    })
    
})