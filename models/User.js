var keystone = require('keystone');
var Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	profilePhoto : {type : Types.CloudinaryImage}
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.defaultColumns = 'name, email, isAdmin';
User.register();
