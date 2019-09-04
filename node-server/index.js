const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const Router = require('koa-router');
const koaBody = require('koa-body')
const cloud = require('tcb-admin-node');

const router = new Router({
  prefix:"/fellow"
});

//跨域处理
app.use(cors({
  // origin: ['http://localhost:9527'],
  origin: function(ctx) {
    return [ctx.request.header.origin];
  },
  maxAge: 5,
  credentials: true
}));
//请求参数初始化
app.use(koaBody());
//小程序初始化
cloud.init({
  secretId: 'AKIDUO9fwzDTqujJdi6AYhfQwGLBm7C9rUmo',
  secretKey: 'zkHYhbGfoiNq4A2f2B6nFRVKuEI7gz2w',
  env:"test1-ge532"  
});

//控制器
let user = require('./controller/user.js');
let student = require('./controller/student.js')
router.use('/user', user.routes());
router.use('/student',student.routes())

//使用router
app.use(router.routes());

//监听端口号
app.listen(3000,()=>{
  console.log("server is running at port 3000.")
});
