const express = require('express')
const app = express()
const cors  = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const allroutes =  require('./routes/index')

//Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

//Connection to mongodb database
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the mongodb database")
    } catch(err){
        console.log(err)
        process.exit(1)
    }
}

//Routes
app.use('/api', allroutes)

//Error handling
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error'

    return res.status(status).json({ message, stack: err.stack})
})

PORT  = process.env.PORT || 4000
app.listen(PORT, () => {
    connectDB()
    console.log("Our app listening on port  " + PORT)
})