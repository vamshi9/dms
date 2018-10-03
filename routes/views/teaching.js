var keystone = require('keystone');
Teaching = keystone.list('teaching');
User = keystone.list('User');
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);

	var locals = res.locals;
	locals.section = 'teaching';
	locals.data = {
		teachingData: [],
		year: '',
        //userName : ''
	};
	view.on('init', function (next) {
		var year = req.body.year || 2018;
		var teaching = Teaching.model.find().where('year', year).populate('author');
		teaching.exec(function (err, results) {
			locals.data.teachingData = results;
			locals.data.year = year;
            // for(var x in locals.data.teachingData){
            //     var updatedby = locals.data.teachingData[x].updatedBy;
            //     var userInfo = User.model.findOne(updatedby).exec(function(err,user){
            //     locals.data.userName = user.name.first + user.name.last;
            //     //console.log(x + " is  " + locals.data.userName);
            //    });
            // }
           // console.log(locals.data.userName)
			next(err);
		});
	});
	view.render('teaching');
};
