const fs = require('fs');
const path = require('path');

module.exports = {
    getAppConfig: () => {
        const appConfigFile = fs.readFileSync(path.join(__dirname, 'app.config.json'));
        return JSON.parse(appConfigFile);
    }
};