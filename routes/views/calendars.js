var keystone = require('keystone');
exports = module.exports = function(req,res){
     var view  = new keystone.View(req,res);
     var locals = res.locals;
     locals.section = 'calendar';
     locals.data ={
       calendars:[],
     };
     /**Current message -occurs when http request comes in**/
     view.on('init', function (next) {
     		var q = keystone.list('Calendar').model.find();
     		q.exec(function (err, result) {
     			locals.data.calendars = result;
     			next(err);
     		});
   	});
    view.render('calendars');
}
