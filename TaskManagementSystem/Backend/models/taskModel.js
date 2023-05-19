const mongoose = require('mongoose')

const taskSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

const Tasks = mongoose.model('Tasks', taskSchema)

module.exports = Tasks