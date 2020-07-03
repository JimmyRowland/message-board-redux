import "dotenv/config"
import {connection, connect} from "mongoose";
import express from "express";
import cors from "cors";
import routes from "./routes/index"

(async()=>{
    const app = express();
    const devconnection: string|undefined = process.env.DB_STRING;
    if(devconnection){
        // database
        connect(devconnection,{useNewUrlParser: true, useUnifiedTopology: true});
        connection.on("connected",()=>{
            console.log("Connected to database");
        });
        //middleware
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(
            cors({
                origin: "http://localhost:3000",
            }),
        );
        // controller
        app.use(routes);
        app.listen(4000, () => {
            console.log("express server started on http://localhost:4000");
        });


    }else{
        throw new Error("env dbstring does not exist");
    }


})()