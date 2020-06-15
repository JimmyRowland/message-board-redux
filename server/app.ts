// import express from 'express';
// import mongoose from 'mongoose';
// import path from 'path';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';
//
//
// const mongoURI =  "mongodb+srv://admin:a_xmoCM96H;5Qz9YvrPB@messageboard-bix5o.mongodb.net/";
// const database =  "messageboard?retryWrites=true&w=majority";
//
// const app = express();
// app.use(bodyParser.json());
// const db = mongoURI+database;
//
// mongoose.connect(db).then(
//     ()=>{
//         console.log("Connect to mongodb")
//     }
// ).catch(err => console.log(err));
//
// export default app;