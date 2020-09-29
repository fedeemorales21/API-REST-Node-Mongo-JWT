const usersController = {}

const User = require('../models/User')
const jwt = require('jsonwebtoken')


usersController.signIn = async (req,res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) res.json({success: false , msg: 'Email not regited yet' })


    const log = await user.comprarePassword(password)
    if (!log) res.json({success: false , msg: 'Password is wrong' })

    const token = jwt.sign({id: user._id}, process.env.SECRET_WORD , {
        expiresIn: 86400
    })

    res.json( {success: true , msg: 'User registed' , token} )
    
}


usersController.logout = (req,res) => {
    res.json( {success: true , token: null})
}


usersController.signUp = async (req,res) => {
    const { name,email,password,password_check } = req.body
    
    // validation
    const errs = []
    if (!name || !email || !password ) errs.push({value: 'Complete fields please'})

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email.toLowerCase())) errs.push({value:'Invalid Email'})

    if (password.length > 6) errs.push({value:'Password is too short, 6 characters minimum'})
    
    if (password != password_check) errs.push({value:'Reaply password is wrong'})
        
    if (errs.length > 0) res.json( {success: false , msg: errs } )
    
    const userEmail = await User.findOne({email})
    if (userEmail) res.json( {success: false , msg: 'Email already registed' } )
    
    const newUser = new User({name,email,password})
    newUser.password = await newUser.hashingPassword(password)
    await newUser.save()

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_WORD, {
        expiresIn: 86400
    })

    res.json( {success: true , msg: 'User registed' , token} )
}


module.exports = usersController