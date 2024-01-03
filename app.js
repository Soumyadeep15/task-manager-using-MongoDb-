const bodyParser = require('body-parser')
const express = require('express')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())

require('./database')

require('./routes')(app)

const port = process.env.app_port || 8000

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})