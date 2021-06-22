const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const appConfig = require('../../config/config').getAppConfig();

module.exports = {
    connectToDb: async (env = 0) => {
        let dbConnectionString;
        let memoryServer;
        if(env === `testing`) {
            memoryServer = new MongoMemoryServer();
            dbConnectionString = memoryServer.getUri();
        } else {
            dbConnectionString = appConfig.DB_URI;
        };
        await mongoose.connect(appConfig.DB_URI, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await mongoose.connection.once('open', () => {
            return true;
        });
        await mongoose.connection.on('error', () => {
            return false;
        });
    }
};