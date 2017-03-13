var redis = require('redis');
var sessionClient;
var _database;
module.exports = {
    init: function (config, callback) {
        sessionClient = redis.createClient(config.port || 6379, config.host || '127.0.0.1');
        _database = config.database || 0;
        return this;
    },
    get: function (id, callback) {
        sessionClient.select(_database, function () {
            sessionClient.get(id, function (err, res) {
                if (err) {
                    callback && callback(err);
                    return;
                }
                var value = null;
                try {
                    value = JSON.parse(res);
                } catch (err) {
                    value = null;
                }
                callback && callback(null, {
                    key: id
                    , value: value
                });

            });
        });
    },
    set: function (id, value, callback) {
        sessionClient.select(_database, function () {
            sessionClient.set(id, JSON.stringify(value), function (err) {
                callback && callback(err);
            });
        })
    }
};