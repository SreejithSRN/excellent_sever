import database from "./_boot/database"
import server from "./presentation/server"

(async ()=>{
    try {
        server
        await database()
        console.log("Server and database started successfully")
    } catch (error:any) {
        console.error(error?.message|| "An error occured")     
        process.exit(1)   
    }
})();