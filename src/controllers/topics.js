import Topics from '../models/topics';

export default new class TopicsCtrl {
	/**
	 * 获取所有话题
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async getAllTopics(ctx) {
		ctx.body = await Topics.find();
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
