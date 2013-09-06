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



// deprecated
// exports.findAll = function(req, res) {
// 	res.send([{name: 'Pepsi Music'}, {name: 'Kusama en el MALBA'}]);
// };

// exports.findById = function(req, res) {
// 	res.send({id:req.params.id, name: 'Pepsi Music', description: 'The best concert in BA'});
// };