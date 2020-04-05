import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-body';

const router = new KoaRouter();
const usersRouter = new KoaRouter({
	prefix: '/users'
});
const app = new Koa();

const db = [];

router.get('/', async ctx => {
	ctx.body = 'welcome to my website';
});

usersRouter.get('/', async ctx => {
	ctx.body = db;
});

usersRouter.post('/', async ctx => {
	const addUser = {
		name: ctx.request.body.name,
		id: db.length
	};
	db.push(addUser);
	ctx.body = `add successfully ${JSON.stringify(addUser)}`;
});

usersRouter.patch('/', async ctx => {
	const updateUser = db.find(user => user.id === +ctx.request.body.id);
	updateUser.name = ctx.request.body.name;
	ctx.body = `update successfully ${JSON.stringify(updateUser)}`;
});

usersRouter.get('/:id', async ctx => {
	const user = db.find(user => user.id === +ctx.params.id) || {
		name: 'user does not exist',
		id: null
	};
	ctx.body = user;
});

app
	.use(koaBody())
	.use(router.routes())
	.use(usersRouter.routes())
	.use(router.allowedMethods())
	.use(usersRouter.allowedMethods());

app.listen(8080, () => {
	console.log('服务启动成功');
});
