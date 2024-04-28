require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require("./db/connect")
const productRouter = require("./routes/products")

app.use(express.json())

app.use('/api/v1/products', productRouter)

const notFound= require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler') 

// middleware 

//routes

app.get('/' ,(req,res)=>{
    res.send('lol')
})


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


const start = async()=> {
    try {
        await connectDB(MONGO_URI)
        app.listen(PORT,console.log("connected to server ..."))
    } catch (error) {
        console.log(error)
    }
}

start()