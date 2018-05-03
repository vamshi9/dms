var keystone = require('keystone');
    Teaching = keystone.list('teaching');
    User = keystone.list('User');
exports = module.exports = function(req,res){
    var view = new keystone.View(req,res);
    
    var locals = res.locals;
    locals.section = 'teaching';
    locals.data = {
        teachingData :[],
        year : ''
    }
    view.on('init',function(next){
        var year = req.body.year || 2018;
        var teaching = Teaching.model.find().where('year',year).populate('author');
        teaching.exec(function(err,results){
            locals.data.teachingData = results;
            locals.data.year = year;
            //for(var x in locals.data.teachingData){
              //  locals.data.teachingData[x].year = year;
                //var userInfo = User.model.findOne(updatedby).exec(function(err,user){
                   //locals.data.teachingData[x].updatedBy = "vamshi"; 
                  //console.log(x + " is  " + locals.data.teachingData[x]);
                 // locals.data.teachingData[x].concat({'a' : 'b'});
               // });
               // locals.data.teachingData[x] = JSON.stringify(locals.data.teachingData[x]) + {'a' : 'b'};
            //}
           //console.log(locals.data.teachingData)            
            next(err);
        });    
    });
    view.render('teaching');     
}