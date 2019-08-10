$(function(){
    // 定义全局的页码和页数量
    var pageNum = 1
    var pageSize = 2
   

    function init(search){
        $.ajax({
            url:'/getAllPost',
            type:'get',
            // 分页查询需要参数
            data:{
                pageNum:pageNum,
                pageSize:pageSize,
                ...search
            },
            success:function(result){
                console.log(result)
                // 生成动态数据结构
                // 如果数据是对象，直接传递对象，如果数据是数组，就包装为对象
                var html = template('postListTemp',result.data)
                $('tbody').html(html)
                // // 生成分页结构
                setPagenation(Math.ceil(result.data.total / pageSize))
            }
        })
    }
    init()

    // 实现分页功能
    function setPagenation(total){
        // 初始化
        $('.pagination').bootstrapPaginator({
            // 配置
            bootstrapMajorVersion:3,
            currentPage:pageNum, // 当前页码
            totalPages:total, // 总页数
            onPageClicked:function(event,originalEvent,type,page){
                // page就是你当前想获取数据的页码
                // 修改全局pageNum
                pageNum = page
                // 重新调用加载数据的方法
                init()
            }
        })
    }


    // 加载分类数据
    $.ajax({
        type:'get',
        url:'/getAllCate',
        dataType:'json',
        success:function(res){
            console.log(res)
            // 生成分类下拉列表动态结构
            var str = '<option value="all">所有分类</option>'
            for(var i = 0; i< res.data.length;i++){
                str += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('.cateSelector').html(str)
        }
    })

    // 实现筛选功能
    $('.btn-search').on('click',function(){
        // 收集数据
        var obj = {
            cate:$('.cateSelector').val(),
            status:$('.statuSelector').val()
        }
        console.log(obj)
        // 发起ajax请求
        init(obj)
    })

    //实现文章的删除
    $('tbody').on('click','.btnDel',function(){
        var id = $(this).data('id')
        //弹出确认
        if(confirm('请问是否真的需要删除？')){
            $.ajax({
                url:'/delPostById?id='+id,
                type:'get',
                dataType:'json',
                success:function(res){
                    if(res.code===200){
                        $('.alert-danger>span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(3000).fadeOut(500)
                        // 刷新的细节
                        // 1.如果当前页只有一条记录，那么删除之后就应该加载 上一页的数据
                        // 2.如果当前页有多条记录，那么就直接重新加载这一页
                        // 3.如果是第一页，只有一条记录，那么就给出提示
                    }
                }
            })
        }

    })
})