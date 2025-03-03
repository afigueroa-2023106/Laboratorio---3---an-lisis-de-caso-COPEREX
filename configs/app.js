'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import userRoutes from "../src/user/user.routers.js"
import companyRoutes from "../src/company/company.routes.js"

import dotenv from 'dotenv'
import { limiter } from '../middleware/rate.limit.js'
dotenv.config()

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app) => {
    app.use('/api/users', userRoutes)
    app.use('/api/company', companyRoutes )
   
}

export const initServer =  ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
        process.exit(1)
    }
}