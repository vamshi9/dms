var keystone = require('keystone');
middleware = require('./middleware');
importRoutes = keystone.importer(__dirname);
User = keystone.list('User');
multer = require('multer');


keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

var routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {
	/* Multer Pending*/

	// multer uplaoding to local destination
	// const storage = multer.diskStorage({
	// 	destination: function (req, file, cb) {
	// 		console.log(req);
	// 		cb(null, './public/images')
	// 	},
	// 	filename: function (req, file, cb) {
	// 	cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	// 	}
	// });
	// const upload = multer({ storage: storage }).single('profilePic');

	// Views
	app.get('/', middleware.requireUser, routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/research', routes.views.research);
	app.get('/publications', routes.views.publications);
	app.get('/profile', function (req, res) {
		res.render('profile.hbs');
	});
	app.all('/review', routes.views.review);
	app.all('/teaching-initiatives', routes.views.teaching);
	app.all('/contact', routes.views.contact);

	/* Multer Pending*/
	// app.post('/update',(req, res) => {


	// 	var updatedFirst = req.body.first_name;
	// 		updatedLast = req.body.last_name;
	// 	if(updatedFirst!='' && updatedLast!=''){

	// 		req.user.name.first = updatedFirst;
	// 		req.user.name.last = updatedLast;
	// 	}
	// 	//console.log(req.user.name.first);
	// 	req.user.save(function(saveError){
	// 		if(saveError){
	// 			console.log(saveError);
	// 		}
	// 	});

	// 	upload(req,res,(err) =>{
	// 		if (err) {
	// 			res.render('profile',{
	// 				msg : err
	// 			});
	// 		}else{
	// 			console.log(req);
	// 			res.redirect('/profile');
	// 			//res.send('test');
	// 		}
	// 	})

	// });
};
