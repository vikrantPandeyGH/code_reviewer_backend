import express from 'express'
const app = express()
import projectroutes from './routes/project.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('slash page opened')
})

app.use('/projects',projectroutes)
export default app