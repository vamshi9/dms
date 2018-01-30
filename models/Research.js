var keystone = require('keystone');
    Types = keystone.Field.Types;

var Research = new keystone.List('research',{
    autokey     : {path : 'slug', from : 'title', unique : 'true'},
    map         : {name : 'title'},
    defaultSort : '-createdAt'
});

Research.add({
     title                : {type : String, required : true},
     state                : {type : Types.Select, options : 'Ongoing , Completed',default : 'Ongoing'},
     projectInvestigator  : {type : String,},
     fundingAgency        : {type : String},
     sanctionedAmount     : {type : Number},
     from                 : {type : Types.Date},
     to                   : {type : Types.Date},
});

/**Can we call it with one function?**/
Research.schema.virtual('fromDate').get(function () {
    return this._.from.format("D MMMM YYYY"); 
});

Research.schema.virtual('toDate').get(function () {
    return this._.to.format("D MMMM YYYY"); 
});
/**????**/

Research.defaultColumns = 'title, state|20% projectinvestigator, fundingAgency, sanctionedAmount';
Research.register();
