import fs from 'fs';
import path from 'path';

export default function routing(app) {
	const files = fs.readdirSync(__dirname);
	files.map(file => {
		if (file === 'index.js') return;
		import(path.resolve(__dirname, file)).then(r => {
			const router = r.default;
			app.use(router.routes()).use(router.allowedMethods());
		});
	});
}
