// Mongoose schema
// http://mongoosejs.com/docs/schematypes.html

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NerdSchema   = new Schema({
    name: 			String,
    title: 			String,
    department:		String,
    skills: 		[],
    img: 			String, //url
    created: 		{type: Date, default: Date.now},
    modified: 		{type: Date, default: Date.now}
});

module.exports = mongoose.model('Nerd', NerdSchema);