//这个文件吃力所有文章的数据操作
//引入连接对象
const connection = require('../utils/my-conn');

exports.getAllpost = (obj, callback) => {
    //使用多表连接查询
    // var sql = `select posts.*,users.nickname,categories.name
    //             from posts
    //             join users on posts.user_id = users.id
    //             join categories on posts.category_id = categories.id`

    var sql = `select posts.*,users.nickname,categories.name
                from posts
                join users on posts.user_id = users.id
                join categories on posts.category_id = categories.id
                where 1=1`
    if (obj.cate && obj.cate != 'all') { //有没有传递分类数据
        sql += `and category_id = '${obj.cate}'`
    }
    if (obj.status && obj.status != 'all') {
        sql += `and posts.status = '${obj.status}'`
    }

    sql += `order by id desc
            limit ${(obj.pageNum-1)*obj.pageSize},${obj.pageSize}`

    //调用方法获取数据
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err);
        } else {
            //在创建sql语句，进行总记录的查询
            callback(null, results);
            sql += `SELECT COUNT(*) as cnt
                    FROM posts
                    JOIN users ON posts.user_id = users.id
                    JOIN categories ON posts.category_id = categories.id`
            connection.query(sql,(err2,results2)=>{
                if(err2){
                    callback(err2)
                }else{
                    callback(null,{data:results,total:results2[0].cnt})
                }
            })
        }
    })
}