const keystone = require('keystone');
const Types = keystone.Field.Types;

var Research = new keystone.List('research', {
	autokey: { path: 'slug', from: 'title', unique: 'true' },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});


Research.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'Submitted, Ongoing , Completed', default: 'Submitted' },
	principalInvestigator: { type: String },
	coInvestigator: { type: String },
	fundingAgency: { type: String },
	sanctionedAmount: { type: Number, note: 'lakhs' },
	On: { type: Types.Date, dependsOn: { state: 'Submitted' } },
	from: { type: Types.Date, dependsOn: { state: ['Ongoing', 'Completed'] } },
	to: { type: Types.Date, dependsOn: { state: ['Ongoing', 'Completed'] } },
});

/** Can we call it with one function?**/
Research.schema.virtual('onDate').get(function () {
	return this._.On.format('D MMMM YYYY');
});

Research.schema.virtual('fromDate').get(function () {
	return this._.from.format('D MMMM YYYY');
});

Research.schema.virtual('toDate').get(function () {
	return this._.to.format('D MMMM YYYY');
});
/** ????**/

Research.defaultColumns = 'title, state|20% principalInvestigator, fundingAgency, sanctionedAmount';
Research.register();
