var mongoose     = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema       = mongoose.Schema;

var NoobSchema   = new Schema({
    name: 		{ type: String, required: true },
    email:  	{ type: String, unique: true, required: true },
    created: 	{ type: Date, default: Date.now },
    karma: 		{ type: Number, default: 3}
});

NoobSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Noob', NoobSchema);