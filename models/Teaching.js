const keystone = require('keystone');
const Types = keystone.Field.Types;

var Teaching = new keystone.List('teaching', {
	autokey: { path: 'slug', from: 'title', unique: 'true' },
	map: { name: 'title' },
	defaultSort: '-createdAt',
	track: true,
});

Teaching.add({
	title: { type: String, required: true },
	courseCode: { type: String, initial: true },
	// sem: { type: Types.Select, options: 'semI,semII' },
	sem: { type: Types.Select, options: '2008 sem I, 2008 sem II,2009 sem I, 2009 sem II, 2010 sem I, 2010 sem II, 2011 sem I, 2011 sem II, 2012 sem I, 2012 sem II, 2013 sem I, 2013 sem II, 2014 sem I, 2014 sem II, 2015 sem I, 2015 sem II, 2016 sem I, 2016 sem II, 2017 sem I, 2017 sem II, 2018 sem I, 2018 sem II, 2019 sem I, 2019 sem II, 2020 sem I, 2020 sem II' },
	professorName: { type: String },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
});

/* virtuals for sem here*/
// Teaching._.year.format('YYYY');
Teaching.defaultColumns = 'title , course , professorName';
Teaching.register();
