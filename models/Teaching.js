var keystone = require('keystone');
    Types = keystone.Field.Types;

var Teaching = new keystone.List('teaching',{
    autokey : {path : 'slug', from : 'title' , unique : 'true'},
    map : {name : 'title'},
    defaultSort : '-createdAt',
    track:true
});    

Teaching.add({
    title : {type : String, required :true},
    course : {type : String},
    semester : {type : Types.Select, options : 'semesterI,semesterII'},
    year : {type : Types.Select , options : '2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018'},
    professorName : {type : String},
    description : {type: Types.Html, wysiwyg: true, height: 150 }
});

/*virtuals for semester here*/
//Teaching._.year.format('YYYY');
Teaching.defaultColumns = 'title , course , professorName';
Teaching.register();
