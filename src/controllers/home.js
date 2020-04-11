import path from 'path';

export default new class HomeCtrl {
	async render(ctx) {
		ctx.body = 'welcome to my website';
	}
	
	/**
	 * 上传文件
	 * @param ctx
	 * @returns {Promise<void>}
	 */
	async upload(ctx) {
		const { path: filePath } = ctx.request.files.file;
		const basename = path.basename(filePath);
		const url = `${ctx.origin}/uploads/${basename}`;
		ctx.body = { url };
	}
};
