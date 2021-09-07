require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

/* Connections */
const mongoDb = require('./db/mongoDb')

/* Routes */
const movieRouter = require('./routes/movies')
const commentRouter = require('./routes/comments')

const app = express()
const apiPort = 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

/* Connect MongoDb */
mongoDb.connect();

app.get('/', (req, res) => {
    res.send('This is the backend')
})

app.use('/api', movieRouter)
app.use('/api', commentRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
