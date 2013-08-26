var express = require('express'), 
	db = require('./db'),
	plans = require('./routes/plans');

var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/plans', plans.findAll);
app.get('/plans/:id', plans.findById);

app.listen(3000);
console.log('The best plan is waiting for you on port 3000...');