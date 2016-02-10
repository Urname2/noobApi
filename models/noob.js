var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NoobSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Noob', NoobSchema);