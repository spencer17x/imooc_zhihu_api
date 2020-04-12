import Topics from '../models/topics';

export default new class TopicsCtrl {
	/**
	 * 获取所有话题
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getAllTopics(ctx) {
		let { per_page = 2, page = 1 } = ctx.query;
		per_page = Math.max(per_page * 1, 1);
		page = Math.max(page * 1, 1) - 1;
		const topics = await Topics.find({
			name: new RegExp(ctx.query.q, 'i')
		}).limit(per_page).skip(page * per_page);
		ctx.body = topics;
	}
	
	/**
	 * 获取特定话题
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async findById(ctx) {
		const { fields = '' } = ctx.query;
		const selectFields = fields.split(';').filter(Boolean).map(v => `+${v}`).join('');
		const topic = await Topics.findById(ctx.params.id).select(selectFields);
		ctx.body = topic;
	}
	
	/**
	 * 新增话题
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async create(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: true },
			avatar_url: { type: 'string', required: false },
			introduction: { type: 'string', required: false },
		});
		const topic = await new Topics(ctx.request.body).save();
		ctx.body = topic;
	}
	
	/**
	 * 更新话题
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async update(ctx) {
		ctx.verifyParams({
			name: { type: 'string', required: false },
			avatar_url: { type: 'string', required: false },
			introduction: { type: 'string', required: false },
		});
		const topic = await Topics.findByIdAndUpdate(ctx.params.id, ctx.request.body);
		ctx.body = topic;
	}
};
