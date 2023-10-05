import pool from "../pg";
import { createTransport } from "nodemailer"
import { MailDetails, Req } from "../types/types";
import {genSalt, compare, hash} from "bcryptjs";
import { verify, sign } from "jsonwebtoken"

export const verifyEmail=async(req:Req,res:any)=>{
    try {
        const email=req.body.email;
        const code=createCode()
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (!results.rows[0]) {
                let mailTranporter=createTransport({
                    service:'gmail',
                    auth:{
                        user:process.env.TRANSPORTER,
                        pass:process.env.PASSWORD
                    }
                });
                let details:MailDetails={
                    from:process.env.TRANSPORTER,
                    to:email,
                    subject:`Verification Code`,
                    text:`Your Wekafile One-Time Password (OTP) is \n${code}`
                }
                mailTranporter.sendMail(details,(err:any)=>{
                    if(err){
                        res.send({error:`Cannot sent verification code, try again!`});
                    }else{
                        res.send({code:code})
                    }
                })
            }else{
                res.send({error:`Account using ${email} already exist!`})
            }
        })
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

export const registerUser=async(req:Req,res:any)=>{
    try {
        const {username,email,password,id}=req.body;
        if (username&&email&&password) {
            const salt=await genSalt(10);
            const hashedPassword=await hash(password,salt);
            pool.query('INSERT INTO user_table (username, email, password, id) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, hashedPassword, id], (error:any, results) => {
                if (error) {
                    res.status(408).send({error:`Account using ${email} already exist!`})
                }else{
                    res.status(201).send({
                        msg:`Welcome ${results.rows[0].username}`,
                        data:{
                            id:results.rows[0].id,
                            username:results.rows[0].username,
                            email:results.rows[0].email,
                            photo:results.rows[0].photo,
                            token:generateUserToken(results.rows[0].id)
                        }
                    })
                }
            })    
        } else {
            res.status(403).send({error:"Fill all the required fields!!"})
        }
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

export const loginUser=async(req:Req,res:any)=>{
    try {
        const {email,password}=req.body;
        if(email&&password){
            pool.query('SELECT * FROM user_table WHERE email = $1',[email],async (error:any,results:any)=>{
                if(error){
                    console.log(error)
                    res.status(400).send({error:'Failed to sign in, try again!'})
                }else{
                    if(results.rows[0]){
                        if (results.rows[0].email&&await compare(password,results.rows[0].password)) {
                            res.status(201).send({
                                msg:`Welcome ${results.rows[0].username}`,
                                data:{
                                    id:results.rows[0].id,
                                    username:results.rows[0].username,
                                    email:results.rows[0].email,
                                    photo:results.rows[0].photo,
                                    token:generateUserToken(results.rows[0].id)
                                }
                            })
                        } else {
                            res.status(401).send({error:'Invalid Credentials'})
                        }
                    }else{
                        res.status(404).send({error:`Account associated with email ${email} does not exist!`})
                    }
                }
            })
        }else{
            res.status(403).send({error:"Fill all the required fields!!"})
        }
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

export const getUsers=async(req:Req,res:any)=>{
    try {
        pool.query('SELECT * FROM user_table', (error:any, results:any) => {
            if (error) {
                console.log(error)
                res.status(404).send({error:`Failed to get users.`})
            }else{
                res.status(200).json(results.rows)
            }
        })
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

export const updateUser=async(req:Req,res:any)=>{
    try {
        const email = req.params.email
        const { username } = req.body
        pool.query(
            'UPDATE user_table SET username = $1 WHERE email = $2',[username, email],(error:any, results:any) => {
            if (error) {
                console.log(error)
                res.status(501).send({error:`Failed to update account photo`})
            }else{
                let mailTranporter=createTransport({
                    service:'gmail',
                    auth:{
                        user:process.env.TRANSPORTER,
                        pass:process.env.PASSWORD
                    }
                });
                let details:MailDetails={
                    from:process.env.TRANSPORTER,
                    to:email,
                    subject:`Your Account details were updated`,
                    text:`Hello ,\n Your account user profile has been updated.\n\nVisit `
                }
                mailTranporter.sendMail(details,(err:any)=>{
                    if(err){
                        res.send({error:`Cannot sent email, try again!`});
                    } else{
                        res.status(200).send({msg:`Photo updated`})
                    }
                })
            }
        })
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

export const getUserDetails=async(req:Req,res:any)=>{
    try {
        const email = req.params.email
        pool.query('SELECT * FROM user_table WHERE email = $1', [email], (error:any, results:any) => {
            if (error) {
                console.log(error)
                res.status(404).send({error:`Account associated with the email address ${email} does not exist!`})
            }else{
                if(results.rows[0]){
                    res.status(200).json({
                        data:{
                            username:results.rows[0].username,
                            email:results.rows[0].email,
                            photo:results.rows[0].photo
                        }
                    })
                }else{
                    res.status(404).send({error:`Account associated with the email address ${email} does not exist!`})
                }
            }
        })
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

export const protectUser=async(req:any,res:any,next:any)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            verify(token,`${process.env.JWT_SECRET}`);
            next()
        }catch (error:any){
            res.status(401).send({error:'Not Authorised☠'})
        }
    }
    if(!token){
      res.status(401).send({error:'No Token Available☠'})
    }
};

export const deleteUser=async(req:Req,res:any)=>{
    try {
        const email = req.params.email
        pool.query(`
        DELETE FROM user_uploads WHERE email=$1 RETURNING *
        `, [email], (error:any, results:any) => {
            if (error) {
                res.status(408).send({error:`Failed to delete uploads associated with the email ${email}`})
                console.log(error)
            }else{
                if (results.rows) {
                    pool.query('DELETE FROM user_table WHERE email = $1 RETURNING *', [email], (error:any, results:any) => {
                        if (error) {
                            res.status(408).send({error:`Failed to delete account associated with the email ${email}`})
                        }else{
                            if (results.rows[0]) {
                                let mailTranporter=createTransport({
                                    service:'gmail',
                                    auth:{
                                        user:process.env.TRANSPORTER,
                                        pass:process.env.PASSWORD
                                    }
                                });
                                let details:MailDetails={
                                    from:process.env.TRANSPORTER,
                                    to:results.rows[0].email,
                                    subject:`Your Account Was Deleted`,
                                    text:`Hello ${results.rows[0].username},\n Your Account was deleted. We are sorry to see your leave, see you again at .\n\nFeel free to share your feedback by replying to this email.`
                                }
                                mailTranporter.sendMail(details,(err:any)=>{
                                    if(err){
                                        res.send({error:`Cannot sent email, try again!`});
                                    } else{
                                        res.status(200).send({msg:`Account associated with email ${results.rows[0].email} deteled successful`})
                                    }
                                })   
                            } else {
                                res.status(404).send({error:`Account associated with email ${email} does not exist!`})
                            }
                        }
                    })
                }
            }
        })
    } catch (error:any) {
        res.status(500).send({error:error.message})
    }
}

const generateUserToken=(id:string)=>{
    return sign({id},`${process.env.JWT_SECRET}`,{
        expiresIn:'10d'
    })
};

function createCode():string {
    let date=new Date()
    let hr=date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
    const code=`${hr}${date.getFullYear()}`
    return code
}
