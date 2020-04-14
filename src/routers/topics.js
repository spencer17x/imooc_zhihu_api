import KoaRouter from 'koa-router';
import { TopicsCtrl } from '../controllers';
import { auth } from './users';

const topicsRouter = new KoaRouter({
	prefix: '/topics'
});

topicsRouter.get('/', TopicsCtrl.getAllTopics.bind(TopicsCtrl));

topicsRouter.get('/:id', TopicsCtrl.findById.bind(TopicsCtrl));

topicsRouter.get('/:id/followers', TopicsCtrl.getTopicFollower.bind(TopicsCtrl));

topicsRouter.post('/', auth, TopicsCtrl.create.bind(TopicsCtrl));

topicsRouter.patch('/:id', auth, TopicsCtrl.update.bind(TopicsCtrl));

export default topicsRouter;
