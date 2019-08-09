const formidable = require('formidable');
var path = require('path');

exports.uploadFile = (req,res)=>{
    //使用Formidable来实现文件的上传
    // 1.创建文件上传对象
    var form = new formidable.IncomingForm()
    // 2.设置编码：这个编码的设置与文件上传没有本质的关系，只不过formidable可以传递普通的键值对，所以需要设置对这些参数的编码
    form.encoding = 'utf-8'
    // 3.设置文件存储目录
    form.uploadDir = __dirname + '/../uploads'
    // 4.设置保留文件扩展名
    form.keepExtensions = true
    // 5.调用方法实现文件上传
    // req：请求报文，传递的文件数据就是在请求报文的请求体中
    // 回调函数的三个参数
    // err:错误信息
    // fields:普通键值对
    // files:文件上传完成之后的相关信息，主要是存储上传成功后的信息
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.json({
                code:400,
                msg:'文件上传失败'
            })
        }else{
            var imgname = path.basename(files.img.path)
            res.json({
                code:200,
                msg:'文件上传成功',
                img:imgname
            })
        }
    })
}