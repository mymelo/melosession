module.exports = {
    resources: {
        master: {
            type: 'mongo',
            config: {
                url: 'mongodb://localhost:27017/database',
                collection: 'mycollection'
            }
        },
        old: {
            type: 'redis',
            config: {
                host: '127.0.0.1',
                port: 6379,
                database: 0
            }
        }
    }
};