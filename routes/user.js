const express=require('express')
const mongoose=require('mongoose')
const uniqid=require('uniqid')
const router=express.Router()

const Schema = mongoose.Schema;

const userSchema = new Schema({
    idUser: {type: String},
    name: { type: String},
    mail: { type: String},
    numero: { type: String},
    description: { type: String},
    create_at: {type: Date,default:Date.now},
});

const userModel = mongoose.model('user', userSchema);

module.exports =router

router.get('/contact', (req, res) => {
    if (req.session.error) {
      res.locals.error=req.session.error
      req.session.error=undefined
    }
    if (req.session.sucess) {
      res.locals.sucess=true
      req.session.sucess=undefined
    }
    res.render('pages/contact')
})
  
router.post('/contact', (req, res) => {
  
    const {nom,email,tel,comment}=req.body
  
    if (!nom || !email || !tel || !comment) {
      // res.status(200).json({message:'Invalid'})
      req.session.error=true
      res.redirect('/contact')
    // }else{
    //     res.status(200).json({message:'Valid'})
    //   }
    }else{
        let user=new userModel({
            idUser: uniqid(),
            name: nom,
            mail: email,
            numero: tel,
            description: comment,  
        })
        user.save()
        .then(() => {
            req.session.sucess=true
            res.redirect('/contact')
        })
        .catch((err) => console.log(err));
    }
    // console.log(email);
})
  