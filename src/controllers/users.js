import User from '../models/users';

export default new class UserCtrl {
	
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
			name: 'string'
		});
		const user = await new User({
			name: ctx.request.body.name
		}).save();
		ctx.body = `add successfully ${JSON.stringify(user)}`;
	}
	
	/**
	 * 通过 id 更新用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updateUserById(ctx) {
		const user = await User.findByIdAndUpdate(ctx.params.id, {
			name: ctx.request.body.name
		});
		if (!user) {
			ctx.throw(412, '无该用户');
		}
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
};
