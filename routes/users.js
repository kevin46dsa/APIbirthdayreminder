const express = require('express');
const router = express.Router();
const data = require('../data/users');
const dataVal = require("../data/dataValidation");




router.get('/checkbirthday', async (req,res) =>{

    try{
        let reportdata = await data.generateReport();
        console.log(reportdata);
        res.status(200).render('view/logout', {title: 'inTime'});
        }
        catch(e){
            return res.status(500).render('view/error',{title:"Error",error:e})
        }

});






module.exports = router;


