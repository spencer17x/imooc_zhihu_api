import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	__v: { type: Number, select: false },
	name: { type: String, required: true },
	password: { type: String, required: true, default: '111', select: false },
	avatar_url: { type: String, select: false },
	gender: { type: String, enum: ['male', 'female'], default: 'male', required: true, select: false },
	headline: { type: String, select: false },
	locations: { type: [{ type: String }], select: false },
	business: { type: String, select: false },
	employments: {
		type: [
			{ company: { type: String }, job: { type: String } }
		],
		select: false
	},
	educations: {
		type: [
			{
				school: { type: String },
				major: { type: String },
				diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
				entrance_year: { type: Date },
				graduaction_year: { type: Date }
			}
		],
		select: false
	},
	introduction: { type: String, select: false },
	following: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], select: false }
});

export default model('User', userSchema);
