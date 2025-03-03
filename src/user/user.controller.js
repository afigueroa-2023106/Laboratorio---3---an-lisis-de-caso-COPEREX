import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'



export const login = async(req, res)=>{
    try {
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )
        if(user && checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(400).send(
            {
                message: 'Wrong email or password'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with login function'
            }
        )
    }
}


const agregarUsuarioPorDefecto = async () => {
    try {
        const defaultAdmin = await User.findOne({ role: 'ADMIN' })
    if (!defaultAdmin) {
             const usuarioAdmin = new User({
                name: 'Andre ',
                surname: 'Figueroa',
                username: 'afigueroa ',
                email: `${process.env.ADMIN_EMAIL}`,
                password: await encrypt(`${process.env.ADMIN_PASSWORD}`, 12),
                role: "ADMIN"
            })
 
            await usuarioAdmin.save()
            console.log("Administrador por defecto agregado")
        }
    }catch (err) {
            console.error("Error al agregar usuario por defecto:", 
            err
        )
    }
}

agregarUsuarioPorDefecto()

export const test = (req, res)=>{
    console.log('La prueba se esta ejecutando ')
    res.send({message: 'La prueba se esta ejecutando'})
}