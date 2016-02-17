var consoleColor = {
	red : function(text){
		console.log('\x1b[31m', text ,'\x1b[0m');
	},
	blue : function(text){
		console.log('\x1b[36m', text ,'\x1b[0m');
	},
	yellow : function(text){
		console.log('\x1b[33m', text ,'\x1b[0m');
	},
	log : function(text){
		console.log(text);
	}
}

module.exports = consoleColor;