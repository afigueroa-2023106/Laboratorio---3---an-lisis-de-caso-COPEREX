'use strict'

import { error } from "console"
import jwt from "jsonwebtoken"

export const generateJwt = async (payload)=>{
    try {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {}
        )
    }catch (err) {
        console.error(err)
        return err
    }
}