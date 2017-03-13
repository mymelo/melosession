var MongoClient = require('mongodb').MongoClient;
var sessionCollection;

module.exports = {
    init: function (config, callback) {
        MongoClient.connect(config, function (err, db) {
            if (err) {
                callback && callback(err);
                return;
            }
            sessionCollection = db.collection(config.database.mongodb.state.collection);
        });
        return this;
    },
    get: function (id, callback) {
        sessionCollection.findOne({_id: id}, function (err, docResult) {
            if (err) {
                callback && callback(err);
                return;
            }
            if (docResult) {
                callback && callback(null, {
                    key: id,
                    value: docResult
                });
            } else {
                callback && callback(null, null);
            }
        });
    },
    set: function (id, value, callback) {
        value._id = id;
        sessionCollections.save(value, function (err, res) {
            callback && callback(err, res);
        });
    }
};