
import express from 'express'
const app = express()
const port = 3000
import bodyParser from 'body-parser'
import lessonsRouters from "./routers/lessons.js"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/lessons', lessonsRouters)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})