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
		// 分页功能
		let { per_page = 2, page = 1 } = ctx.query;
		per_page = Math.max(per_page * 1, 1);
		page = Math.max(page * 1, 1) - 1;
		const users = await User.find().limit(per_page).skip(page * per_page);
		ctx.body = users;
	}
	
	/**
	 * 通过 id 查询用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getUserById(ctx) {
		const { fields = '' } = ctx.query;
		const selectFields = fields.split(';').map(v => `+${v}`).join(' ');
		const user = await User.findById(ctx.params.id).select(selectFields);
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
			avatar_url: { type: 'string', required: false },
			gender: { type: 'enum', values: ['male', 'female'], required: false },
			headline: { type: 'string', required: false },
			locations: { type: 'array', itemType: 'string', required: false },
			business: { type: 'string', required: false },
			employments: { type: 'array', itemType: 'object', required: false },
			educations: { type: 'array', itemType: 'object', required: false }
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
	
	/**
	 * 获取某个用户的关注列表
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async listFollowing(ctx) {
		const user = await User.findById(ctx.params.id).select('+following').populate('following');
		if (!user) {
			ctx.throw(412, '用户不存在');
		}
		ctx.body = user.following;
	}
	
	/**
	 * 检查用户是否存在
	 * @param ctx
	 * @param next
	 * @returns {Promise<void>}
	 */
	async checkUserExist(ctx, next) {
		const user = await User.findById(ctx.params.id);
		if (!user) {
			ctx.throw(412, '用户不存在');
		}
		await next();
	}
	
	/**
	 * 关注某个用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async follow(ctx) {
		const me = await User.findById(ctx.state.user._id).select('+following');
		if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
			me.following.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
	}
	
	/**
	 * 取关某个用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async unfollow(ctx) {
		const me = await User.findById(ctx.state.user._id).select('+following');
		const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
		if (index > -1) {
			me.following.splice(index, 1);
			me.save();
		}
		ctx.status = 204;
	}
	
	/**
	 * 获取用户的粉丝
	 * @param ctx
	 */
	async getUserFollowers(ctx) {
		const followers = await User.find({
			following: ctx.params.id
		});
		ctx.body = { followers };
	}
};
