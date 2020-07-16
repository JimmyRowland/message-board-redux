import "dotenv/config"
import {connection, connect} from "mongoose";
import express from "express";
import routes from "./routes/index"
import * as path from "path";

(async()=>{
    const PORT = process.env.PORT || 5000
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
        app.use(express.static('./client/build'));
        app.get("*", (req,res)=>{
            res.sendFile(path.resolve(__dirname,"..","client",'build','index.html'))
        })
        // controller
        app.use(routes);
        app.listen(PORT, () => {
            console.log("express server started on http://localhost:8080");
        });


    }else{
        throw new Error("env dbstring does not exist");
    }


})()