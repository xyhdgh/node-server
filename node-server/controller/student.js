const Router = require('koa-router');
let router = new Router();
const cloud = require('tcb-admin-node');
const db = cloud.database({
  env: "test1-ge532"
});
const testuser = db.collection("t_user")
//   /student/list
//接收请求
router.get("/list", async (ctx, next) => {
  console.log(ctx.query)
  let res = null;
  res = await testuser.get().then((res) => {
    return res
  })
  ctx.body = {
    code: 20000,
    data: res
  }

})

router.post("/delSingle", async (ctx, next) => {
  console.log(ctx.request.body)
  try {
    await testuser.where({
      _id: ctx.request.body.id
    }).remove()
  } catch(e) {
    console.error(e)
  }

  ctx.body = {
    code: 20000,
    data: "删除成功!"
  }

})

router.post("/upDate", async (ctx, next) => {
  console.log(ctx.request.body._id)
  let uObj = ctx.request.body 
  try {
    await testuser.where({
      _id: ctx.request.body._id
    })
    .update({
      username: uObj.username
      
    })
  } catch(e) {
    console.error(e)
  }

  ctx.body = {
    code: 20000,
    data: "修改成功!"
  }

})

module.exports = router;