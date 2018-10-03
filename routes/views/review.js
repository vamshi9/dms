const keystone = require('keystone');
const Review = keystone.list('Review');

exports = module.exports = (req, res) => {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'review';
	locals.reviewTypes = Review.fields.reviewType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.reviewSubmitted = false;

    // todo: review template :- vamsi
	view.on('post', { action: 'review' }, (next) => {

		const newReview = new Review.model();
		const updater = newReview.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'student, bitsId, professor, project, semester, howSatisfied , reviewType, comments, email, phone',
			errorMessage: 'There was a problem submitting your review:',
		}, (err) => {
			if (err) {
				locals.validationErrors = err.errors;
                // console.log(validationErrors.name)
			} else {
				locals.reviewSubmitted = true;
			}
			next();
		});
	});

	view.render('review');
};
