let _ = require('lodash');
var keystone = require('keystone');

exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Blog', key: 'blog', icon :'border_color' ,href : '/blog'},
		//{ label: 'Gallery', key: 'gallery', icon:'filter',href:'/gallery'},
		{ label : 'Research', key : 'research' , icon:'track_changes',href:'research'},
		{ label : 'Publications', key : 'publications', icon:'library_books',href:'publications'},
		{ label : 'Teaching Initiatives', key : 'teaching', icon:'spa',href:'teaching-initiatives'}
	];
	res.locals.user = req.user;
	
	var userInfo = req.user;
	//console.log(userInfo);

    if(typeof userInfo === 'undefined'){
		res.redirect('/admin/signin');
	}else{
		if(userInfo.name.first != "HOD"){
			keystone.set('nav',{
					posts: ['posts', 'post-categories'],
					galleries: 'galleries',
					research : 'research',
					publications : 'publications',
					teaching : 'teaching',
					reviews : 'reviews',
					departmentContribution : 'contribution'
			});
		}else{
			keystone.set('nav',{
					posts: ['posts', 'post-categories'],
					galleries: 'galleries',
					enquiries: 'enquiries',
					users: 'users',
					research : 'research',
					publications : 'publications',
					teaching : 'teaching',
					reviews : 'reviews',
					departmentContribution : 'contribution'
			});
		}
	}
	next();
};


exports.initErrorHandlers = function(req, res, next) {

    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }

    next();

};

exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};

exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/admin/signin');
	} else {
		next();
	}
};
