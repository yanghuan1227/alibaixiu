// 实现所有分类数据相关操作
var conn = require('../utils/myconn.js')

// 获取所有分类数据
exports.getAllCate = (callback) => {
    var sql = 'select * from categories'
    conn.query(sql,(err,data) => {
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
}