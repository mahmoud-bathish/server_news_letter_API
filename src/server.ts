import * as dotenv from "dotenv";
import cors from 'cors'
import express from 'express'
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
import { connect } from "http2";
import { userRouter } from "./user.routes";

dotenv.config();
const {DB_URI} = process.env;

if (!DB_URI) {
    console.error('No DB_URI')
    process.exit(1);
}

connectToDatabase(DB_URI)
.then(()=>{
    const app = express();
    app.use(cors());
    app.use('/employees',employeeRouter);
    app.use('/users',userRouter);
    app.listen(5200,()=>{console.log('server is listen ')
    })
})
.catch(error=>console.error(error))




