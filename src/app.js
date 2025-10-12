import express from 'express'
const app = express()
import {connectToDB} from './db/db.js'
import projectroutes from './routes/project.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


app.use(async (req, res, next) => {
  try {
    await connectToDB(); // connects only if not already connected
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('slash page opened')
})

app.use('/projects',projectroutes)
export default app