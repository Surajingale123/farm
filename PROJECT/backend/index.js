import express from 'express';
import cors from 'cors'
import { establishConnection } from './src/config/DBConfig.js';
import ordersRouter from './src/router/Router.js';
//import bodyParser from 'body-parser';



const app=express();

app.use(cors());
  
app.use(express.json());

app.use("/orders",ordersRouter);




app.listen(6000,()=>{
    console.log('Sever is running on port 7000');
    establishConnection();
});