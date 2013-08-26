var express = require('express'), 
	mongoose = require('mongoose');

// create express app
var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

// connect to 'planroulette' mongo database
mongoose.connect('mongodb://localhost/planroulette');

var db = mongoose.connection;
db.on('error', function(err) {
	console.log(err);
});

// create plans schema
var planSchema = new mongoose.Schema({
	name: String,
	description: String
});

// create plans model
var Plan = mongoose.model('Plan', planSchema);
// create plan's intance to be saved
var plan1 = new Plan();

// save plan to 'plans' collection on 'planroulette' DB
plan1.save(function (err, plan, numberAffected) {
  if (err) {
  	console.log(error);
  }else{
	plan.name = "Kusama en el MALBA";
	plan.description = "Obsesion infinita";
	plan.save();
  }
})

// create route for GET calls returning all items in plans collection
app.get('/plans', function (req, res){
	  Plan.find({}, function (err, plans) {
		if(err) {
			console.log(err);
		}else{
			res.send(plans);
			console.log(plans);
		}
	});
});


app.listen(3000);
console.log('Testing MongoDB and mongoose...');