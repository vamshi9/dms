var keystone = require('keystone');
Types = keystone.Field.Types;

var Contribution = new keystone.List('contribution', {
	autokey: { path: 'slug', from: 'consultancyProject', unique: true },
	map: { name: 'consultancyProject' },
	defaultSort: '-createdAt',
});

Contribution.add({
	consultancyProject: { type: String, required: true },
	costOfTheProject: { type: Number, note: 'lakhs' },
	status: { type: Types.Select, options: 'ongoing,completed' },
	visitorsOrGuestLectures: { type: String },
});

Contribution.defaultComuns = 'consultancyProject, status';
Contribution.register();
