var keystone = require('keystone');
    Teaching = keystone.list('teaching');
exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    
    var locals = res.locals;
    locals.section = 'teaching';
    locals.data = {
        teachingData :[]
    }

    view.on('init',function(next){
        var teaching = Teaching.model.find();
        teaching.exec(function(err,results){
            locals.data.teachingData = results;
            next(err);
        });        
    });

    view.render('teaching');     
}