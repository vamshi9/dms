var keystone = require('keystone');
    Types = keystone.Field.Types;

var Teaching = new keystone.List('Teaching',{
    autokey : {path : 'slug', from : 'title' , unique : 'true'},
    map : {name : 'title'},
    defaultSort : '-createdAt'
});    

Teaching.add({
    //Year : {type : Types.select}
    title : {type : String, required :true},
    course : {type : String},
    professorName : {type : String}
});

/*virtuals for semester here*/

Teaching.defaultColumns = 'title , course , professorName';
Teaching.register();
