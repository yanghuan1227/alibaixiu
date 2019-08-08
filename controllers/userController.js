// 这个控制器完成所有与用户相关的业务操作
const userModel = require('../models/userModel.js')
// 用户登陆验证
exports.login = (req,res) => {
    // 接收参数
    var obj = req.body
    // 业务处理--调用数据模块
    userModel.login(obj.email,(err,data)=>{
        if(err){
            // send：实现类型转换
            // res.send({code:400,msg:'服务器异常'})
            // json:可以直接将js对象转换json格式字符串并返回
            res.json({code:400,msg:'服务器异常'})
        }else{
            // 判断有没有查询到结果集
            if(data){
                // 再判断密码是否正确
                if(data.password == obj.password){
                    // 写入登陆状态
                    // res.writeHead(200,{
                    //     'Set-Cookie':'isLogin=true'
                    // })
                    // 使用session写入登陆状态
                    req.session.isLogin = 'true'
                    // 将当前用户对象存储到Session
                    req.session.currentUser = data

                    res.end(JSON.stringify({code:200,msg:'登陆成功'})) 
                }else{
                    res.json({code:400,msg:'密码输入错误'}) 
                }
            }else{
                res.json({code:400,msg:'邮箱输入错误'}) 
            }
        }
    })
    // 返回结果
}