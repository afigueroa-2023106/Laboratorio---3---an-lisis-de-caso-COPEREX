import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can´t be overcome 25 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can´t be overcome 25 characters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            maxLength: [15, `Can´t overcome 15 characters`]
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required']
        },
        password:{
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 9 characters'],
            maxLength: [100, 'Can´t be overcome 16 characters']
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN', 'USER']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
    return user
}

export default model('User', userSchema)