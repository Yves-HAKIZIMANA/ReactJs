const User = require('../models/User')

const getUserInfo = async(req, res, next) => {
    try{
        const data =  await User.findById(req.user.id).select('name email tasks')
        return res.status(200).json(data)
    } catch(err){
        return next(err)
    }
}

const updateUserInfo  = async( req, res, next) => {
    try{
        const {name, email } = req.body
        const updatedUser =  await User.findByIdAndUpdate(req.user.id, {
            name, email
        }, { new : true}).select('name email')
        return res.status(200).json(updatedUser)
    } catch(err){

    }
}

module.exports = {getUserInfo, updateUserInfo}