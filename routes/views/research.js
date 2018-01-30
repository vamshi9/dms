var keystone = require('keystone');
    Research = keystone.list('research');
exports = module.exports =function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;
    
    //Set Locals
    locals.section = 'research';
    locals.data = {
        ongoing: [],
        completed: []
    }

    //Load the research projects
    view.on('init',function(next){
       var onGoing  = Research.model.find().where('state','Ongoing').sort('from');
       var completed  = Research.model.find().where('state','Completed').sort('from');
       onGoing.exec(function(err,results){
             locals.data.ongoing = results;  
             console.log("ongoing projects : " + locals.data.ongoing);          
             next(err);
       });
       completed.exec(function(err,results){
            locals.data.completed = results;          
            console.log("completed projects : " + locals.data.completed);  
            next(err);
       });
       
    });
    view.render('research');
}