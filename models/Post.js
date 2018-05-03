var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	defaultSort : 'createdAt',
	track : true
});

Post.add({
	title: { type: String, required: true },
	author: { type: Types.Relationship, ref: 'User', index: true,hidden:true},
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Textarea, wysiwyg: true, height: 75 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
