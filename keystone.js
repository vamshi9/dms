
require('dotenv').config();

const keystone = require('keystone');
const handlebars = require('express-handlebars');
const port = process.env.PORT || 7000
keystone.init({
	'name': 'DMS',
	'brand': 'DMS',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
    'mongo' : process.env.MONGO_URI,
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

keystone.import('models');

keystone.set('admin path','admin');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('cloudinary config', process.env.CLOUDINARY_URL);
keystone.set('cookie secret', process.env.COOKIE_SECRET);

keystone.set('signin logo','../images/logo.png');
keystone.set('signin url','/');
keystone.set('signin redirect','/');


// if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
// 	console.log('----------------------------------------'
// 	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
// 	+ '\n----------------------------------------'
// 	+ '\nYou have opted into email sending but have not provided'
// 	+ '\nmailgun credentials. Attempts to send will fail.'
// 	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
// 	+ '\nset up your mailgun integration');
// }

keystone.set('port',port);
keystone.start();
