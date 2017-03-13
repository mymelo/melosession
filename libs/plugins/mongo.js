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
    get: function (id, callback) {

    },
    set: function (id, session, callback) {

    }
};