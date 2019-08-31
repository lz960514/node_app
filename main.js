const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const path = require('path');

const port = process.env.PORT || 5200;

const hostName = '192.168.2.129';

const {
    mongoUrl,
    options
} = require('./config/keys');

const users = require('./routes/api/users');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api/users', users);

app.listen(port, hostName, (err) => {
    if (err) {
        console.error(err);
    } else {
        mongoose.connect(mongoUrl, options)
            .then(() => console.log(`数据库连接成功`))
            .catch(err => console.error(err));
        console.log(`Server running on http://${hostName}:${port}`);
    }
});