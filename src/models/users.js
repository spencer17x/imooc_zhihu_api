import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	__v: { type: Number, select: false },
	name: { type: String, required: true },
	password: { type: String, required: true, default: '111', select: false },
	avatar_url: { type: String, select: false },
	gender: { type: String, enum: ['male', 'female'], default: 'male', required: true, select: false },
	headline: { type: String, select: false },
	locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topics' }], select: false },
	business: { type: Schema.Types.ObjectId, ref: 'Topics', select: false },
	employments: {
		type: [
			{ company: { type: Schema.Types.ObjectId, ref: 'Topics' }, job: { type: Schema.Types.ObjectId, ref: 'Topics' } }
		],
		select: false
	},
	educations: {
		type: [
			{
				school: { type: Schema.Types.ObjectId, ref: 'Topics' },
				major: { type: String },
				diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
				entrance_year: { type: Number },
				graduaction_year: { type: Number }
			}
		],
		select: false
	},
	introduction: { type: String, select: false },
	following: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], select: false },
	followingTopics: { type: [{ type: Schema.Types.ObjectId, ref: 'Topics' }], select: false }
});

export default model('User', userSchema);
