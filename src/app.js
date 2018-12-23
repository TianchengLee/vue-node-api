'use strict'

const express = require('express');
const bodyParser = require('body-parser')

let app = express();

// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));

//1.0 初始化orm
const orm = require('orm');
app.use(orm.express('mysql://root:root@127.0.0.1:3306/dtcmsdb4',{
	define:function(db,models,next){
  
		next();
	}
}));

//2.0 将所有api的请求响应content-type设置为application/json
app.all('/api/*',(req,res,next)=>{
	//设置允许跨域响应报文头
	//设置跨域
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "X-Requested-With");
	// res.header("Access-Control-Allow-Methods","*");

	res.setHeader('Content-Type','application/json;charset=utf-8');
	next();
});

//2.0 设置路由规则
const apiRoute = require('./routes/apiRoute.js');
app.use('/',apiRoute);

app.listen(8888,()=>{

	console.log('api服务已启动, :8888');
});

// 大多数跨域只存在开发阶段

// 开发阶段:
// 后台人员:192.168.1.111:8888
// 前端代码运行:192.168.1.222:80

// 项目上线:
// 后台人员代码部署:172.163.22.11:80
// 前端人员代码部署:172.163.22.11:80

// JSONP:只支持get请求 需要前后端同时更改代码
// CORS:只需要后端更改代码 同时支持所有请求 但是安全性得不到保障
// 代理: 前端开发人员代码运行在 192.168.1.222:80 要去请求 后台的 192.168.1.111:8888(浏览器会跨域)
// 前端开发人员在本地搭建一个代理服务器(192.168.1.222:80) 使用服务器去请求 192.168.1.111:8888 (服务器发生请求不会跨域)
// 拿到数据之后 封装成自己需要的数据 进行返回
