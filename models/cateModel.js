// 实现所有分类数据相关操作
var conn = require('../utils/my-conn.js')

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

//实现分类数据的编辑
exports.editCate=(obj,callback)=>{
    var sql = 'update categories set ? where id = ?'
    conn.query(sql,[obj,obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

//实现分类数据的新增
exports.addCate=(obj,callback)=>{
    var sql = 'insert into categories set ?'
    conn.query(sql,obj,(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

//实现分类数据的删除
exports.delCateById=(ids,callback)=>{
    var sql = `delete from categories where id in (${ids})`
    conn.query(sql,(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

