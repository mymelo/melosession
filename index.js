var restify = require('restify');
var plugins = require('restify-plugins');
var datasource = require('./libs/mysql-source').init(config.database.mysql);
var litrator = require('./libs/index').use(datasource);

var server = restify.createServer();
server.use(plugins.bodyParser());

server.get('/get/:id', function (req, res, next) {
    litrator.internalLitrate(req.params.statement, function (err, serviceResult) {
        if (err) {
            res.send({error: err.toString()})
        } else {
            res.send({query: req.params.statement, result: serviceResult})
        }
        next();
    });
});


server.post('/set', function (req, res, next) {
    var value = req.body.document;
});

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});