import express ,{ Request ,Response}  from 'express';
import  connectDB  from './config/dbConfig';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 7002;
console.log(port);
connectDB();

dotenv.config();

app.get('/',(req : Request,res : Response) =>{
    res.json({message:'Quiz paltform'});
    console.log('Quiz platform!!');
})

app.listen(port,() => console.log('Server Started !!'));