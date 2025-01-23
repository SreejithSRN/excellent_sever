import express, { Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { env_variables } from "../_boot/config"
import { logger } from "../_lib/middleware/logger"
import { dependencies } from "../_boot/dependencies"
import { httpStatusCode } from "../_lib/common/httpStatusCode"
import { routes } from "../infrastructure/routers"


const app:Application=express()
const PORT:number=Number(env_variables.PORT ||4002)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use (cookieParser())
const morganStream = {
    write: (message: any) => logger.info(message.trim()) 
};
app.use(morgan('combined', { stream: morganStream }));

app.use("/", routes(dependencies))
app.all("*", (req:Request,res:Response)=>{
    res.status(httpStatusCode.NOT_FOUND).json({sussess:false,status:httpStatusCode.NOT_FOUND,message:"Course_API not found"})
})


app.listen(PORT, ()=>{
    console.log(`Course service is running on port ${env_variables.PORT}`)
})

export default app

