import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
const usersRouter = new Router({
  prefix: '/users'
});
const app = new Koa();

router.get('/', async ctx => {
  ctx.body = '首页';
});

usersRouter.get('/', async ctx => {
  ctx.body = '获取到用户列表所有数据';
});

usersRouter.get('/:id', async ctx => {
  ctx.body = `获取用户${ctx.params.id}`;
});

usersRouter.post('/:id', async ctx => {
  ctx.body = `添加用户${ctx.params.id}`;
});

usersRouter.delete('/:id', async ctx => {
  ctx.body = `删除用户${ctx.params.id}`;
});

app.use(router.routes());
app.use(usersRouter.routes());

app.use(router.allowedMethods());
app.use(usersRouter.allowedMethods());

app.listen(8080);
