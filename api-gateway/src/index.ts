import express, { Application, urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import proxy from "express-http-proxy"
import morgan from "morgan"
import dotenv from "dotenv"
import { logger } from "./middleware/logger"


dotenv.config()

const app:Application=express()
const PORT:number=Number(process.env.PORT || 4000)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));


const corsOptions = {
    origin: process.env.CLIENT_URL as string,
    credentials: true
};

app.use(cors(corsOptions))

const routes=[
    // {path:"/api/user", serviceUrl:process.env.USER_SERVICE},
    {path:"/api/auth", serviceUrl:process.env.AUTH_SERVICE},
    {path:"/api/course", serviceUrl:process.env.COURSE_SERVICE},
    {path:"/api/notification", serviceUrl:process.env.NOTIFICATION_SERVICE},
    {path:"/api/payment", serviceUrl:process.env.PAYMENT_SERVICE},
    {path:"/api/chat", serviceUrl:process.env.CHAT_SERVICE},
]

routes.forEach((route)=>{
    if (route.serviceUrl){
        app.use(route.path,proxy(route.serviceUrl))
    }
})

app.listen(PORT,()=>{
    console.log(`api-gateway sever is running on port : ${PORT}`)
})
