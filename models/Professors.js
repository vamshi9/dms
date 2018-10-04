const keystone = require('keystone');
const Types = keystone.Field.Types;

const Professors = new keystone.List('professors', {
	autokey: { path: 'slug', from: 'name', unique: 'true' },
	map: { name: 'name' },
	defaultSort: 'ranking',
});

Professors.add({
	name: { type: String },
	pic: { type: Types.CloudinaryImage, public_Id: 'slug', autoCleanup: true },
	role: { type: String },
	ranking: { type: Number },
	info: { type: String },
	specialization: { type: Types.TextArray },
	profileUrl: { type: String },
});

Professors.register();
