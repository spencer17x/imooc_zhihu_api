export default new class UserCtrl {
	
	constructor() {
		this.db = [];
	}
	
	/**
	 * 获取所有用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getAllUsers(ctx) {
		ctx.body = this.db;
	}
	
	/**
	 * 通过 id 查询用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getUserById(ctx) {
		const user = this.db.find(user => user.id === +ctx.params.id) || {
			name: 'user does not exist',
			id: null
		};
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
		const addUser = {
			name: ctx.request.body.name,
			id: this.db.length
		};
		this.db.push(addUser);
		ctx.body = `add successfully ${JSON.stringify(addUser)}`;
	}
	
	/**
	 * 通过 id 更新用户
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async updateUserById(ctx) {
		const updateUser = this.db.find(user => user.id === +ctx.request.body.id);
		updateUser.name = ctx.request.body.name;
		ctx.body = `update successfully ${JSON.stringify(updateUser)}`;
	}
};
