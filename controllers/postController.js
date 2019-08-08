// 这个控制器完成所有与文章相关的业务处理
const postsModel = require('../models/postsModel.js')
const moment = require('moment')

// 获取所有文章列表数据
exports.getAllPost = (req,res) => {
    // 获取用户参数
    var obj = req.query
    // 调用数据模块
    postsModel.getAllPost(obj,(err,data) => {
        if(err){
            res.json({code:400,msg:'数据查询失败'})
        }else{
            // 转换
            // for(var i=0;i<data.length;i++){
            //     // moment():如果没有传递参数，就获取当前日期值进行转换，如果需要转换指定的日期，则需要传递参数
            //     // format：进行格式化，里面进行自定义的格式设置
            //     data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss')
            // }
            res.json({
                code:200,
                msg:'数据查询成功',
                data:data
            })
        }
    })
}