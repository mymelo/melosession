var restify = require('restify');
var plugins = require('restify-plugins');

var config = require('./config');
var session = require('./libs/index').init(config.resources.master, config.resources.old);

var server = restify.createServer();
server.use(plugins.bodyParser());

server.get('/get/:key', function (req, res, next) {
    session.get(req.params.key, function (err, sessionRes) {
        if (err) {
            sessionRes.error = err.toString();
        }
        res.send(sessionRes);
        next();
    });
});

server.post('/pget', function (req, res, next) {
    session.get(req.body.key, function (err, sessionRes) {
        if (err) {
            sessionRes.error = err.toString();
        }
        res.send(sessionRes);
        next();
    });
});

server.post('/set', function (req, res, next) {
    session.set(req.body.key, req.body.value, function (err, sessionRes) {
        if (err) {
            sessionRes.error = err.toString();
        }
        res.send(sessionRes);
        next();
    });
    var value = req.body.document;
});

server.listen(config.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});