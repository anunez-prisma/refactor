var dataBaseDev = require('../../cypress/config/dev.config.json')
var dataBaseQa = require('../../cypress/config/qa.config.json')

module.exports = {
    get(name, environment) {
        switch (environment) {
            case "qa": {
                return dataBaseQa.env[name]
            }
            default: {
                return dataBaseDev.env[name]
            }
        }
    }
}