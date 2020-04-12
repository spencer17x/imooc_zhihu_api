import KoaRouter from 'koa-router';
//import jwt from 'jsonwebtoken';
import koaJwt from 'koa-jwt';
import { UsersCtrl } from '../controllers';
import { jwtSecret } from '../config';

const usersRouter = new KoaRouter({
	prefix: '/users'
});

//const auth = async (ctx, next) => {
//	try {
//		const { authorization = '' } = ctx.request.header;
//		const token = authorization.replace('Bearer ', '');
//		const user = jwt.verify(token, jwtSecret);
//		if (user) {
//			ctx.state.user = user;
//		}
//	} catch (e) {
//		ctx.throw(401, e.message || '用户未授权');
//	}
//	await next();
//};

export const auth = koaJwt({ secret: jwtSecret });

usersRouter.get('/', UsersCtrl.getAllUsers.bind(UsersCtrl));

usersRouter.get('/:id/following', UsersCtrl.listFollowing.bind(UsersCtrl));

usersRouter.put('/:id/follow', auth, UsersCtrl.checkUserExist.bind(UsersCtrl), UsersCtrl.follow.bind(UsersCtrl));

usersRouter.delete('/:id/unfollow', auth, UsersCtrl.checkUserExist.bind(UsersCtrl), UsersCtrl.unfollow.bind(UsersCtrl));

usersRouter.get('/:id/followers', auth, UsersCtrl.getUserFollowers.bind(UsersCtrl));

usersRouter.post('/', auth, UsersCtrl.addUser.bind(UsersCtrl));

usersRouter.post('/login', UsersCtrl.login.bind(UsersCtrl));

usersRouter.patch('/:id', auth, UsersCtrl.checkOwner.bind(UsersCtrl), UsersCtrl.updateUserById.bind(UsersCtrl));

usersRouter.delete('/:id', auth, UsersCtrl.checkOwner.bind(UsersCtrl), UsersCtrl.deleteUserById.bind(UsersCtrl));

usersRouter.get('/:id', UsersCtrl.getUserById.bind(UsersCtrl));

export default usersRouter;
