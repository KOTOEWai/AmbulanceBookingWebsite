
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.getAll = async (req,res)=>{
    const users = await User.find()
    res.json(users)
}

exports.logIn = async (req,res)=>{
   try{
    const {email,password} = req.body;
    if(!email ||!password){
        return res.status(400).send('All fields are required')
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).send('User not found')
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.status(400).send('Invalid password')
    }
    const token = jwt.sign({id: user._id},process.env.KEY,{expiresIn: 3600000})
    res.cookie('jwt',token,{ httpOnly: true ,
        secure: true,
        maxAge: 3600000 }) // 1 hour

    return res.json({
        email: user.email,
        token: token
    })
   }catch (err){
    console.error(err)
    res.status(500).send('Server Error')
   }
}

exports.signUp = async (req,res)=>{
    try{
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    
    const {name,email,password} = req.body;
    if(!name ||!email ||!password){
        return res.status(400).send('All fields are required')
    }
    if(!emailRegex.test(email)){
        return res.status(400).send('Invalid email format')
    }
    if(!passwordRegex.test(password)){
        return res.status(400).send('Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    }
    const hashPassword = await bcrypt.hash(password,10)
    const user = new User({name,email,password:hashPassword})
    const savedUser = await user.save();
    const token = jwt.sign({id: savedUser._id},process.env.KEY,{expiresIn: 3600000 })

    res.cookie('jwt',token,{ httpOnly: true ,
        secure: true,
        maxAge: 3600000 }) // 1 hour
    
    
    return res.json({
        status: "success",
        message: "User registered successfully",
        name: savedUser.name,
        email: savedUser.email,
        token: token
    })
    
}catch (err) {
    res.status(500).send(err.message)
}
}

exports.logout = (req, res) => {
    try{
        res.clearCookie('jwt')
        res.json({message: 'Logged out successfully'})
    }catch (err) {
        res.status(500).send(err.message)
    }
}
exports.me = (req, res) => {
    try{
        if(!req.user){
            return res.status(401).json({ message: 'Not authenticated' })
        }else{
          return  res.json( req.user)
        }
    }catch (err) {
        res.status(500).send(err.message)
    }
}
