import * as express from 'express'
import * as mongodb from 'mongodb'
import {collections} from './database'
import * as bcrypt from 'bcrypt'

export const userRouter = express.Router();
userRouter.use(express.json())

userRouter.post('/',async (req,res)=>{
    try {
        const user = req.body;
        const saltRounds = 10;
        const myPlaintextPassword = user.pwd;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword,salt, async function(err, hash) {
                user.pwd = hash;
                const result = await collections.users?.insertOne(user);
                if (result?.acknowledged) {
                    res.status(200).send(`Created a new user: ID ${result.insertedId}`)
                } else {
                    res.status(500).send('Failed to create a new user')
                }
                })
        })
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to create the user ID')
    }
})

userRouter.post('/',async (req,res)=>{
    try {
        const user = req.body;
        const query = {username:user.username};
        const IsFound = await collections.users?.findOne(query);
                if (IsFound) {
                    bcrypt.compare(user.pwd,IsFound.pwd, function(err, result){
                        if (result) {
                            res.status(200).send('Mabrouk')
                        } else {
                            res.status(401).send('Jarreb Marra ')
                        }
                    })
                } else {
                    res.status(401).send('Not Allowed')
                }
        const saltRounds = 10;
        const myPlaintextPassword = user.pwd;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword,salt, async function(err, hash) {
                user.pwd = hash;
                
                })
        })
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to create the user ID')
    }
})

//Authenticate
// userRouter.post('/authenticate',async (req,res)=>{
//     try {
//         const _username = req.body.username;
//         const _pwd = req.body.pwd;
//         const query = {username: _username, pwd:_pwd};
//         const user = await collections.users?.findOne(query);
//         if (user) {
//             res.status(200).send('Authentic')
//         } else {
//             res.status(404).send('you are not allowed to login')
//         }
//     } catch (error) {
//         res.status(404).send('Failed to find the employee ID')
//     }
// })

