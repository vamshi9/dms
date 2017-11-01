var keystone = require('keystone');
exports = module.exports = function(req,res){
  var view  = new keystone.View(req,res);
  var locals = res.locals;
  locals.section = 'calendar';
  locals.filters = {
    calendar : req.params.calendar,
  };
  locals.data = {
     calendar : [],
  };
  view.on('init',function(next){
      var q  = keystone.list('Calendar').model.findOne({
          slug : locals.filters.calendar
      });
      q.exec(function(err,result){
        locals.data.calendar = result;
        next(err);
      });
  });
  view.render('calendar');
}
