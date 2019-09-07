const hostName = '127.0.0.1';

const port = 27017;

const dbs = 'node_app';

module.exports = {
    mongoUrl: `mongodb://${hostName}:${port}/${dbs}`,
    options: {
        useNewUrlParser: true
    },
    secretOrKey: 'secret'
}