const express= require('express');
const router=express.Router();
const User=require('../../models/user');
const gravatar= require('gravatar');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const key = require('../../config/keys.js');
const passport =require('passport');
const validateRegisterInput =require('../../validation/register');
const validateLoginInput =require('../../validation/login');
//const validateProfileInput =require('../../validation/profile');

router.get('/test', (a,b)=> b.json({ msg : "success" }));


router.post('/register',(req, res) =>{
   
   const  {errors, isValid}= validateRegisterInput(req.body);

   // chec validation

   if (!isValid){
       return res.status(400).json(errors);
   }
   
   User.findOne({ email:req.body.email })
   .then(user => {
       if(user) {
           errors.email='Email does not exist';
           return res.status(400).json(errors.email);
        }
       else {
           const avatar= gravatar.url(req.body.email, {                 // GRAVATAR-+   concept
               s: '200',
               r:'pg',
               d:'mm'
           });
           const newUser= new User({
               name  : req.body.name,
               email : req.body.email,                        // model object ()
               avatar,
               password : req.body.password 
            });

                                                 // HASHING the password

            bcrypt.genSalt(10, (err, salt) =>{ 
                if (err) throw err;                         
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password=hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(a => console.log (a));
                });
            });
         }
    });
}); 

                                            // Login form CODE
router.post('/login', (req, res)=> {


    const  {errors, isValid}= validateLoginInput(req.body);

    // chec validation
 
    if (!isValid){
        return res.status(400).json(errors);
    }


    const email=req.body.email;
    const password=req.body.password;
   
    User.findOne({email})
    .then(user => {
        if (!user) {
        return res.status(404).json({email : 'user not found'});
        }
        
            bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if (isMatch) {

                    const payload= {id: user.id, name:user.name, avatar:user.avatar }; // id????????????
              //console.log(user.id+' '+ user.name);
                    jwt.sign(
                        payload, 
                        key.secretOrKey, 
                     {expiresIn: '1h'}, 
                        (err, token)=> { 
                           // if (err)                            // {expiresIn:3600}-doubt 
                           // throw err;
                          // console.log(token),
                            res.json({ 
                                success: true, 
                                token: 'Bearer ' + token
                            });
                });
            }
                else {
                    return res.status(400).json({ password: 'password incorrect'});
                }
            });
        });
    });


// current route-- tokenised
// private..

router.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=> {
    res.json({ id: req.user.id,
              name: req.user.name,
              email: req.user.email
    });
});


module.exports=router;