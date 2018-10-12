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
			.then(async results => {
				locals.data.teachingData = results;
				locals.data.year = semester;
				for (const obj of locals.data.teachingData) {
					const userModel = await User.model.findById(obj.updatedBy);
					// console.log(userModel);
					obj.username = userModel.name.first + ' ' + userModel.name.last;
					console.log(obj);
				};
				console.log('Done');
				next();
			})
			.catch(err => {
				console.log(err);
			});
	});
	view.render('teaching');
};
