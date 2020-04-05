import KoaRouter from 'koa-router';
import { UsersCtrl } from '../controllers';

const usersRouter = new KoaRouter({
	prefix: '/users'
});

usersRouter.get('/', UsersCtrl.getAllUsers.bind(UsersCtrl));

usersRouter.post('/', UsersCtrl.addUser.bind(UsersCtrl));

usersRouter.patch('/', UsersCtrl.updateUserById.bind(UsersCtrl));

usersRouter.get('/:id', UsersCtrl.getUserById.bind(UsersCtrl));

export default usersRouter;
