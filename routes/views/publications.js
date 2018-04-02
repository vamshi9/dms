var keystone = require('keystone');
    Publications = keystone.list('publications');
exports = module.exports =function(req,res){
    var view = new keystone.View(req,res);
    var locals = res.locals;
    
    //Set Locals
    locals.section = 'publications';
    locals.data = {
        submitted: [],
        accepted: []
    }

    //Load the Publications projects
    view.on('init',function(next){
       var submitted = Publications.model.find().where('state',"Submitted").sort('publishedDate');
       var accepted  = Publications.model.find().where('state','Accepted').sort('publishedDate');
       
       submitted.exec(function(err,results){
            locals.data.submitted = results;
            //console.log("submittted projects : " + locals.data.submitted);
            next(err);
       });
       accepted.exec(function(err,results){
            locals.data.accepted = results;          
            //console.log("completed projects : " + locals.data.completed);  
            next(err);
       });
       
    });
    view.render('publications');
}