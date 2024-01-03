const user = require('./user')
const task = require('./task')

module.exports = (app) => {
    app.use('/', user)
    app.use('/', task)
}