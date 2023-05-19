const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt  = require('jsonwebtoken')
const createError =  require('../utils/error')

const Register = async (req, res, next) => {
    const {name, email, password} = req.body
    if(!name || ! email || ! password){
        return next(createError({ status: 401, message: 'Name, email, password is required'}))
    }
    try{
        const salt =  await bcrypt.genSalt(10)
        const hashedPassword  = await bcrypt.hash(password, salt)
        const newUser = new User ({name,email, password : hashedPassword})
        await newUser.save()
        return res.status(201).json('New user created successfully')
    } catch(err){
        console.log(err)
        return next(err)
    }
}

const Login = async (req, res, next) => {
    const {email, password} =  req.body
    if(!email || !password) {
        return next(createError({ status: 400, message: 'email , password is required'}))
    }
    try{
       const user = await User.findOne({email}).select('name email password') 
       if(!user){
        return next(createError({ status : 404, message: 'No user found'}))
       }
       const isPasswordCorrect = await bcrypt.compare(password, user.password)
       if(!isPasswordCorrect){
        return next(createError({ status : 404, message: 'Incorrect password'}))
       }
       const payload = {
        id: user._id,
        name : user.name
       }
       const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '1d'
       })
    return res.status(200).json({user, token})
    } catch(err){
        console.log(err)
        return next(err)
    }

}

const Logout = async (req, res) => {
    res.clearCookie('access_token')
    return res.status(200).json({ message: "User logged out successfully"})
}

const isLoggedIn = async (req, res) => {
    const token = req.cookies.access_token
    if(!token){
        return res.json(false)
    }
    return jwt.verify(token, process.env.JWT_KEY, (err) => {
        if(err){
            return res.json(false)
        }
        return res.json(true)
    })
    
}
module.exports =  {
    Register,
    Login,
    Logout,
    isLoggedIn
}