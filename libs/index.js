var _master, _old;
module.exports = {
    init: function (master, old, callback) {
        _master = require('./plugins/' + master.type).init(master.config);
        if (old) {
            _old = require('./plugins/' + old.type).init(old.config);
        }
        return this;
    },
    get: function (key, callback) {
        _master.get(key, function (err, res) {
            if (err) {
                callback(err);
                return;
            }
            if (!res) {
                if (_old) {
                    _old.get(key, callback);
                    return;
                }
            }
            callback(err, res);
        })
    },
    set: function (key, value, callback) {
        _master.set(key, value, callback);
    }
};