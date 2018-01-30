var keystone = require('keystone');
    Research = keystone.list('research');
exports = module.exports =function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;
    
    //Set Locals
    locals.section = 'research';
    locals.data = {
        research: []
    }

    //Load the research projects
    view.on('init',function(next){
       var q  = Research.model.find().where('state','Ongoing').sort('from');
       
       q.exec(function(err,results){
             locals.data.research = results;
             //console.log(locals.data.research);
             next(err);
       })
    });
    view.render('research');
}