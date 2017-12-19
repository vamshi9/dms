var keystone = require('keystone');
exports = module.exports = function(req,res){
     var view  = new keystone.View(req,res);
     var locals = res.locals;
     locals.section = 'research';
     locals.data = {
          current : [],
          done : [],
          future : []
     };
     view.on('init',function(next){
          var q = keystone.list('Research').model.find();
          q.exec(function(err,result){
            for(i=0,j=0,k=0,l=0;i<result.length;i++){
                if(result[i].state == 'Current'){
                     locals.data.current[j]= result[i];
                     j++;
                     //console.log("current data is " + locals.data.current.length + " : "+ locals.data.current);
                }else if (result[i].state == 'Done') {
                     locals.data.done[k]= result[i];
                     k++;
                     //console.log("Done with this : " + locals.data.done);
                }else if (result[i].state=='Future') {
                     locals.data.future[l]=result[i];
                     l++;
                     //console.log("Upcoming projects : " + locals.data.future);
                }
            }
            next(err);
          })
     })
     view.render('researchs');
}
