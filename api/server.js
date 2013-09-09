var express = require('express'), 
	db = require('./db'),
	plans = require('./routes/plans');

var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	//app.use(express.session({ secret: 'keyboard cat' }));
});

// configuration data
var FACEBOOK_APP_ID = '368679433263598';
var FACEBOOK_APP_SECRET = '18669d24476ea12c52f10aa56f49cc59';

app.get('/plans', plans.findAll);
app.get('/plans/:id', plans.findById);

app.listen(3000);
console.log('The best plan is waiting for you on port 3000...');