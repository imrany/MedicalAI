import express from "express"
import { config } from "dotenv"
import cors from "cors"
import router from "./routes/api"
config()

const cors_option = {
    origin:["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH", "PUT"]
}

const app =express()
app.use(cors(cors_option))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api",router)


const port=process.env.PORT||8080
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})