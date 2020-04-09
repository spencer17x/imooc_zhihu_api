import jwt from 'jsonwebtoken';
import User from '../models/users';
import { jwtSecret } from '../config';

export default new class UserCtrl {
	
	/**
	 * 登录
	 * @param ctx
	 * @retur ns {Promise<void>}
	 */
	async login(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: true },
			password: { type: 'string', required: true }
		});
		const user = await User.findOne(ctx.request.body);
		if (!user) {
			ctx.throw(412, '用户名或密码错误');
		}
		const { name, _id } = user;
		const token = jwt.sign({
			name,
			_id
		}, jwtSecret, {
			expiresIn: '1d'
		});
		ctx.body = { token };
	}
	
	/**
	 * 获取所有用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getAllUsers(ctx) {
		const users = await User.find();
		ctx.body = users;
	}
	
	/**
	 * 通过 id 查询用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getUserById(ctx) {
		const user = await User.findById(ctx.params.id);
		if (!user) {
			ctx.throw(412, '无该用户');
		}
		ctx.body = user;
	}
	
	/**
	 * 添加用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async addUser(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: true },
			password: { type: 'string', required: true },
		});
		const repeatedUser = await User.findOne({
			name: ctx.request.body.name
		});
		if (repeatedUser) ctx.throw(409, '用户名已存在');
		const user = await new User(ctx.request.body).save();
		ctx.body = `add successfully ${JSON.stringify(user)}`;
	}
	
	/**
	 * 通过 id 更新用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updateUserById(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: false },
			password: { type: 'string', required: false },
		});
		const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.body = `update successfully ${JSON.stringify(user)}`;
	}
	
	/**
	 * 通过id删除指定用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async deleteUserById(ctx) {
		const user = await User.findByIdAndRemove(ctx.params.id);
		if (!user) {
			ctx.throw(412, '无该用户');
		}
		ctx.status = 204;
	}
	
	/**
	 * 检查是否有权限
	 * @param ctx
	 * @param next
	 * @returns {Promise<void>}
	 */
	async checkOwner(ctx, next) {
		if (ctx.params.id === ctx.state.user._id) {
			ctx.throw(403, '没有权限');
		}
		await next();
	}
};
