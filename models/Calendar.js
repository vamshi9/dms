var keystone = require('keystone');
    Types = keystone.Field.Types;
var Calendar = new keystone.List('Calendar',{
    map:{name:'title'},
    autokey:{path:'slug',from:'title',unique:true},
    singular : 'calendar',
    plural : 'calendars',
});
Calendar.add({
    title : {type : String,required : true},
    state: { type: Types.Select, options: 'Query, Information, Task', default: 'Query' },
    author: { type: Types.Relationship, ref: 'User' },
    email : {type: Types.Email, displayGravatar: true},
    createdAt: { type: Date, default: Date.now },
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 10 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    },
});
Calendar.defaultColumns = 'title, state|20%, author, publishedAt|15%';
Calendar.schema.virtual('url',function(){
     return '/calendar/' + this.slug;
});

Calendar.register();
