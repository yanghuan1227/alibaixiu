
var itcast = {
    // 获取路由名称
    getRouterName:(str)=>{
        let index = str.indexOf('?') // 查询参数标记
        let routerName = ''
        if(index == -1){ // 说明没有参数
            routerName = str.substring(str.lastIndexOf('/')+1)
        }else{
            routerName = str.substring(str.lastIndexOf('/')+1,str.indexOf('?'))
        }
        return routerName
    },
    //获取参数
    // str:?id=5&name=jack
    getParameter:(str)=>{
        var obj= {};
        //去除?
        str= str.substring(1);
        //按&符号分割
        let temp = str.split('&');
        //遍历
        for(let i=0; i<temp.length; i++){
            let arr = temp[i].split('=');
            obj[arr[0]]=arr[1]
        }
        return obj
    }

}