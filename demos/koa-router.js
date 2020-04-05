const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const usersRouter = new Router({
  prefix: '/users'
});
const router = new Router();

router.get('/', ctx => {
  ctx.body = '首页';
});

usersRouter.get('/', ctx => {
  ctx.body = '用户列表';
});

usersRouter.post('/', ctx => {
  ctx.body = '创建用户';
});

usersRouter.get('/:id', ctx => {
  ctx.body = `用户${ctx.params.id}`;
});

app.use(router.routes());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(8080);
