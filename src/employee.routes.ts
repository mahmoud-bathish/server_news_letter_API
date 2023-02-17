import * as express from 'express'
import * as mongodb from 'mongodb'
import {collections} from './database'

export const employeeRouter = express.Router();
employeeRouter.use(express.json())


employeeRouter.get('/', async (req,res)=>{
    try {
        const employees = await collections.employees?.find({}).toArray();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send(error)
    }
})

employeeRouter.get('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const query = {_id: new mongodb.ObjectId(id)}
        const employee = await collections.employees?.findOne(query);
        if (employee) {
            res.status(200).send(employee)
        } else {
            res.status(404).send('Failed to find the Employee ID')
        }
    } catch (error) {
        res.status(404).send('Failed to find the Employee ID')
    }
})

employeeRouter.delete('/:id',async(req,res)=>{
    try {
        const id = req?.params?.id;
        const query = {_id: new mongodb.ObjectId(id)};
        const result = await collections.employees?.deleteOne(query)

        if (result && result.deletedCount) {
            res.status(202).send(`We Removed Employee with id : ${id}`)
        } else if (!result){
            res.status(400).send(`Failed to remove Removed Employee with id : ${id}`)
        } if (!result?.deletedCount){
            res.status(404).send(`Failed to find Removed Employee with id : ${id}`)
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error)
    }
})

employeeRouter.post('/',async (req,res)=>{
    try {
        const employee = req.body;
        const result = await collections.employees?.insertOne(employee);
        if (result?.acknowledged) {
            res.status(200).send(`Created a new employee: ID ${result.insertedId}`)
        } else {
            res.status(500).send('Failed to create a new employee')
        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to create the employee ID')
    }
})


employeeRouter.put('/:id',async (req,res)=>{
    try {
        const id = req?.params?.id; 
        const employee = req.body;
        const query = {_id: new mongodb.ObjectId(id)};
        const result = await collections.employees?.updateOne(query,{$set: employee})
        if (result && result.matchedCount) {
            res.status(200).send(`We Updated Employee with id : ${id}`)
        } else if (!result?.matchedCount){
            res.status(404).send(`Failed to Find Removed Employee with id : ${id}`)
        } else{
            res.status(304).send(`Failed to Update Employee with id : ${id}`)
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(`Failed to Update the employee ID: Reason : ${error}`)
    }
})

//Authenticate
employeeRouter.post('/authenticate',async (req,res)=>{
    try {
        const _username = req.body.username;
        const _pwd = req.body.pwd;
        const query = {username: _username, pwd:_pwd};
        const employee = await collections.employees?.findOne(query);
        if (employee) {
            res.status(200).send('Authentic')
        } else {
            res.status(404).send('you are not allowed to login')
        }
    } catch (error) {
        res.status(404).send('Failed to find the employee ID')
    }
})

