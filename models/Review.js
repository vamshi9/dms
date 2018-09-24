const keystone = require('keystone');
const Types = keystone.Field.Types;

const Review = new keystone.List('Review', {
	nocreate: true,
    noedit: true,
    autokey : {path : 'slug', from : 'student' , unique : true},
	map: {name: 'student'}
});

Review.add({
	student: {type:String, required:true},
	bitsId: {type:String, required:true},
	professor: { type: Types.Name, required: true },
	project: {type: String, required: true},
	semester: {type: Types.Select, options:'1,2'},
	howSatisfied: {type: Types.Select, options:'1,2,3,4,5,6,7,8,9,10'},
	reviewType: { type: Types.Select, options: [
		{ value: 'regular', label: 'Just leaving a feedback' },
		{ value: 'interruption', label: 'Something is wrong' },
		{ value: 'other', label: 'Something else...' },
	], required: true },
	comments: { type: Types.Markdown, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	createdAt: { type: Date, default: Date.now },
});

Review.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Review.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Review.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	const review = this;
	const brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'review-notification',
			transport: 'mailgun',
		}).send({
			to: admins,
			from: {
				name: 'DMS',
				email: 'contact@datams.com',
			},
			subject: 'New Review for dataMS',
			review: review,
			brand: brand,
			layout: false,
		}, callback);
	});
};

Review.defaultSort = '-createdAt';
Review.defaultColumns = 'student, professor, reviewType, createdAt';
Review.register();
