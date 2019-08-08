// 1.引入express
const express = require('express')
const router = require('./router.js')
const bodyParser = require('body-parser')
const session = require('express-session')
// 2.创建服务器
const app = express()
// 3.添加端口监听
app.listen(3001, () => {
    console.log('http://127.0.0.1:3001')
})

// 在express中使用session中间件,因为默认情况下，express并不会开启sesison的使用
app.use(session(
    {
        // 加盐
        secret: 'my_albx_35',//相当于一个加密密钥，值可以是任意字符串
        resave: false,//强制session保存到session store中,不管Session有没有更新，都强制保存
        saveUninitialiazed: false //强制没有‘初始化’的session保存到storage中
    }
))

// 配置body-parser
// xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
// 处理psot方式的请求
// extended: false：将参数字符串转换为对象
app.use(bodyParser.urlencoded({ extended: false }))
// 后期你可能会传递json格式字符串
app.use(bodyParser.json())

// 5.托管静态资源
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 6.配置ejs模板引擎
app.set('view engine', 'ejs')
// 下面这句代码是进行ejs模板文件查询的默认目录配置，下面这句代码写完之后，以后所有的ejs资源都会云指定的__dirname+"/views"
app.set('views', __dirname + "/views")


// 添加全局的中间件，每次请求都会经过这个中间件
app.use(function (req, res, next) {
    // 三种场合不用登陆
    // 1.登陆页
    // 2.前面三个页面不用登陆
    // 3.有登陆状态
    if (req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1) {
        next()
    } else {
        // redirect:实现重定向
       res.redirect('/admin/login')
    } 
})

// 让app使用Router进行路由管理
app.use(router)

