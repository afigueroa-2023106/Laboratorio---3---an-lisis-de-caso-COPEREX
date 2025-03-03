import { Router } from "express"
import { validateJwt } from "../../middleware/validate.jwt.js"
import { login, test } from '../user/user.controller.js'


const api = Router()

api.post('/',
    [
       
        
    ],login
)

api.get('/test', 
    [
        validateJwt

    ],test
)

export default api