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
})