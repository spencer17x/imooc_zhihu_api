import Koa from 'koa';
import koaBody from 'koa-body';
import error from 'koa-json-error';
import parameter from 'koa-parameter';
import mongoose from 'mongoose';
import koaStatic from 'koa-static';
import path from 'path';
import routing from './routers';
import { connectionStr } from './config';

/**
 * 自定义错误捕获
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 * @constructor
 */
const ErrorCapture = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.body = {
			status: err.status || 500,
			message: err.message
		};
	}
};

mongoose.connect(
	connectionStr,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => console.log('MongoDB 连接成功')
);

console.log('env: ', process.env.NODE_ENV);

const app = new Koa();

app.use(koaStatic(path.join(__dirname, '/public'))).use(koaBody({
	multipart: true,
	formidable: {
		uploadDir: path.join(__dirname, '/public/uploads'),
		keepExtensions: true
	}
})).use(error({
	postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

parameter(app);

routing(app);

app.listen(8080, () => {
	console.log('服务启动成功');
});
