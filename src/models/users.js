import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	name: { type: String, required: true },
	password: { type: String, required: true, default: '111', select: true },
	__v: { type: Number, select: false }
});

export default model('User', userSchema);
