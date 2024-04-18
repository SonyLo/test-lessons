
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const lessonsRouters = require("./routers/lessons")


// app.get('/', (req, res) => {

// })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/lessons', lessonsRouters)
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})