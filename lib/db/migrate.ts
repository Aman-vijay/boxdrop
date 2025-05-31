import {migrate} from "drizzle-orm/neon-http/migrator"
import {drizzle} from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"
import * as dotenv from "dotenv";


dotenv.config({path:".env.local"})

if(!process.env.DATABASE_URL){
    throw new Error("Databse url could not be found")
}

async function runMigrations(){
    try{
        const sql = neon(process.env.DATABASE_URL!)
        const db = drizzle(sql)
        await migrate(db,{migrationsFolder:"./drizzle"})

        console.log("Migrations done")
    }
    catch(error){
        console.log(error)
        process.exit(1)

    }
}

runMigrations();