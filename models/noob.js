var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NoobSchema   = new Schema({
    name: String,
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Noob', NoobSchema);