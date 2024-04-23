import express from 'express'
const lessonsRouters = express.Router()
import { getLessons } from '../controllers/lessons.js'

lessonsRouters.get("/", getLessons)

export default lessonsRouters