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
	email: { type: String, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
	phoneNumber: { type: String, match: /(?:\d{3}|\d{4})-\d{6}/, default: '040-123456' },
	specialization: { type: Types.TextArray },
	profileUrl: { type: String },
});

Professors.register();
