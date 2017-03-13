var restify = require('restify');
var plugins = require('restify-plugins');
var datasource = require('./libs/mysql-source').init(config.database.mysql);
var litrator = require('./libs/index').use(datasource);

var server = restify.createServer();
server.use(plugins.bodyParser());

server.get('/litrate/:statement', function (req, res, next) {
    litrator.internalLitrate(req.params.statement, function (err, serviceResult) {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send({query: req.params.statement, result: serviceResult})
        }
        next();
    });
});
server.post('/litrate', function (req, res, next) {
    litrator.internalLitrate(req.body.statement, function (err, serviceResult) {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send({query: req.body.statement, result: serviceResult})
        }
        next();
    });
});

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});