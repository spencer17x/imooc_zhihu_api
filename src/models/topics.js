import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const topicsSchema = new Schema({
	__v: { type: Number, select: false },
	name: { type: String, required: true },
	avatar_url: { type: String },
	introduction: { type: String, select: false },
	followers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], select: false }
});

export default model('Topics', topicsSchema);
