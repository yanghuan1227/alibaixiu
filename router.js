const express = require('express')

// 引入页面返回控制器
const pagesController = require('./controllers/pagesController.js')
const userController = require('./controllers/userController.js')
const postController = require('./controllers/postController.js')
const cateController = require('./controllers/cateController.js')
var router = express.Router()

// 配置路由
// 路由中间件的回调函数，不是我们自己调用的，而是服务器响应请求时进行调用的
// 在调用的时候，会给这个回调函数传入两个参数：req,res
// 后台页面
router.get('/admin',pagesController.getAdminIndexPage)
      .get('/admin/categories',pagesController.getAdminCategoriesPage)
      .get('/admin/login',pagesController.getAdminLoginPage)
      .get('/admin/comments',pagesController.getCommentsPage)
      .get('/admin/nav-menus',pagesController.getNavMenusPage)
      .get('/admin/password-reset',pagesController.getPasswordResetPage)
      .get('/admin/post-add',pagesController.getPostAddPage)
      .get('/admin/posts',pagesController.getPostsPage)
      .get('/admin/profile',pagesController.getProfilePage)
      .get('/admin/slides',pagesController.getSlidesPage)
      .get('/admin/settings',pagesController.getSettingsPage)
      .get('/admin/users',pagesController.getUsersPage)
// 前台页面
      .get('/',pagesController.getIndexPage)

      // 业务处理路由
      .post('/login',userController.login)
      .get('/getAllPost',postController.getAllPost)
      .get('/getAllCate',cateController.getAllCate)

// 暴露
module.exports = router