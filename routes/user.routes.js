import express from 'express';
import {db} from '../db/index.js'
import { usersTable } from '../models/user.model.js';

import { getUserByEmail } from '../services/user.service.js';
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validation/request.validation.js'; 
import { hashedPasswordWithSalt } from '../utils/hash.js';
import { createUserToken } from '../utils/token.js';

const router=express.Router();
router.post('/signup', async(req,res)=>{
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.format()})
    }

    const {firstname, lastname, email, password} = validationResult.data;
    
    const existingUser=await getUserByEmail(email);

    if(existingUser){
        return res
        .status(400)
        .json({error : `user with email ${email} already exists!`})
    }

    //creating salt and hashing as per documentation
    const {salt, password:hashedPassword} = hashedPasswordWithSalt(password);
    const [user] = await db.insert(usersTable).values({
        firstname,
        lastname,
        email,
        password : hashedPassword,
        salt,
    })
    .returning({ id: usersTable.id});

    return res.status(201).json({status:'success', data:{userId: user.id}});
});

router.post('/login', async(req, res)=>{
     const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error: validationResult.error})
    }

    const {email, password} = validationResult.data;
    const user = await getUserByEmail(email);
    if(!user){
        return res.status(404).json({error:`user with email ${email} doesn't exist`})
    }

    const{ password:hashedPassword} = hashedPasswordWithSalt(password, user.salt);
    if(user.password!==hashedPassword){
        return res.status(400).json({error: 'invalid password'});
    }

    const token=await createUserToken({id: user.id});
    return res.json({token});
})
export default router;