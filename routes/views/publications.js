var keystone = require('keystone');
    Publications = keystone.list('publications');
exports = module.exports =function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;
    
    //Set Locals
    locals.section = 'publications';
    locals.data = {
        submitted: [],
        ongoing: [],
        completed: []
    }

    //Load the Publications projects
    view.on('init',function(next){
       var submitted = Publications.model.find().where('state',"Submitted").sort('from');
       var onGoing  = Publications.model.find().where('state','Ongoing').sort('from');
       var completed  = Publications.model.find().where('state','Completed').sort('from');
       
       submitted.exec(function(err,results){
            locals.data.submitted = results;
            //console.log("submittted projects : " + locals.data.submitted);
            next(err);
       });
       onGoing.exec(function(err,results){
            locals.data.ongoing = results;  
            //console.log("ongoing projects : " + locals.data.ongoing);          
            next(err);
       });
       completed.exec(function(err,results){
            locals.data.completed = results;          
            //console.log("completed projects : " + locals.data.completed);  
            next(err);
       });
       
    });
    view.render('publications');
}