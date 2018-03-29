var keystone = require('keystone');
	Professors = keystone.list('professors');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';
	locals.data = {
		professorsList: []
	}

	//Load the Publications projects
	view.on('init', function (next) {
		var professors = Professors.model.find().sort('ranking');

		professors.exec(function (err, results) {
			locals.data.professorsList = results;
			//console.log("submittted projects : " + locals.data.professorsList);
			next(err);
		});

	});
	view.render('index');
};
