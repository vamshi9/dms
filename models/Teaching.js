var keystone = require('keystone');
    Types = keystone.Field.Types;

var Teaching = new keystone.List('teaching',{
    autokey : {path : 'slug', from : 'title' , unique : 'true'},
    map : {name : 'title'},
    defaultSort : '-createdAt',
    track:true
});    

Teaching.add({
    //Year : {type : Types.select}
    title : {type : String, required :true},
    course : {type : String},
    professorName : {type : String},
    description : {type: Types.Html, wysiwyg: true, height: 150 }
});

/*virtuals for semester here*/

Teaching.defaultColumns = 'title , course , professorName';
Teaching.register();
