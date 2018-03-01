var keystone = require('keystone');
    Types = keystone.Field.Types;

var Reviews = new keystone.List('reviews',{
    autokey : {  path : 'slug', from : 'student' ,unique : true},
    map : {name : 'student'},
    defaultSort : '-createdAt'
});

Reviews.add({
    student : {type : String , required : true},
    progress : {type :Types.Select, options : 'Excellent, V Good, Good, Satisfactory, NC'},
    comments : {type: Types.Html, wysiwyg: true, height: 150 },
    semester : {type : Types.Select,options: '1,2'},
    //Year : {type : Types.Date}
});

Reviews.defaultColumns = 'student';
Reviews.register();