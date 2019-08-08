var mysql = require('mysql')
// 创建连接
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
})
// connection.connect()

// 这个控制器完成所有与用户相关的增加删除修改和查询


// 实现登陆验证
exports.login = (email,callback) => {
    // 创建sql语句 
    var sql = `select * from users where email = "${email}"`
    // 调用Mysql模块
    connection.query(sql,(err,results) => {
        // 返回操作结果
        if(err){
            callback(err)
        }else{
            // results:查询返回一个一个结果集(数组)，如果数据有数据，则只有一条数据
            // 访问一个不存在的变量：*** is not defined
            // 访问一个对象不存在的属性，则返回undefined
            callback(null,results[0])
        }
    })
}