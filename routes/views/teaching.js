const keystone = require('keystone');
const Teaching = keystone.list('teaching');
const User = keystone.list('User');

exports = module.exports = (req, res) => {
	var view = new keystone.View(req, res);

	var locals = res.locals;
	locals.section = 'teaching';
	locals.data = {
		teachingData: [],
		year: '',
	};
	view.on('init', (next) => {
		const semester = req.body.semester || '2018 sem I';
		// console.log(semester);
		Teaching.model.find({ sem: semester }).populate('author')
			.exec()
			.then(results => {
				locals.data.teachingData = results;
				locals.data.year = semester;
				for (const obj of locals.data.teachingData) {
					User.model.findById(obj.updatedBy)
						.exec()
						.then(user => {
							obj.username = user.name.first + user.name.last;
							console.log(obj);
						});
				}
				next();
			})
			.catch(err => {
				console.log(err);
			});
			// console.log(locals.data.teachingData[0]);
			// console.log(locals.data.teachingData);
	});
	view.render('teaching');
};
