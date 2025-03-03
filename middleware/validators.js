import { body } from "express-validator";

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),    
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isLength({ min: 8 })  
        .withMessage('The password must be at least 8 characters long')
]
