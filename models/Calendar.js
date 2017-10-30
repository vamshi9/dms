var keystone = require('keystone');
var Types = keystone.Field.Types;

var Calendar = new keystone.List('calendar',{
      map : {name : 'title'},
      autokey: { path: 'slug', from: 'title', unique: true },
});

Calendar.add({
      title : {type :String , required:true},
      state: { type: Types.Select, options: 'Query, Information, Task', default: 'Query', index: true },
    	author: { type: Types.Relationship, ref: 'User', index: true },
    	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    	image: { type: Types.CloudinaryImage },
    	content: {
    		brief: { type: Types.Html, wysiwyg: true, height: 150 },
    		extended: { type: Types.Html, wysiwyg: true, height: 400 },
    	},
});
Calendar.register();
