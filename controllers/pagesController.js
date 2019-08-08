// 这个模块主要用于返回用户所请求的页面
var querystring = require('querystring')
// 约定：所有的后台页面请求都添加/admin
// 前面页面
exports.getIndexPage = (req, res) => {
    res.render('index.ejs')
}
exports.getDetailPage = (req, res) => {
    res.render('detail.ejs')
}
exports.getListPage = (req, res) => {
    res.render('list.ejs')
}

// 后台管理页面
exports.getAdminIndexPage = (req, res) => {
    // 进行登陆状态的验证
    // var mycookie = querystring.parse(req.headers.cookie)
    // if(mycookie.isLogin && mycookie.isLogin == 'true'){
    //     res.render('admin/index.ejs')
    // }else{
    //     // res.render('admin/login.ejs')
    //     // 重定向：以响应头的方式来实现
    //     // 重定向：让url重新指向一个新的值，本质上让url或者路由有一个变化
    //     res.writeHead(301,{
    //         'Location':'/admin/login'
    //     })
    //     res.end()
    // }
    if (req.session.isLogin && req.session.isLogin == 'true') {
        res.render('admin/index.ejs')
    } else {
        res.writeHead(301, {
            'Location': '/admin/login'
        })
        res.end()
    }
}
exports.getAdminCategoriesPage = (req, res) => {
    res.render('admin/categories.ejs')
}
exports.getAdminLoginPage = (req, res) => {
    res.render('admin/login.ejs')
}
exports.getCommentsPage = (req, res) => {
    res.render('admin/comments.ejs')
}
exports.getNavMenusPage = (req, res) => {
    res.render('admin/nav-menus.ejs')
}
exports.getPasswordResetPage = (req, res) => {
    res.render('admin/password-reset.ejs')
}
exports.getPostAddPage = (req, res) => {
    res.render('admin/post-add.ejs')
}
exports.getPostsPage = (req, res) => {
    res.render('admin/posts.ejs')
}
exports.getProfilePage = (req, res) => {
    res.render('admin/profile.ejs')
}
exports.getSettingsPage = (req, res) => {
    res.render('admin/settings.ejs')
}
exports.getSlidesPage = (req, res) => {
    res.render('admin/slides.ejs')
}
exports.getUsersPage = (req, res) => {
    res.render('admin/users.ejs')
}