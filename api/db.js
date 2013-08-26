var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/planroulette');

var db = mongoose.connection;
db.on('error', function(err) {
	console.log(err);
});

var planSchema = new mongoose.Schema({
	name: String,
	description: String
});

var plan = mongoose.model('Plan', planSchema);