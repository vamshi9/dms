var keystone = require('keystone');
    Types = keystone.Field.Types;

var Publications = new keystone.List('Publications',{
    autokey     : {path : 'slug', from : 'title', unique : 'true'},
    map         : {name : 'title'},
    defaultSort : '-createdAt'
});

Publications.add({
     title                       : {type : String, required : true},
     state                       : {type : Types.Select, options : 'Submitted, Accepted',default : 'Submitted'},
     author                      : {type : String},
     journal                     : {type : String},
     publishedDate               : {type : Types.Date},
});

/**Can we call it with one function?**/
Publications.schema.virtual('fromDate').get(function () {
    return this._.from.format("D MMMM YYYY"); 
});

Publications.schema.virtual('toDate').get(function () {
    return this._.to.format("D MMMM YYYY"); 
});
/**????**/

Publications.defaultColumns = 'title, state|20% principalInvestigator, fundingAgency, sanctionedAmount';
Publications.register();
