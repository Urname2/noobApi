// Mongoose schema
// http://mongoosejs.com/docs/schematypes.html

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClassSchema   = new Schema({
    title: 			String,
    description: 	String,
    length: 		Number,
    maxMembers: 	Number,
    members: 		[],//[{noob_id : String}, {noob_name : String}, {attended : Boolean}], {created : Date.now} //{waitingList : Boolean},
    where: 			String,
    when: 			Date,
    updated: 		{type: Date, default: Date.now},
    nerd_id: 		String
});

module.exports = mongoose.model('Class', ClassSchema);