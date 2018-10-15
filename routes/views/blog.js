const keystone = require('keystone');
const async = require('async');
// const User = keystone.list('User');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;
			// console.log(locals.data.categories);


			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				// console.log(result);
				next(err);
			});
		} else {
			next();
		}
	});

	view.on('init', (next) => {

		const q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			// perPage: 5,
			//maxPages: 10,
			// filters: {
			// 	state: 'published',
			// },
		})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		// todo: get username
		q.exec((err, results) => {
			locals.data.posts = results;
			next(err);
		});
	});

	view.render('blog');
};
