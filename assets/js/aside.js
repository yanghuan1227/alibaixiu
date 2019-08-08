$(function(){
    // 0.获取元素
    let menuPosts = $('#menu-posts')
    let menuSettings = $('#menu-settings')
    // 1.获取当前路由名称
    let routerName = itcast.getRouterName(location.href)
    // 2.判断是否满足条件
    if(routerName == 'posts' || routerName == 'post-add' || routerName == 'categories'){
        // 3.实现展开
        menuPosts.addClass('in').attr('aria-expanded',true)
        // console.log(menuPosts.siblings('.collapsed'))
        menuPosts.parent().find('.collapsed').removeClass('collapsed')
    }
    if(routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings'){
        // 3.实现展开
        menuSettings.addClass('in').attr('aria-expanded',true)
    }

    $('#'+routerName).addClass('active')
})