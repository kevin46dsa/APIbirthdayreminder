const express = require('express');
const router = express.Router();
const data = require('../data/users');
const dataVal = require("../data/dataValidation");


router.get('/', async (req,res) =>{

    //if user authenticated redirect to /private
    if (req.session.user) {
        res.status(200).redirect("/private"); 
    }
    else res.status(200).render('view/login', {title: 'inTime'});

});

router.get('/generateReport', async (req,res) =>{

    try{
        let reportdata = await data.generateReport();
        console.log(reportdata);
        res.status(200).render('view/logout', {title: 'inTime'});
        }
        catch(e){
            return res.status(500).render('view/error',{title:"Error",error:e})
        }

});


router.post('/postintime', async (req,res) =>{
        
        let isInTime = req.body.Value
        let date = req.body.date
        let time = req.body.time
        console.log(isInTime,date,time);
        console.log(req.body);
    try{
        let response = await data.postInTime(isInTime,date,time);
        res.status(200).send({ data: response });
        }
        catch(e){
            console.log(e);
            res.status(404).send({ data: 'Something went Wrong' });
        }

});

router.get('/getIsUserInOrOut', async (req,res) =>{
    
    let response = await data.getifUserInOrOut();
    res.status(200).send({ data: response });

});

router.get('/specificUserData', async (req,res) =>{
    
    let response = await data.getUserTime();
    res.status(200).send({ data: response });

});




module.exports = router;


