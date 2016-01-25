// ################# model
var Todo = require('./models/todo');

module.exports = function(app) {
	app.get('/api/todos/', function(req, resp) {
		Todo.find(function(err, data) {
			if(err) {
				console.log('error fetching data : ' + err);
				resp.send(err);
			}
			resp.json(data);
		});
	});

	app.post('/api/todos/', function(req, resp) {
		Todo.create({
				text: req.body.text,
				done : false
			}, function(err, todo) {
				if(err)
					resp.send(err);
				Todo.find(function(err, todos) {
					if(err)
						resp.send(err);
					resp.json(todos);
				});
			});
	});

	app.delete('/api/todos/:todo_id', function(req, resp) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, data) {
			if(err)
				resp.send(err);
			Todo.find(function(err, todos) {
				if(err)
					resp.send(err);
				resp.json(todos);
			});
		});
	});
};