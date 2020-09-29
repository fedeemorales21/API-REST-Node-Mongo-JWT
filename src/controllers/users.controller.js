const usersController = {}

const User = require('../models/User')


usersController.signIn = (req,res) =>{
    
}

usersController.logout = (req,res) =>{
    
}



usersController.signUp = async (req,res) => {
    const { name,email,password,password_check } = req.body
    const errs = []

    // validation

    if (!name || !email || !password ) {
        errs.push({value: 'Complete fields please'})
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email.toLowerCase())) {
        errs.push({value:'Invalid Email'})
    }

    if (password.length > 6) {
        errs.push({value:'Password is too short, 6 characters minimum'})
    }

    if (password != password_check) {
        errs.push({value:'Reaply password is wrong'})
    }
    
    if (errs.length > 0) {
     
    }

    const userEmail = User.findOne({email})
    if (!userEmail) {
       
     
    }

    const newUser = new User({name,email,password})
    await newUser.save()
  
}

module.exports = usersController