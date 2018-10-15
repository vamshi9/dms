const keystone = require('keystone');
const Professors = keystone.list('professors');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'home';
	locals.data = {
		professorsList: [],
	};

	// Load the Publications projects
	view.on('init', function (next) {
		const professors = Professors.model.find().sort('ranking');

		professors.exec(function (err, results) {
			locals.data.professorsList = results;
			// console.log('submittted projects : ' + locals.data.professorsList);
			next(err);
		});

	});

	/**
	// todo: user tour through website
	*/

	view.render('index');
};
