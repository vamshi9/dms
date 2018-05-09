var keystone =require('keystone');
    Reviews = keystone.list('reviews');

exports = module.exports = function(req,res){
    var views = new keystone.View(req,res);
    var locals = res.locals;
    locals.data = {
        reviews : []
    };
    views.on('init',function(next){
        var reviews = Reviews.model.find();
        reviews.exec(function(err,results){
            locals.data.reviews = results;
            console.log(locals.data.reviews);
            next(err);
        });
    });
    views.render('reviews');
}