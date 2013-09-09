var mongoose = require('mongoose');

exports.findAll = function (req, res) {
	var Plan = mongoose.model('Plan');

	Plan.find(function (err, plans) {
		if(err) {
			console.log(err);
		}else{
			res.header('Content-type','application/json');
			res.header('Charset','utf8');
			res.send(req.query.callback + '(' + JSON.stringify(plans) + ');');
			
			console.log(plans);
		}
	});
};

exports.findById = function(req, res) {
	var Plan = mongoose.model('Plan');
	console.log(req.params.id);
	Plan.findById(req.params.id, function (err, plans) {
		if(err) {
			console.log(err);
		}else{
			res.header('Content-type','application/json');
			res.header('Charset','utf8');
			res.send(req.query.callback + '(' + JSON.stringify(plans) + ');');

			console.log(plans);
		}
	});
};