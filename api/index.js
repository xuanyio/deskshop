const express = require('express');
const morgan = require('morgan');
const app = express();

const appConfig = require('./config/config').getAppConfig();
const db = require('./lib/common/db');
const { NotFoundError } = require('./lib/common/errors/errors');

const env = app.get('env') ? app.get('env').trim() : null;

if(env === `development`) {
    app.use(morgan('dev'));
};

if(env === `production`) {
    app.use(morgan('common'));
};

app.get('/', (req, res, next) => {
    res.status(200).json({
        data: {
            app_name: 'deskshop-api',
            version: '1.0.0',
            author: 'Xuanson On',
            license: 'Unlicense',
            description: 'Handles the API endpoint calls made from the admin interface or any authorised application(s).'
        }
    });
    return;
});

app.use((req, res, next) => {
    next(new NotFoundError(`The requested path could not be found.`));
    return;
});

app.use((err, req, res, next) => {
    err.path = `${req.protocol}://${req.hostname + req.originalUrl}`
    res.status(err.code || 500).json({
        error: err
    });
    return;
});

if(db.connectToDb()) {
    app.listen(appConfig.APP_PORT, () => {
        if(env !== `testing`) {
            console.log(`Server/database connections established. Listening on port: ${3000}.`);
        };
    });
} else {
    console.log(`There was an error with connecting to the database. Please check connection string.`);
    process.exit(1);
};

module.exports = app;