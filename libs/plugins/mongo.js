var MongoClient = require('mongodb').MongoClient;
var sessionCollection;

module.exports = {
    init: function (options, callback) {
        MongoClient.connect(options, function (err, db) {
            if (err) {
                callback(err);
            } else {
                sessionCollection = db.collection(config.database.mongodb.state.collection);
            }
        });
        return this;
    },
    select: function (tokens, callback) {
        if (!pool) {
            callback(new Error('No connection.'));
            return;
        }
        tokens = tokens.map(function (item) {
            return "'" + item.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'";
        }).join(',');
        var query = 'SELECT * FROM `melo-lit`.words WHERE pinglish in (' + tokens + ');';
        pool.query(query, function (err, res) {
            callback(err, res);
        })
    },
    insert: function (keyValueTokens, callback) {
        if (!pool) {
            callback(new Error('No connection.'));
            return;
        }
        var values = keyValueTokens
            .filter(function (token) {
                return token.key != '';
            })
            .map(function (token) {
                return "(" +
                    "'" + token.key.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'," +
                    "'" + token.value.replace(/'/g, "''").replace(/\\/g, "\\\\") + "'," +
                    "'" + new Date().toISOString().replace('Z', '') + "')";
            }).join(',');
        var query = "INSERT IGNORE INTO `melo-lit`.words(pinglish,farsi,date) VALUES " + values;
        pool.query(query, function (err, res) {
            callback(err, res);
        })
    }
};