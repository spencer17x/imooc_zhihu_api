import KoaRouter from 'koa-router';
import { HomeCtrl } from '../controllers';

const homeRouter = new KoaRouter();

homeRouter.get('/', HomeCtrl.render.bind(HomeCtrl));

export default homeRouter;
