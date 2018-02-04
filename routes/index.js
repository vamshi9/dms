var keystone = require('keystone');
    middleware = require('./middleware');
    importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

var routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {
	// Views
	app.get('/',middleware.requireUser,routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/research', routes.views.research);
	app.get('/publications',routes.views.publications);
	app.get('/teaching-initiatives',routes.views.teaching);
	app.all('/contact', routes.views.contact);
};
