var keystone = require('keystone');
Types = keystone.Field.Types;

var Publications = new keystone.List('Publications', {
	autokey: { path: 'slug', from: 'title', unique: 'true' },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Publications.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'Submitted, Accepted', default: 'Submitted' },
	authors: { type: String },
	journalOrBook: { type: String },
	publishedDate: { type: Types.Date },
});

/** Changing the date format**/
Publications.schema.virtual('date').get(function () {
	return this._.publishedDate.format('D MMMM YYYY');
});

/** Date format change**/

Publications.defaultColumns = 'title, state|20% principalInvestigator, fundingAgency, sanctionedAmount';
Publications.register();
