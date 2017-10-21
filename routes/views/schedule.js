var keystone = require('keystone');

exports = module.exports = function(req,res){
      var view = new keystone.View(req,res);
      var locals = res.locals;

      //set locals
      locals.section = 'schedule';

      //render views
      view.render('schedule',{title : 'Schedule'});
}
