var keystone = require('keystone');
var Types = keystone.Field.Types;

var Review = new keystone.List('Review', {
	nocreate: true,
    noedit: true,
    autokey : {path : 'slug', from : 'name' , unique : true},
});

Review.add({
	//studentName: {type:String, required:true},
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	reviewType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	message: { type: Types.Markdown, required: true },
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

	var review = this;
	var brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'review-notification',
			transport: 'mailgun',
		}).send({
			to: admins,
			from: {
				name: 'dataMS',
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
Review.defaultColumns = 'name, email, reviewType, createdAt';
Review.register();
