const express = require('express');
const router = express.Router();
const data = require('../data/data'); 
const mailer = require('../data/mailer')




router.get('/checkbirthday', async (req,res) =>{
    let UserID = req.userId;
    try{
        let birthdayData = await data.checkbirthday(UserID);
        console.log(birthdayData);
       if (birthdayData) {
			res.status(200).send({ data: birthdayData });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}

});

router.get('/sendMail', async (req,res) =>{
    let UserID = req.userId;
    try{
        let birthdayData = await data.checkbirthday(UserID);
        console.log(birthdayData);
       if (birthdayData) {
            mailer.sendEmail(birthdayData);
			res.status(200).send({ data: 'mail Sent...' });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}

});




module.exports = router;


